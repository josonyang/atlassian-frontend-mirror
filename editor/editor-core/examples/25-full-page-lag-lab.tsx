/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { format } from 'url';

import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import Button from '@atlaskit/button/new';
import { Drawer, DrawerCloseButton, DrawerContent, DrawerSidebar } from '@atlaskit/drawer';
import { token } from '@atlaskit/tokens';

import type EditorActions from '../src/actions';

import { default as FullPageExample } from './5-full-page';

// helper function to read url args
const readUrlParams = () => {
	const params = new URLSearchParams(window.parent.location.search);
	const getParam = (name: string, defaultValue: string): string => {
		return params.get(name) || defaultValue;
	};

	let defaultLatencyMode = getParam('lagMode', LATENCY_MODE_FIXED);
	if (defaultLatencyMode !== LATENCY_MODE_FIXED && defaultLatencyMode !== LATENCY_MODE_VARIABLE) {
		defaultLatencyMode = LATENCY_MODE_FIXED;
	}

	return {
		defaultLatencyMode: defaultLatencyMode as LatencyMode,
		defaultFixedLatency: Number.parseInt(getParam('lagInput', '300')),
		defaultRangeLatencyFrom: Number.parseInt(getParam('lagFrom', '10')),
		defaultRangeLatencyTo: Number.parseInt(getParam('lagTo', '300')),
		defaultInitLatency: Number.parseInt(getParam('lagInit', '0')),
		defaultFocusLatency: Number.parseInt(getParam('lagFocus', '0')),
		defaultShowPanel: Boolean(getParam('lagPanel', '')),
	};
};

const getRandomBetween = (from: number, to: number) => {
	if (from > to) {
		[from, to] = [to, from];
	}
	return from + Math.floor(Math.random() * (to - from));
};

/*
 * An example which allows user to get a feel for how much latency
 * affects their tolerance towards the editor.
 */
const LATENCY_MODE_FIXED = 'fixed';
const LATENCY_MODE_VARIABLE = 'variable';
type LatencyMode = 'fixed' | 'variable';

const LATENCY_PRESETS = [
	{ value: 0, label: 'None' },
	{ value: 10, label: 'Good' },
	{ value: 25, label: 'Baseline' },
	{ value: 50, label: 'Hmm' },
	{ value: 100, label: 'Noticable' },
	{ value: 200, label: 'Bad' },
	{ value: 500, label: 'Awful' },
	{ value: 1000, label: 'Nope' },
	{ value: 3000, label: 'Pls No' },
];

const {
	defaultLatencyMode,
	defaultFixedLatency,
	defaultRangeLatencyFrom,
	defaultRangeLatencyTo,
	defaultInitLatency,
	defaultFocusLatency,
	defaultShowPanel,
} = readUrlParams();

// Lock the main thread until we've wasted enough time
const lag = (delay: number) => {
	const startTime = Date.now();

	while (Date.now() < startTime + delay) {
		// noop
	}
};

const exampleWrapper = css({
	display: 'flex',
	height: '100%',
});

