import clsx from "clsx";
import React, { useState } from "react";
import Select from "react-select";

export const MOVE_PACKAGES = [
  "move-stdlib",
  "aptos-stdlib",
  "aptos-framework",
  "aptos-token",
  "aptos-token-objects",
] as const;

export type PackageOption = {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
};

export const packageOptions: readonly PackageOption[] = MOVE_PACKAGES.map(
  (item) => {
    const packageOption: PackageOption = {
      value: item,
      label: item,
      color: item,
    };
    return packageOption;
  },
);

export type GroupedOption = {
  readonly label: string;
  readonly options: readonly PackageOption[];
};

export const groupedOptions: readonly GroupedOption[] = [
  {
    label: "Modules",
    options: packageOptions,
  },
];

function FormatGroupLabel({ label, options }: GroupedOption) {
  return (
    <div className="flex items-center justify-between">
      <span className="dark:text-black">{label}</span>
      <span
        style={{
          backgroundColor: packageOptions[2].color,
          borderRadius: "2em",
          color: "#fff",
          display: "inline-block",
          fontSize: 12,
          fontWeight: "normal",
          lineHeight: "1",
          minWidth: 1,
          padding: "0.16666666666667em 0.5em",
          textAlign: "center",
        }}
      >
        {options.length}
      </span>
    </div>
  );
}

const controlStyles = {
  base: "border rounded-lg bg-white dark:bg-gray-900 hover:cursor-pointer",
  focus: "border-primary-600 ring-1 ring-primary-500",
  nonFocus:
    "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500",
};
const placeholderStyles = "text-gray-500 dark:text-gray-100 pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5 dark:text-gray-100";
const valueContainerStyles = "p-1 gap-1 dark:text-gray-100";
const singleValueStyles = "leading-7 ml-1 dark:text-gray-100";
const multiValueStyles =
  "bg-gray-100 dark:bg-gray-800 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5 dark:text-gray-100";
const multiValueRemoveStyles =
  "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-800 text-gray-500 dark:text-gray-400 hover:border-red-300";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles =
  "text-gray-500 dark:text-gray-400 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-800";
const indicatorSeparatorStyles = "bg-gray-300 dark:bg-gray-700";
const dropdownIndicatorStyles =
  "p-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md hover:text-black dark:hover:text-white";
const menuStyles =
  "p-1 mt-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg dark:text-gray-100";
const groupHeadingStyles =
  "ml-3 mt-2 mb-1 text-gray-500 dark:text-gray-100 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded dark:text-gray-100",
  focus: "bg-gray-100 dark:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700",
  selected:
    "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500 dark:text-gray-400",
};
const noOptionsMessageStyles =
  "text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700 rounded-sm";


export function ModuleSelect() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleChange = (selectedOption: string) => {
    setSelectedOption(selectedOption);
  };
  return (
    <Select<PackageOption, false, GroupedOption>
      inputId="basic-grouped-id"
      defaultValue={packageOptions[0]}
      options={groupedOptions}
      formatGroupLabel={FormatGroupLabel}
      classNames={{
        control: ({ isFocused }) =>
          clsx(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base,
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base,
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
    />
  );
}
