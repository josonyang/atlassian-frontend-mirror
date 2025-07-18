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
		}, base * 250);
		return () => clearTimeout(timer);
	}, [base]);

	return visibleAt;
};

// Define each section component using the custom hook
const SectionOne = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionOne">
			{!visibleAt ? (
				<UFOLoadHold name="sectionOne"></UFOLoadHold>
			) : (
				<div data-testid="sectionOne" css={sectionOneStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
	);
};

const SectionTwo = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionTwo">
			{!visibleAt ? (
				<UFOLoadHold name="sectionTwo"></UFOLoadHold>
			) : (
				<div data-testid="sectionTwo" css={sectionTwoStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
	);
};

const SectionThree = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionThree">
			{!visibleAt ? (
				<UFOLoadHold name="sectionThree"></UFOLoadHold>
			) : (
				<div data-testid="sectionThree" css={sectionThreeStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
	);
};

const SectionFour = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionFour">
			{!visibleAt ? (
				<UFOLoadHold name="sectionFour"></UFOLoadHold>
			) : (
				<div data-testid="sectionFour" css={sectionFourStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
	);
};

const SectionFive = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionFive">
			{!visibleAt ? (
				<UFOLoadHold name="sectionFive"></UFOLoadHold>
			) : (
				<div data-testid="sectionFive" css={sectionFiveStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
	);
};

const SectionSix = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionSix">
			{!visibleAt ? (
				<UFOLoadHold name="sectionSix"></UFOLoadHold>
			) : (
				<div data-testid="sectionSix" css={sectionSixStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
	);
};

const SectionSeven = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionSeven">
			{!visibleAt ? (
				<UFOLoadHold name="sectionSeven"></UFOLoadHold>
			) : (
				<div data-testid="sectionSeven" css={sectionSevenStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
	);
};

const SectionEight = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionEight">
			{!visibleAt ? (
				<UFOLoadHold name="sectionEight"></UFOLoadHold>
			) : (
				<div data-testid="sectionEight" css={sectionEightStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
	);
};

const SectionNine = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionNine">
			{!visibleAt ? (
				<UFOLoadHold name="sectionNine"></UFOLoadHold>
			) : (
				<div data-testid="sectionNine" css={sectionNineStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
	);
};

const SectionTen = ({ base, appCreatedAt }: { base: number; appCreatedAt: number }) => {
	const visibleAt = useCounterToVisible(base);

	return (
		<UFOSegment name="sectionTen">
			{!visibleAt ? (
				<UFOLoadHold name="sectionTen"></UFOLoadHold>
			) : (
				<div data-testid="sectionTen" css={sectionTenStyle}>
					<h2> Rendered at: {visibleAt.toFixed(2)} ms</h2>
					<h3> App created at: {appCreatedAt.toFixed(2)} ms</h3>
				</div>
			)}
		</UFOSegment>
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