const latencyPanelContainer = css({
	maxWidth: '250px',
	padding: token('space.200', '16px'),
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	"input[type='number']": {
		width: '230px',
		padding: token('space.050', '4px'),
		margin: token('space.050', '4px'),
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
		'&:first-child': {
			marginLeft: 0,
		},
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
		'&:last-child': {
			marginRight: 0,
		},
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'div.range': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
		"input[type='number']": {
			width: '75px',
		},
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'div.preset-buttons': {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
		'> button': {
			width: '33%',
			fontSize: '0.9em',
		},
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'div.action-buttons': {
		display: 'flex',
		flexDirection: 'column',
	},
});

const fullPageExampleWrapper = css({
	flexGrow: 1,
});

interface LatencyPanelProps {
	latencyMode: LatencyMode;
	onLatencyModeChanged: (mode: LatencyMode) => void;
	fixedLatency: number;
	variableLatencyFrom: number;
	variableLatencyTo: number;
	onFixedLatencyChange: (mode: number) => void;
	onVariableLatencyFromChange: (mode: number) => void;
	onVariableLatencyToChange: (mode: number) => void;
	onInitLatencyChange: (mode: number) => void;
	onFocusLatencyChange: (mode: number) => void;
}

const LatencyPanel = (props: LatencyPanelProps) => {
	const [initLatency, setInitLatency] = React.useState(defaultInitLatency);
	const [focusLatency, setFocusLatency] = React.useState(defaultFocusLatency);

	const {
		latencyMode,
		onLatencyModeChanged,
		fixedLatency,
		variableLatencyFrom,
		variableLatencyTo,
		onFixedLatencyChange,
		onVariableLatencyFromChange,
		onVariableLatencyToChange,
		onInitLatencyChange,
		onFocusLatencyChange,
	} = props;

	const updateLatency = (callback: (value: number) => void) => {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = Math.abs(Number.parseInt(event.target.value || '0'));
			callback(value);
		};
	};

	const onApplyClick = () => {
		onInitLatencyChange(initLatency);
		onFocusLatencyChange(focusLatency);
	};

	const onCopyClick = () => {
		const params = new URLSearchParams(window.parent.location.search);
		const data: any = {
			lagMode: latencyMode,
			lagInput: fixedLatency,
			lagFrom: variableLatencyFrom,
			lagTo: variableLatencyTo,
			lagInit: initLatency,
			lagFocus: focusLatency,
		};
		Object.keys(data).forEach((key) => params.set(key, data[key]));
		params.delete('lagPanel');

		const url = format({
			...window.parent.location,
			search: params.toString(),
		});
		window.parent.history.pushState(data, window.parent.document.title, url);

		// this relies on autoFocus on #latency-type-fixed to suceed
		navigator.clipboard.writeText(url).catch((error) => {
			alert(`Copy failed! ${error}`);
		});
	};

	return (
		<div id="latencyPanelContainer" css={latencyPanelContainer}>
			<h2>Adjust latency</h2>

			<div>
				<p>
					{/* eslint-disable-next-line @atlaskit/design-system/no-html-radio */}
					<input
						// autoFocus is used to prevent "copy link for sharing" from failing
						// due to document in iframe not having focus after running
						// __showPanel() in dev console
						autoFocus
						id="latency-type-fixed"
						type="radio"
						name="latency-type"
						checked={latencyMode === LATENCY_MODE_FIXED}
						onChange={() => {
							onLatencyModeChanged(LATENCY_MODE_FIXED);
						}}
					/>{' '}
					<label htmlFor="latency-type-fixed">Fixed latency (ms)</label>
				</p>
				<input
					type="number"
					value={fixedLatency}
					min="0"
					onChange={updateLatency(onFixedLatencyChange)}
				/>
			</div>

			<p>Presets:</p>
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766 */}
			<div className="preset-buttons">
				{LATENCY_PRESETS.map(({ value, label }) => (
					<Button onClick={() => onFixedLatencyChange(value)} key={value}>
						{label}
					</Button>
				))}
			</div>

			<hr role="presentation" />
			<label>
				{/* eslint-disable-next-line @atlaskit/design-system/no-html-radio */}
				<input
					type="radio"
					name="latency-type"
					checked={latencyMode === LATENCY_MODE_VARIABLE}
					onChange={() => {
						onLatencyModeChanged(LATENCY_MODE_VARIABLE);
					}}
				/>{' '}
				Variable latency (ms)
			</label>
			<br />
			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766 */}
			<div className="range">
				<input
					min="0"
					type="number"
					value={variableLatencyFrom}
					onChange={updateLatency(onVariableLatencyFromChange)}
				/>
				{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
				<label> to </label>
				<input
					min="0"
					type="number"
					value={variableLatencyTo}
					onChange={updateLatency(onVariableLatencyToChange)}
				/>
			</div>

			<hr role="presentation" />

			<div>
				<p>
					<label htmlFor="init-latency">Initial render latency (ms)</label>
				</p>
				<input
					id="init-latency"
					min="0"
					type="number"
					value={`${initLatency}`}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						updateLatency(setInitLatency)(event);
					}}
				/>
			</div>

			<div>
				<p>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label>Focus latency (ms)</label>
				</p>
				<input
					type="number"
					value={focusLatency}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						updateLatency(setFocusLatency)(event);
					}}
				/>
			</div>

			<hr role="presentation" />

			{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766  */}
			<div className="action-buttons">
				<Button onClick={onApplyClick}>Apply</Button>

				<Button appearance="primary" onClick={onCopyClick}>
					Copy link for sharing
				</Button>
			</div>
		</div>
	);
};

