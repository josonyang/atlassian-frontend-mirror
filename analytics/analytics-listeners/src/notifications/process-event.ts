/**
 * Inspired by analytics-web-react
 */

import last from 'lodash/last';
import merge from 'lodash/merge';

import {
  DEFAULT_SOURCE,
  UI_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  GasPayload,
  GasScreenEventPayload,
} from '@atlaskit/analytics-gas-types';

import {
  getSources,
  getExtraAttributes,
  getPackageInfo,
  getComponents,
} from '../helpers/extract-data-from-event';
import Logger from '../helpers/logger';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { NOTIFICATIONS_CONTEXT } from '@atlaskit/analytics-namespaced-context';
import { FabricChannel } from '../types';

const listenerVersion = process.env._PACKAGE_VERSION_ as string;

/**
 * This util exists to convert the analytics-next event format into the analytics platform format.
 *
 * Analytics-next event format:
 * event {
 *      payload: {
 *          ...attributesFromLowestPointInTheTree
 *      },
 *      context: [{
 *          ...attributesFromHighestPointInTheTree
 *      }, {
 *          ...attributesFromSecondHighestPointInTheTree
 *      }]
 * }
 *
 * Analytics platform event format:
 *  event {
 *      type: @atlaskit/analytics-gas-types.EventType
 *      payload {
 *          ...mandatoryAttributesBasedOnEventType
 *          attributes: {
 *              ...arbitraryAttributes
 *          }
 *      }
 *  }
 */

export default (
  event: UIAnalyticsEvent,
  logger: Logger,
): GasPayload | GasScreenEventPayload | null => {
  const sources = getSources(event, NOTIFICATIONS_CONTEXT);
  const source = last(sources) || DEFAULT_SOURCE;
  const extraAttributes = getExtraAttributes(event, NOTIFICATIONS_CONTEXT);
  const components = getComponents(event, NOTIFICATIONS_CONTEXT);

  const packages = getPackageInfo(event, NOTIFICATIONS_CONTEXT);
  const { packageName, packageVersion } =
    last(getPackageInfo(event, NOTIFICATIONS_CONTEXT)) || ({} as any);
  const packageHierarchy = packages.map((p) =>
    p.packageVersion ? `${p.packageName}@${p.packageVersion}` : p.packageName,
  );

  const {
    eventType = UI_EVENT_TYPE,
    action,
    actionSubject,
    actionSubjectId,
    attributes: payloadAttributes,
    name,
  } = event.payload;
  const attributes = {
    listenerVersion,
    sourceHierarchy: sources.join('.') || undefined,
    componentHierarchy: components.join('.') || undefined,
    packageHierarchy: packageHierarchy.join(',') || undefined,
    ...{ packageName, packageVersion },
    ...merge(extraAttributes, payloadAttributes),
  };
  // Ensure navigation tag is not duplicated by using Set
  const tags: Set<string> = new Set(event.payload.tags || []);
  tags.add(FabricChannel.notifications);

  if (event.payload) {
    switch (eventType) {
      case UI_EVENT_TYPE:
      case OPERATIONAL_EVENT_TYPE:
      case TRACK_EVENT_TYPE:
        return {
          eventType,
          source,
          actionSubject,
          action,
          actionSubjectId,
          attributes,
          tags: Array.from(tags),
        } as any;
      case SCREEN_EVENT_TYPE:
        return {
          eventType,
          name,
          attributes,
          tags: Array.from(tags),
        };
      default:
        logger.error('Invalid event type', eventType);
        break;
    }
  }

  return null;
};
