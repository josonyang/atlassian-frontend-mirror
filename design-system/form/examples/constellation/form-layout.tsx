import React from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/new';
import { Checkbox } from '@atlaskit/checkbox';
import Form, { Field, FormFooter, FormHeader, FormSection, RequiredAsterisk } from '@atlaskit/form';
import { RadioGroup } from '@atlaskit/radio';
import Select, {
	components,
	type InputProps,
	type OptionType,
	type ValueType,
} from '@atlaskit/select';
import Textfield from '@atlaskit/textfield';

const RequiredInput = (props: InputProps<OptionType, false>) => {
	const newProps = {
		...props,
		'aria-required': true,
	};
	return <components.Input {...newProps} />;
};

const FormLayoutExample = () => {
	return (
		<div
			style={{
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				display: 'flex',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				width: '400px',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				margin: '0 auto',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				minHeight: '60vh',
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				flexDirection: 'column',
			}}
		>
			<Form onSubmit={console.log}>
				{({ formProps }) => (
					<form
						{...formProps}
						action="//httpbin.org/get"
						method="GET"
						target="submitFrame"
						name="create-repo"
					>
						<FormHeader title="Create a new repository">
							<p aria-hidden="true">
								Required fields are marked with an asterisk <RequiredAsterisk />
							</p>
						</FormHeader>

						<FormSection>
							<Field<ValueType<OptionType>>
								label="Owner"
								name="owner"
								id="owner"
								defaultValue={{
									label: 'Atlassian',
									value: 'atlassian',
								}}
							>
								{({ fieldProps: { id, ...rest } }) => (
									<Select
										id={`${id}-select`}
										isSearchable={false}
										options={[
											{ label: 'Atlassian', value: 'atlassian' },
											{ label: 'Sean Curtis', value: 'scurtis' },
											{ label: 'Mike Gardiner', value: 'mg' },
											{ label: 'Charles Lee', value: 'clee' },
										]}
										{...rest}
									/>
								)}
							</Field>

							<Field<ValueType<OptionType>>
								aria-required={true}
								name="project"
								id="project"
								label="Project"
								isRequired
							>
								{({ fieldProps: { id, ...rest } }) => (
									<Select
										components={{ Input: RequiredInput }} // Needed to explicitly set required on the Select
										id={`${id}-select`}
										options={[
											{ label: 'Atlaskit', value: 'atlaskit' },
											{ label: 'Bitbucket', value: 'bitbucket' },
											{ label: 'Confluence', value: 'confluence' },
											{ label: 'Jira', value: 'jira' },
										]}
										placeholder="Choose a project&hellip;"
										{...rest}
									/>
								)}
							</Field>

							<Field name="repo-name" label="Repository name" defaultValue="">
								{({ fieldProps }) => <Textfield {...fieldProps} />}
							</Field>

							<Field name="access-level" label="Access level">
								{({ fieldProps: { value, ...others } }) => (
									<Checkbox label="This is a private repository" isChecked={!!value} {...others} />
								)}
							</Field>
							<Field name="color" label="Pick a color">
								{({ fieldProps: { value, ...others } }) => (
									<RadioGroup
										options={[
											{ name: 'color', value: 'red', label: 'Red' },
											{
												name: 'color',
												value: 'blue',
												label: 'Blue',
											},
											{ name: 'color', value: 'yellow', label: 'Yellow' },
											{ name: 'color', value: 'green', label: 'Green' },
										]}
										value={value}
										{...others}
									/>
								)}
							</Field>
							<Field<ValueType<OptionType>>
								name="include-readme"
								id="include-readme"
								label="Include a README?"
								defaultValue={{ label: 'No', value: 'no' }}
							>
								{({ fieldProps: { id, ...rest } }) => (
									<Select
										id={`${id}-select`}
										isSearchable={false}
										options={[
											{ label: 'No', value: 'no' },
											{
												label: 'Yes, with a template',
												value: 'yes-with-template',
											},
											{
												label: 'Yes, with a tutorial (for beginners)',
												value: 'yes-with-tutorial',
											},
										]}
										{...rest}
									/>
								)}
							</Field>
						</FormSection>
						<FormFooter>
							<ButtonGroup label="Form submit options">
								<Button appearance="subtle" id="create-repo-cancel">
									Cancel
								</Button>
								<Button appearance="primary" id="create-repo-button" type="submit">
									Create repository
								</Button>
							</ButtonGroup>
						</FormFooter>
					</form>
				)}
			</Form>
		</div>
	);
};

export default FormLayoutExample;
