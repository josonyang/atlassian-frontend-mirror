/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type ChangeEvent, type MouseEvent, useCallback, useState } from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { css, jsx } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

const resultStyles = css({
	borderColor: token('color.border'),
	borderStyle: 'dashed',
	borderWidth: token('border.width', '1px'),
	color: token('color.text.subtle'),
	marginBlockEnd: token('space.100', '8px'),
	marginBlockStart: token('space.100', '8px'),
	marginInlineEnd: token('space.100', '8px'),
	marginInlineStart: token('space.100', '8px'),
	paddingBlockEnd: token('space.100', '8px'),
	paddingBlockStart: token('space.100', '8px'),
	paddingInlineEnd: token('space.100', '8px'),
	paddingInlineStart: token('space.100', '8px'),
});

export default function UncontrolledExample() {
	const [onChangeResult, setOnChangeResult] = useState('Check & Uncheck to trigger onChange');
	const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setOnChangeResult(`isChecked in state: ${event.target.checked}`);
	}, []);
	const [onClickResult, setOnClickResult] = useState(
		'Hold shift/alt/cmd (or windows key) when clicking to test those alternative clicks',
	);

	const onClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
		const meta = event.metaKey ? 'Cmd/Windows key + ' : '';
		const alt = event.altKey ? 'Alt + ' : '';
		const shift = event.shiftKey ? 'Shift + ' : '';
		const result = `type of click: ${meta}${alt}${shift}click`;
		setOnClickResult(result);
	}, []);

	return (
		<div>
			<Checkbox
				onChange={onChange}
				onClick={onClick}
				label="Uncontrolled Checkbox"
				value="Uncontrolled Checkbox"
				name="uncontrolled-checkbox"
			/>

			<div css={resultStyles}>{onChangeResult}</div>
			<div css={resultStyles}>{onClickResult}</div>
		</div>
	);
}
