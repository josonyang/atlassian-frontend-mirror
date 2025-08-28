import React, { Fragment } from 'react';

import { cssMap } from '@compiled/react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import { Checkbox } from '@atlaskit/checkbox';
import Form, {
	CheckboxField,
	ErrorMessage,
	Field,
	FormFooter,
	FormHeader,
	HelperMessage,
	MessageWrapper,
	RequiredAsterisk,
	ValidMessage,
} from '@atlaskit/form';
import { Flex } from '@atlaskit/primitives/compiled';
import TextField from '@atlaskit/textfield';

const styles = cssMap({
	flex: {
		width: '400px',
		maxWidth: '100%',
		margin: '0 auto',
	},
});

export default () => (
	<Flex xcss={styles.flex} direction="column">
		<Form<{ username: string; password: string; remember: boolean }>
			onSubmit={(data) => {
				console.log('form data', data);
				return new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
					data.username === 'error' ? { username: 'IN_USE' } : undefined,
				);
			}}
		>
			{({ formProps, submitting, reset }) => (
				<form {...formProps}>
					<FormHeader title="Sign in">
						<p aria-hidden="true">
							Required fields are marked with an asterisk <RequiredAsterisk />
						</p>
					</FormHeader>
					<Field name="username" label="Username" defaultValue="" isRequired>
						{({ fieldProps, error }) => (
							<Fragment>
								<TextField autoComplete="username" {...fieldProps} />
								<MessageWrapper>
									{!error && <HelperMessage>You can use letters, numbers & periods.</HelperMessage>}
									{error && (
										<ErrorMessage>This username is already in use, try another one.</ErrorMessage>
									)}
								</MessageWrapper>
							</Fragment>
						)}
					</Field>
					<Field
						name="password"
						label="Password"
						defaultValue=""
						isRequired
						validate={(value) => (value && value.length < 8 ? 'TOO_SHORT' : undefined)}
					>
						{({ fieldProps, error, valid, meta }) => (
							<Fragment>
								<TextField type="password" {...fieldProps} />
								<MessageWrapper>
									{!error && !valid && (
										<HelperMessage>
											Use 8 or more characters with a mix of letters, numbers & symbols.
										</HelperMessage>
									)}
									{error && (
										<ErrorMessage>
											Please enter a password that's longer than 8 characters.
										</ErrorMessage>
									)}
									{valid && meta.dirty && <ValidMessage>Awesome password!</ValidMessage>}
								</MessageWrapper>
							</Fragment>
						)}
					</Field>
					<CheckboxField name="remember" defaultIsChecked>
						{({ fieldProps }) => <Checkbox {...fieldProps} label="Always sign in on this device" />}
					</CheckboxField>
					<FormFooter>
						<ButtonGroup label="Form submit options">
							<Button appearance="subtle">Cancel</Button>
							<Button appearance="subtle" onClick={() => reset()}>
								Reset form
							</Button>
							<Button type="submit" appearance="primary" isLoading={submitting}>
								Sign in
							</Button>
						</ButtonGroup>
					</FormFooter>
				</form>
			)}
		</Form>
	</Flex>
);
