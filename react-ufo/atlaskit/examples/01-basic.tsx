/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useEffect, useMemo, useState } from 'react';

import { css, jsx } from '@compiled/react';

import UFOLoadHold from '@atlaskit/react-ufo/load-hold';
import UFOSegment from '@atlaskit/react-ufo/segment';

const sectionOneStyle = css({
	backgroundColor: '#FFB3BA', // Pastel Red
	gridArea: 'sectionOne',
	height: '100vh',
});

const sectionTwoStyle = css({
	backgroundColor: '#FFDFBA', // Pastel Orange
	gridArea: 'sectionTwo',
	height: '100vh',
});

const sectionThreeStyle = css({
	backgroundColor: '#FFFFBA', // Pastel Yellow
	gridArea: 'sectionThree',
	height: '100vh',
});

const sectionFourStyle = css({
	backgroundColor: '#BAFFC9', // Pastel Green
	gridArea: 'sectionFour',
	height: '100vh',
});

const sectionFiveStyle = css({
	backgroundColor: '#BAE1FF', // Pastel Blue
	gridArea: 'sectionFive',
	height: '100vh',
});

const sectionSixStyle = css({
	backgroundColor: '#E1BAFF', // Pastel Purple
	gridArea: 'sectionSix',
	height: '100vh',
});

const sectionSevenStyle = css({
	backgroundColor: '#FFB3E1', // Pastel Pink
	gridArea: 'sectionSeven',
	height: '100vh',
});

const sectionEightStyle = css({
	backgroundColor: '#D1BAFF', // Pastel Violet
	gridArea: 'sectionEight',
	height: '100vh',
});

const sectionNineStyle = css({
	backgroundColor: '#BAFFD1', // Pastel Mint
	gridArea: 'sectionNine',
	height: '100vh',
});

const sectionTenStyle = css({
	backgroundColor: '#BAF7FF', // Pastel Aqua
	gridArea: 'sectionTen',
	height: '100vh',
});

// Define style for the main App component using the `css` function
const appStyle = css({
	display: 'grid',
	gridTemplateColumns: 'repeat(10, 1fr)',
	gridTemplateAreas: `
    "sectionOne sectionTwo sectionThree sectionFour sectionFive sectionSix sectionSeven sectionEight sectionNine sectionTen"
  `,
	height: '100vh',
	fontSize: '1.2em',
});

// Custom hook for visibility delay
const useCounterToVisible = (base: number) => {
	const [visibleAt, setVisible] = useState<false | number>(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(performance.now());

			// (window as any).__react_ufo_tests_mark_next_frame({ elementId: base });
		}, base * 250);
		return () => clearTimeout(timer);
	}, [base]);

	return visibleAt;
};

// Define each section component using the custom hook
const SectionOne = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);
	if (!visibleAt) {
		return <UFOLoadHold name="section-one"></UFOLoadHold>;
	}

	return (
		<div data-lol="sectionOne" css={sectionOneStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

const SectionTwo = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	if (!visibleAt) {
		return <UFOLoadHold name="section-two"></UFOLoadHold>;
	}

	return (
		<div css={sectionTwoStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

const SectionThree = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	if (!visibleAt) {
		return <UFOLoadHold name="section-three"></UFOLoadHold>;
	}

	return (
		<div css={sectionThreeStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

const SectionFour = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	if (!visibleAt) {
		return <UFOLoadHold name="section-four"></UFOLoadHold>;
	}

	return (
		<div css={sectionFourStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

const SectionFive = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	if (!visibleAt) {
		return <UFOLoadHold name="section-five"></UFOLoadHold>;
	}

	return (
		<div css={sectionFiveStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

const SectionSix = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	if (!visibleAt) {
		return <UFOLoadHold name="section-six"></UFOLoadHold>;
	}

	return (
		<div css={sectionSixStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

const SectionSeven = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	if (!visibleAt) {
		return <UFOLoadHold name="section-seven"></UFOLoadHold>;
	}

	return (
		<div css={sectionSevenStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

const SectionEight = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	if (!visibleAt) {
		return <UFOLoadHold name="section-eight"></UFOLoadHold>;
	}

	return (
		<div css={sectionEightStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

const SectionNine = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	if (!visibleAt) {
		return <UFOLoadHold name="section-nine"></UFOLoadHold>;
	}

	return (
		<div css={sectionNineStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

const SectionTen = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	if (!visibleAt) {
		return <UFOLoadHold name="section-ten"></UFOLoadHold>;
	}

	return (
		<div css={sectionTenStyle}>
			<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
			<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
		</div>
	);
};

// Main App component
export default function Example() {
	const appCreatedAt = useMemo(() => performance.now(), []);
	return (
		<UFOSegment name="app-root">
			<div data-testid="main" css={appStyle}>
				<SectionOne base={1} appCreatedAt={appCreatedAt} />
				<SectionTwo base={2} appCreatedAt={appCreatedAt} />
				<SectionThree base={3} appCreatedAt={appCreatedAt} />
				<SectionFour base={4} appCreatedAt={appCreatedAt} />
				<SectionFive base={5} appCreatedAt={appCreatedAt} />
				<SectionSix base={6} appCreatedAt={appCreatedAt} />
				<SectionSeven base={7} appCreatedAt={appCreatedAt} />
				<SectionEight base={8} appCreatedAt={appCreatedAt} />
				<SectionNine base={9} appCreatedAt={appCreatedAt} />
				<SectionTen base={10} appCreatedAt={appCreatedAt} />
			</div>
		</UFOSegment>
	);
}
