import { forwardRef } from "react";

export interface OptionProps {
  children: JSX.Element | string;
  selected: boolean;
  value: string;
}

export function Option({ children, selected, value, ...props }: OptionProps) {
  return (
    <option value={value} selected={selected} {...props}>
      {children}
    </option>
  );
}

interface GenericSelectProps
  extends React.PropsWithoutRef<JSX.IntrinsicElements["select"]> {}

/**
 * Select Nextra Component
 *
 * @example
 * ```tsx
 * <Select placeholder="Network" onChange={selectOnChange}>
 *  <Option value="Mainnet">Mainnet</Option>
 *  <Option value="Testnet">Testnet</Option>
 *  <Option value="Devnet">Devnet</Option>
 * </Select>
 * ```
 */
export const Select = forwardRef<HTMLSelectElement, GenericSelectProps>(
  ({ children, defaultValue, ...props }, ref) => (
    <select defaultValue={defaultValue} ref={ref} {...props}>
      {children}
    </select>
  ),
);

Select.Option = Option;

export default Select;
