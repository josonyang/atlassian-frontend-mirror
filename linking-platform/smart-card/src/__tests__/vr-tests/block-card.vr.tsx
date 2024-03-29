import { snapshot } from '@af/visual-regression';

import BlockCardError from '../../../examples/vr-block-card/vr-block-card-error';
import BlockCardForbidden from '../../../examples/vr-block-card/vr-block-card-forbidden';
import BlockCardNotFound from '../../../examples/vr-block-card/vr-block-card-not-found';
import BlockCardNotFoundSiteAccessExists from '../../../examples/vr-block-card/vr-block-card-not-found-site-access-exists';
import BlockCardUnauthorised from '../../../examples/vr-block-card/vr-block-card-unauthorised';
import BlockCardUnauthorisedNoAuth from '../../../examples/vr-block-card/vr-block-card-unauthorised-no-auth';
import BlockCardResolvedJira from '../../../examples/vr-block-card/vr-block-card-resolved-jira';
import BlockCardResolvedConfluencePage from '../../../examples/vr-block-card/vr-block-card-resolved-confluence';
import BlockCardResolvedTrelloWithImagePreview from '../../../examples/vr-block-card/vr-block-card-resolved-trello-image-preview';
import BlockCardResolvedAtlas from '../../../examples/vr-block-card/vr-block-card-resolved-atlas';
import BlockCardResolvedBitbucket from '../../../examples/vr-block-card/vr-block-card-resolved-bitbucket';
import BlockCardForbiddenViews from '../../../examples/vr-block-card/vr-flexible-block-card-variants-of-forbidden-views';

snapshot(BlockCardError);
snapshot(BlockCardForbidden);
snapshot(BlockCardNotFound);
snapshot(BlockCardUnauthorised);
snapshot(BlockCardUnauthorisedNoAuth);
snapshot(BlockCardResolvedJira);
snapshot(BlockCardResolvedConfluencePage);
snapshot(BlockCardResolvedTrelloWithImagePreview);
snapshot(BlockCardResolvedAtlas);
snapshot(BlockCardResolvedBitbucket);

// //Same list of tests for refreshed block card design under the FF
// //TODO: Delete during the 'platform.linking-platform.smart-card.show-smart-links-refreshed-design' FF clean up

snapshot(BlockCardError, {
  description: 'refreshed block card error view',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});
// FIXME: This VR test has been flaky on CI and local. Build link: https://bitbucket.org/atlassian/atlassian-frontend/pipelines/results/2017497
// Report: https://statlas.prod.atl-paas.net/vr-report/atlassian-frontend:2017497/index.html
snapshot.skip(BlockCardForbidden, {
  description: 'refreshed block card forbidden view',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});
snapshot(BlockCardForbidden, {
  description: 'cross join refreshed block card forbidden view',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
    'platform.linking-platform.smart-card.cross-join': true,
  },
});
snapshot(BlockCardNotFound, {
  description: 'refreshed block card link not found',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});
snapshot(BlockCardNotFoundSiteAccessExists, {
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
    'platform.linking-platform.smart-card.cross-join': true,
  },
});
snapshot(BlockCardUnauthorised, {
  description: 'refreshed block card unauthorised view',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});
// FIXME: This VR test has been flaky on CI and local. Build link: https://bitbucket.org/atlassian/atlassian-frontend/pipelines/results/2017497
// Report: https://statlas.prod.atl-paas.net/vr-report/atlassian-frontend:2017497/index.html
snapshot.skip(BlockCardUnauthorisedNoAuth, {
  description: 'refreshed block card unauthorised view with no auth',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});
// FIXME: This VR test has been flaky on CI and local. Build link: https://bitbucket.org/atlassian/atlassian-frontend/pipelines/results/2017497
// Report: https://statlas.prod.atl-paas.net/vr-report/atlassian-frontend:2017497/index.html
snapshot.skip(BlockCardResolvedJira, {
  description: 'refreshed & updated metadata jira block card',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});

// FIXME: This VR test has been flaky on CI and local. Build link: https://bitbucket.org/atlassian/atlassian-frontend/pipelines/results/2017497
// Report: https://statlas.prod.atl-paas.net/vr-report/atlassian-frontend:2017497/index.html
snapshot.skip(BlockCardResolvedConfluencePage, {
  description: 'refreshed & updated metadata block card confluence ',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});

snapshot(BlockCardResolvedTrelloWithImagePreview, {
  description: 'refreshed & updated metadata block card trello ',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});

snapshot(BlockCardResolvedAtlas, {
  description: 'refreshed & updated metadata block card atlas ',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});

snapshot(BlockCardResolvedBitbucket, {
  description: 'refreshed & updated metadata block card BB ',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
  },
});

snapshot(BlockCardForbiddenViews, {
  description: 'cross join updated block card forbidden views ',
  featureFlags: {
    'platform.linking-platform.smart-card.show-smart-links-refreshed-design':
      true,
    'platform.linking-platform.smart-card.cross-join': true,
  },
});
