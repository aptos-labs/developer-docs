import { Fragment, ReactNode } from "react";

export interface LabelValueGridProps {
  items: Array<{ label: string; subLabel?: string; value: ReactNode }>;
}

export function LabelValueGrid({ items }: LabelValueGridProps) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-2 break-words">
      {items.map(({ label, subLabel, value }) => (
        <Fragment key={label}>
          <div className="flex flex-col text-muted-foreground">
            <div>{label}</div>
            {subLabel && <div className="text-sm">{subLabel}</div>}
          </div>
          {value}
        </Fragment>
      ))}
    </div>
  );
}

export interface DisplayValueProps {
  value: string;
  isCorrect: boolean;
  expected?: string;
}

export function DisplayValue({ value, isCorrect, expected }: DisplayValueProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className={isCorrect ? "text-green-700 dark:text-green-300" : "text-red-600 dark:text-red-400"}>{value}</p>
      {!isCorrect && expected ? <p className="text-sm">Expected: {expected}</p> : null}
    </div>
  );
}