export default function Example() {
	const [latencyMode, setLatencyMode] = React.useState(defaultLatencyMode);
	const [fixedLatency, setFixedLatency] = React.useState(defaultFixedLatency);
	const [variableLatencyFrom, setVariableLatencyFrom] = React.useState(defaultRangeLatencyFrom);
	const [variableLatencyTo, setVariableLatencyTo] = React.useState(defaultRangeLatencyTo);
	const [initLatency, setInitLatency] = React.useState(defaultInitLatency);
	const [focusLatency, setFocusLatency] = React.useState(defaultFocusLatency);
	const [showPanel, setPanelVisibility] = React.useState(defaultShowPanel);

	// make it accessible to devs
	(window as any).__showPanel = () => setPanelVisibility(true);
	const onClosePanel = () => setPanelVisibility(false);

	React.useEffect(() => {
		const keypressHandler = (event: KeyboardEvent) => {
			// ignore keypresses in LatencyPanel
			if ((event.target as Element).closest(`#latencyPanelContainer`)) {
				return;
			}

			// Safari doesn't have requestIdleCallback
			const requestCallback = (window as any).requestIdleCallback || window.requestAnimationFrame;
			const lastPressed = Date.now();
			const callbackId = requestCallback(() => {
				// Safari doesn't have cancelIdleCallback
				const cancelCallback = (window as any).cancelIdleCallback || window.cancelAnimationFrame;
				cancelCallback(callbackId);

				let latency = fixedLatency || 0;
				if (latencyMode === LATENCY_MODE_VARIABLE) {
					latency = getRandomBetween(variableLatencyFrom, variableLatencyTo);
				}
				const now = Date.now();
				const timeTaken = now - lastPressed;
				const artificialLag = latency - timeTaken;

				if (artificialLag > 0) {
					lag(artificialLag);
				}
				console.log('event took', `${timeTaken}ms`, 'artificial latency', `${artificialLag}ms`);
			});
		};

		// Ignored via go/ees005
		// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
		document.addEventListener('keypress', keypressHandler);

		return () => {
			// Ignored via go/ees005
			// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
			document.removeEventListener('keypress', keypressHandler);
		};
	});

	const onEditorReady = (_: EditorActions, timeTaken?: number) => {
		// set up focus latency
		// Ignored via go/ees005
		// eslint-disable-next-line @repo/internal/dom-events/no-unsafe-event-listeners
		document.querySelector('.ProseMirror')?.addEventListener('focus', () => {
			lag(focusLatency);
		});

		// initial render latency
		console.debug('initial render lag', `timeTaken ${timeTaken}ms`, `delay ${initLatency}ms`);
		lag(initLatency - (timeTaken || 0));
	};

	// When the React key changes, the component is destroyed and recreated.
	const editorKey = `editor-${latencyMode}-${initLatency}-${focusLatency}`;

	return (
		<div css={exampleWrapper}>
			<div css={fullPageExampleWrapper}>
				<FullPageExample key={editorKey} onExampleEditorReady={onEditorReady} />
			</div>

			<Drawer isOpen={showPanel} onClose={onClosePanel}>
				<DrawerSidebar>
					<DrawerCloseButton />
				</DrawerSidebar>
				<DrawerContent>
					<LatencyPanel
						latencyMode={latencyMode}
						onLatencyModeChanged={setLatencyMode}
						fixedLatency={fixedLatency}
						variableLatencyFrom={variableLatencyFrom}
						variableLatencyTo={variableLatencyTo}
						onFixedLatencyChange={setFixedLatency}
						onVariableLatencyFromChange={setVariableLatencyFrom}
						onVariableLatencyToChange={setVariableLatencyTo}
						onInitLatencyChange={setInitLatency}
						onFocusLatencyChange={setFocusLatency}
					/>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
