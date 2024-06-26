import { useState } from 'react';
import type RendererBridgeImplementation from '../native-to-web/implementation';
import type RendererConfiguration from '../renderer-configuration';

const useRendererConfiguration = (bridge: RendererBridgeImplementation) => {
	const [configuration, setConfiguration] = useState<RendererConfiguration>(
		bridge.getConfiguration(),
	);
	const callback = (config: RendererConfiguration) => setConfiguration(config);
	bridge.setCallbackToNotifyConfigChange(callback);
	return configuration;
};

export default useRendererConfiguration;
