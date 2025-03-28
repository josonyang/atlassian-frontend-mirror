import { fg } from '@atlaskit/platform-feature-flags';

export const APS_STARGATE_PATH = '/gateway/wss/fps';

/**
 * Reconnect retries need to have a more spread out starting delay,
 * to reduce the chances of reconnect storms as much as possible.
 */
export const reconnectBackoffOptions = (isHidden: boolean) => {
	return {
		delayFirstAttempt: true,
		startingDelay: shouldDelayRetry(isHidden)
			? 5000 + Math.random() * 5 * 60 * 1000
			: 500 + Math.random() * 3 * 60 * 1000,
		timeMultiple: 2,
		numOfAttempts: 5,
		maxDelay: 60 * 5 * 1000,
	};
};

/**
 * Retries made to establish the first connection can have a shorter
 * starting delay. This will allow the client to fallback to the secondary
 * protocol quickly.
 */
export const firstConnectBackoffOptions = (isFallback: boolean) => {
	return {
		delayFirstAttempt: fg('platform-delay-retries-on-first-connect-fps'),
		startingDelay: fg('platform-delay-retries-on-first-connect-fps')
			? 500 + Math.random() * 3 * 60 * 1000
			: 200,
		timeMultiple: 2,
		numOfAttempts: isFallback ? 5 : 3,
		maxDelay: 60 * 10 * 1000,
	};
};

// "sequenceNumber" is usually obtained from consumed messages. Here, we're getting its value based on the
// timestamp when the connection is established to cover the scenario where zero messages are received as part
// of the connection.
export const getTimestampBasedSequenceNumber = () => {
	return Math.floor(new Date().getTime() / 1000); // timestamp in seconds
};

export const shouldDelayRetry = (isHidden: boolean) => {
	return isHidden && fg('platform-delay-retries-for-clients-on-fps');
};
