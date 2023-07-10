import { extractLozenge } from '../common/lozenge';
import type { JsonLd } from 'json-ld-types';
import type { LinkLozenge } from '../common/lozenge/types';
import { LinkLozengeInvokeActions } from '../common/lozenge/types';
import {
  InvokeRequest,
  InvokeRequestAction,
  SmartLinkActionType,
} from '@atlaskit/linking-types';
import {
  CardDetails,
  InvokeRequestWithCardDetails,
} from '../../state/hooks/use-invoke/types';
import { getExtensionKey } from '../../state/helpers';
import extractServerAction from './extract-server-action';
import { extractLink } from '@atlaskit/link-extractors';
import { extractPreviewAction } from './actions/extract-preview-action';
import { ServerActionOptions } from '../../view/FlexibleCard/types';

const toInvokeRequest = (
  extensionKey: string,
  resourceIdentifiers: InvokeRequestAction['resourceIdentifiers'],
  actionType?: InvokeRequestAction['actionType'],
  details?: CardDetails,
): InvokeRequest | InvokeRequestWithCardDetails | undefined => {
  if (!actionType) {
    return;
  }

  return {
    action: {
      actionType,
      resourceIdentifiers,
    },
    providerKey: extensionKey,
    details,
  };
};

const extractAction = (
  response?: JsonLd.Response,
  id?: string,
  options?: ServerActionOptions,
): LinkLozengeInvokeActions | undefined => {
  const extensionKey = getExtensionKey(response);
  const data = response?.data as JsonLd.Data.BaseData;
  const actions = extractServerAction(data);
  if (!extensionKey || actions.length === 0) {
    return;
  }

  const action = actions.find(
    (item) =>
      item?.name === 'UpdateAction' &&
      (item as JsonLd.Primitives.UpdateAction)?.refField === 'tag',
  ) as JsonLd.Primitives.UpdateAction;

  if (!action || !action.resourceIdentifiers) {
    return;
  }

  const read = toInvokeRequest(
    extensionKey,
    action.resourceIdentifiers,
    action.dataRetrievalAction?.name as SmartLinkActionType,
  );

  const url = extractLink(data);

  const previewData = response ? extractPreviewAction(response) : null;

  const details = { id, url, previewData };
  const update = toInvokeRequest(
    extensionKey,
    action.resourceIdentifiers,
    action.dataUpdateAction?.name as SmartLinkActionType,
    details,
  );

  return read || update
    ? {
        read,
        update,
        showFeatureDiscovery: options?.showStateActionFeatureDiscovery,
      }
    : undefined;
};

const extractState = (
  response?: JsonLd.Response,
  showServerActions?: boolean | ServerActionOptions,
  id?: string,
): LinkLozenge | undefined => {
  if (!response || !response.data) {
    return;
  }

  const lozenge = extractLozenge(response?.data as JsonLd.Data.BaseData);
  if (!lozenge) {
    return;
  }

  if (!showServerActions) {
    return lozenge;
  }

  const action = extractAction(
    response,
    id,
    typeof showServerActions === 'boolean' ? undefined : showServerActions,
  );
  return { ...lozenge, action };
};

export default extractState;
