import {
  getFixedProductLinks,
  getSuggestedProductLink,
  getDiscoverSectionLinks,
} from '../../cross-flow-links';
import {
  ProvisionedProducts,
  ProductKey,
  SwitcherProductType,
  JoinableSite,
  Product,
} from '../../../../types';

import { resolveRecommendations } from '../../../../cross-flow/providers/recommendations';
import { SHOW_GIT_TOOLS_KEY } from '../../../../cross-flow/providers/recommendations/constants';

import mockJoinableSites from '../../../../../test-helpers/mockJoinableSites';

const generateProvisionedProducts = (
  activeProducts: SwitcherProductType[],
): ProvisionedProducts =>
  activeProducts.reduce(
    (acc, product) => ({
      ...acc,
      [product]: true,
    }),
    {},
  );

describe('cross-flow-links', () => {
  describe('fixed product links', () => {
    it('should have discover more button if enabled', () => {
      const isDiscoverMoreForEveryoneEnabled = true;
      const expectedProducts = ['discover-more'];
      const fixedLinks = getFixedProductLinks({
        isDiscoverMoreForEveryoneEnabled,
      });
      expect(fixedLinks.map(({ key }) => key)).toMatchObject(expectedProducts);
    });
  });

  describe('getXSellLink', () => {
    const suggestedProducts = resolveRecommendations();
    it('should offer both JSW and Confluence if no products are active', () => {
      const provisionedProducts = generateProvisionedProducts([]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('key', ProductKey.JIRA_SOFTWARE);
      expect(result[1]).toHaveProperty('key', ProductKey.CONFLUENCE);
    });
    it('should offer both JSW and JSD if Confluence is active', () => {
      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.CONFLUENCE,
      ]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('key', ProductKey.JIRA_SOFTWARE);
      expect(result[1]).toHaveProperty('key', ProductKey.JIRA_SERVICE_DESK);
    });
    it('should offer both Confluence and JSD if Jira is active', () => {
      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.JIRA_SOFTWARE,
      ]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('key', ProductKey.CONFLUENCE);
      expect(result[1]).toHaveProperty('key', ProductKey.JIRA_SERVICE_DESK);
    });
    it('should offer Jira Service Desk and Opsgenie if Confluence and JSW are active', () => {
      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.JIRA_SOFTWARE,
        SwitcherProductType.CONFLUENCE,
      ]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
      );
      expect(result.length).toEqual(2);
      expect(result[0]).toHaveProperty('key', ProductKey.JIRA_SERVICE_DESK);
      expect(result[1]).toHaveProperty('key', ProductKey.OPSGENIE);
    });
    it('should offer Confluence and Opsgenie, if JSW and JSD are active', () => {
      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.JIRA_SOFTWARE,
        SwitcherProductType.JIRA_SERVICE_DESK,
      ]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
      );
      expect(result.length).toEqual(2);
      expect(result[0]).toHaveProperty('key', ProductKey.CONFLUENCE);
      expect(result[1]).toHaveProperty('key', ProductKey.OPSGENIE);
    });
    it('should return Jira if Confluence and JSD are active', () => {
      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.JIRA_SERVICE_DESK,
        SwitcherProductType.CONFLUENCE,
      ]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
      );
      expect(result[0]).toHaveProperty('key', ProductKey.JIRA_SOFTWARE);
    });
    it('should offer Opsgenie if Confluence, JSD and JSW are active', () => {
      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.JIRA_SERVICE_DESK,
        SwitcherProductType.CONFLUENCE,
        SwitcherProductType.JIRA_SOFTWARE,
      ]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
      );
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('key', ProductKey.OPSGENIE);
    });

    it('should return an empty array if Confluence, JSD, JSW, and Opsgenie are active', () => {
      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.JIRA_SERVICE_DESK,
        SwitcherProductType.CONFLUENCE,
        SwitcherProductType.JIRA_SOFTWARE,
        SwitcherProductType.OPSGENIE,
      ]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
      );
      expect(result).toHaveLength(0);
    });

    it('should return only sites that are not joinable', () => {
      const joinableMockData = [
        ProductKey.CONFLUENCE,
        ProductKey.JIRA_SOFTWARE,
      ].map((productKey: ProductKey, index) => {
        const productData = mockJoinableSites.sites[index] as JoinableSite;
        return { ...productData };
      });

      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.CONFLUENCE,
      ]);

      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        joinableMockData,
      );

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('key', ProductKey.JIRA_SERVICE_DESK);
      expect(result[1]).toHaveProperty('key', ProductKey.OPSGENIE);
    });

    it('should not return OpsGenie if JSD is active and isMystiqueEnabled is true', () => {
      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.JIRA_SERVICE_DESK,
      ]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
        {
          isDiscoverSectionEnabled: true, // to return more than 2 products
          isMystiqueEnabled: true,
        },
      );
      expect(
        result.filter(product => product.key === ProductKey.OPSGENIE),
      ).toHaveLength(0);
    });

    it('should return OpsGenie if JSD is active and isMystiqueEnabled is false', () => {
      const provisionedProducts = generateProvisionedProducts([
        SwitcherProductType.JIRA_SERVICE_DESK,
      ]);
      const result = getSuggestedProductLink(
        provisionedProducts,
        suggestedProducts,
        [],
        {
          isDiscoverSectionEnabled: true, // to return more than 2 products
          isMystiqueEnabled: false,
        },
      );
      expect(
        result.filter(product => product.key === ProductKey.OPSGENIE),
      ).toHaveLength(1);
    });
  });

  describe('getDiscoverSectionLinks', () => {
    it('should return git tools link', () => {
      const result = getDiscoverSectionLinks({
        isDiscoverMoreForEveryoneEnabled: true,
        isEmceeLinkEnabled: true,
        product: Product.BITBUCKET,
        canManagePermission: true,
        canAddProducts: true,
        recommendationsFeatureFlags: {
          [SHOW_GIT_TOOLS_KEY]: true,
        },
      });

      expect(
        result.filter(link => link.key === SHOW_GIT_TOOLS_KEY),
      ).toHaveLength(1);
    });

    it('should not return git tools link', () => {
      const result = getDiscoverSectionLinks({
        isDiscoverMoreForEveryoneEnabled: true,
        isEmceeLinkEnabled: true,
        product: Product.BITBUCKET,
        canManagePermission: true,
        canAddProducts: true,
        recommendationsFeatureFlags: {
          [SHOW_GIT_TOOLS_KEY]: false,
        },
      });

      expect(
        result.filter(link => link.key === SHOW_GIT_TOOLS_KEY),
      ).toHaveLength(0);
    });
  });
});