/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - DatePickerProps
 *
 * @codegen <<SignedSource::b98fe76873a8f3fa9c534ac4e987a84e>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit2-codegen/datepicker/__generated__/index.partial.tsx <<SignedSource::fcbd99dda6073eec47f3c905804b6b06>>
 */
export interface FieldProps {
  id: string;
  isRequired: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  onChange: (event: any) => any;
  onBlur: () => any;
  onFocus: () => any;
  value: any;
  'aria-invalid': 'true' | 'false';
  'aria-labelledby': string;
  name: string;
}

type Appearance = 'default' | 'subtle' | 'none';
type Spacing = 'compact' | 'default';

export type DatePickerProps = {
   appearance?: Appearance;
   autoFocus?: boolean;
   defaultIsOpen?: boolean;
   defaultValue?: string;
   disabled?: string[];
   maxDate?: string;
   minDate?: string;
   isDisabled?: boolean;
   isOpen?: boolean;
   nextMonthLabel?: string;
   previousMonthLabel?: string;
   spacing?: Spacing;
   value?: string;
   isInvalid?: boolean;
   dateFormat?: string;
   placeholder?: string;
   locale?: string;
   testId?: string;
   weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
   onChange?:(value: string) => void;
} & Partial<Omit<FieldProps, 'onChange' | 'isRequired' >>;