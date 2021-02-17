import {
  JoinableProductDetails,
  JoinableSite,
  JoinableSitesResponse,
  JoinableSiteUser,
  ProductKey,
  ProductRecommendationsResponse,
} from '../../types';
import { fetchJson } from '../../common/utils/fetch';

/* Joinable Sites API was replaced by Product Recommendations API as part of productionizing the Joinable Sites
   experimental API. This code maps Product Recommendations API results into Joinable Sites API results for
   compatibility with existing UI elements.
 */

/* Urls which we will be hitting in staging and prod
'https://api-private.atlassian.com/gateway/api/invitations/v1/product-recommendations/';
'https://id-invitations-service.staging.atl-paas.net/api/v1/product-recommendations';
*/

type ARI = {
  // Always 'ari' for valid ARI
  uriScheme: string;
  // Always 'cloud' for valid ARI
  cloud: string;
  resourceOwner: string;
  resourceType: string;
  // If 'resource_type == 'site Then 'resource_id' == 'siteId' (aka cloudId)
  resourceId: string;
  // cloudId aka siteId, mainly for Confluence and Jira resources.
  cloudId?: string;
};

// tenantedProducts and nonTenantedProducts used to identify which ARIs contain cloudId
// Also used to convert resourceOwner strings to JoinableSites product strings
// ARI resource-owners whose resource-type == 'site' do set resource-id to {cloudId}
// See https://developer.atlassian.com/platform/atlassian-resource-identifier/resource-owners/registry/
const tenantedProducts: { [key: string]: string } = {
  confluence: ProductKey.CONFLUENCE,
  // 'jira': ???, // 'jira' is a valid tenanted ARI, but it is not used downstream and its presence may cause a bug
  'jira-core': ProductKey.JIRA_CORE,
  'jira-servicedesk': ProductKey.JIRA_SERVICE_DESK,
  'jira-software': ProductKey.JIRA_SOFTWARE,
  opsgenie: ProductKey.OPSGENIE,
  // 'platform': ???, // 'platform' is a valid tenanted ARI, but it is not used downstream and its presence may cause a bug
  statuspage: ProductKey.STATUSPAGE,
};

// The ARI resource-owners whose resource-type == 'site' do NOT set resource-id to {cloudId} (typically set to a constant
// string of their resource-owner name, e.g. resource-owner is Trello, then resource-id is 'trello')
/* Not used, commented to avoid linting error
const nonTenantedProducts: {[key: string]: string}  = {
  'bitbucket': ProductKey.BITBUCKET,
  'trello': ProductKey.TRELLO,
}
*/

export const fetchProductRecommendationsInternal = (
  baseUrl: string = '',
): Promise<JoinableSitesResponse> => {
  return fetchJson<ProductRecommendationsResponse>(
    `${baseUrl}/v1/product-recommendations` +
      // Query parameters are optional filters. All results are returned by default.
      '?capability=DIRECT_ACCESS' +
      // Subsequent conditions are prefaced with '&'
      // i.e. + '&product=confluence'
      '&product=jira-software&product=jira-servicedesk&product=jira-core&product=confluence',
    {
      method: 'get',
    },
  ).then(response => {
    return convertProductRecommendationsResponseToJoinableSitesResponse(
      response,
    );
  });
};

const convertProductRecommendationsResponseToJoinableSitesResponse = (
  input: ProductRecommendationsResponse,
): JoinableSitesResponse => {
  /*
    JoinableSitesResponse shape
    {
      sites: [
        {
          // JoinableSites type
          cloudId: string
          url: string
          displayName: string
          avatarUrl?: string
          relevance?: string
          // At least one of: 'products', 'users'. We always use 'products' here.
          products: // Undefined OR Array of JoinableProductDetails OR array array of string. We always use Array of JoinableProductDetails here.
            [
              collaborators: [ // Collaborators is empty. Neither Joinable-Sites(old) or Product-Recommendations(new) can supply them
                avatarUrl: string;
                displayName: string;
                relevance?: number;
              ];
              productUrl: string;
            ]
            // OR
            [
              string[]
            ]
          users: [
            avatarUrl: string;
            displayName: string;
            relevance?: number;
          ]
        }
      ]
    }
   */

  /* Intermediate representation for holding parsed input data. As we are only returning results for tenanted products,
   * this uses cloudId as the key. Associative array used since order of cloudIds is unknown. product-recommendations
   * returns a (flat) list of all products for possibly many cloudIds, both of which are encoded in the ARI. This
   * unflattens the list, sorting the products by the cloudId as required by the JoinableSitesResponse data structure.
   */
  const sites: { [key: string]: JoinableSite } = {};

  input.capability.DIRECT_ACCESS.forEach((inputResource, index) => {
    const ari: ARI = parseAri(inputResource.resourceId);

    if (tenantedProducts[ari.resourceOwner] && ari.resourceType === 'site') {
      if (ari.resourceId in sites) {
        // Update this site with the new product
        // @ts-ignore Initializer branch assumes products is an array of JoinableProductDetails
        sites[ari.resourceId].products[ari.resourceOwner] = <
          JoinableProductDetails
        >{
          collaborators: <JoinableSiteUser[]>[],
          productUrl: inputResource.url,
        };
      } else {
        // Add site with this product
        const url = new URL(inputResource.url);

        const products: { [key: string]: JoinableProductDetails } = {};
        products[tenantedProducts[ari.resourceOwner]] = {
          collaborators: <JoinableSiteUser[]>[], // product-recommendations cannot provide collaborators. Collaborators are not used as of 2021 Jan
          productUrl: inputResource.url,
        };

        sites[ari.resourceId] = {
          cloudId: ari.resourceId,
          url: url.origin,
          displayName: inputResource.displayName,
          products: products,
          relevance: Math.max(1000 - index, 0),
        };
      }
    }
  });

  // Place sites into Array as required by JoinableSitesResponse
  const sitesArray: JoinableSite[] = [];
  for (const cloudId in sites) {
    sitesArray.push(sites[cloudId]);
  }
  return {
    sites: sitesArray,
  };
};

const parseAri = (input: string): ARI => {
  /* Valid ARI: https://developer.atlassian.com/platform/atlassian-resource-identifier/spec/ari-latest/#syntax
   * ari:cloud:<resource_owner>::<resource_type>/<resource_id>
   * ari:cloud:<resource_owner>:<cloud_id>:<resource_type>/<resource_id>
   */
  const colonSplitInput = input.split(':');
  if (
    colonSplitInput.length !== 5 ||
    colonSplitInput[0] !== 'ari' ||
    colonSplitInput[1] !== 'cloud'
  ) {
    // Not a valid ARI https://developer.atlassian.com/platform/atlassian-resource-identifier/spec/ari-latest/#syntax
    // as of 2021 Jan
    throw new Error('Invalid ARI');
  }

  const slashSplitInput = colonSplitInput[4].split('/');
  if (slashSplitInput.length !== 2) {
    // Not a valid ARI https://developer.atlassian.com/platform/atlassian-resource-identifier/spec/ari-latest/#syntax
    // as of 2021 Jan
    throw new Error('Invalid ARI');
  }

  return {
    uriScheme: colonSplitInput[0],
    cloud: colonSplitInput[1],
    resourceOwner: colonSplitInput[2],
    // For back-compatibility with Jira and Confluence. May be empty
    cloudId: colonSplitInput[3],
    resourceType: slashSplitInput[0],
    resourceId: slashSplitInput[1],
  };
};

export const fetchProductRecommendations = (baseUrl: string) => () =>
  fetchProductRecommendationsInternal(baseUrl);
