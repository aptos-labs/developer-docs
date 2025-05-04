import React from "react";
import clsx from "clsx";
import styles from "./tabs.module.css";

/**
 * @ignore Reference guide for Tabs with Radio inputs
 */
function _TabsOriginal() {
  return (
    <div className={styles.tabs}>
      <div className={styles.tab}>
        <input
          type="radio"
          id="tab-1"
          name="tab-group-1"
          className={styles.radioInput}
          defaultChecked
        />
        <label htmlFor="tab-1" className={styles.tabLabel}>
          1
        </label>
        <div className={styles.content}>
          <div className={styles.contentChild}>1</div>
        </div>
      </div>
      <div className={styles.tab}>
        <input
          type="radio"
          id="tab-2"
          name="tab-group-1"
          className={styles.radioInput}
        />
        <label htmlFor="tab-2" className={styles.tabLabel}>
          2
        </label>
        <div className={styles.content}>
          <div className={styles.contentChild}>2</div>
        </div>
      </div>
    </div>
  );
}

export interface TabItemProps {
  children: React.ReactElement;
  value: string;
  defaultChecked?: boolean;
  groupName?: string;
}

/**
 * TabItem Component for Nextra
 */
export function TabItem({
  children,
  value,
  defaultChecked,
  groupName,
}: TabItemProps) {
  return (
    <div className={styles.tab}>
      <input
        type="radio"
        id={`tab-${value}`}
        name={groupName}
        className={styles.radioInput}
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={`tab-${value}`}
        className={clsx(styles.tabLabel, "border-b-blue-400")}
      >
        {value}
      </label>
      <div className={clsx(styles.content, "dark:border-neutral-700")}>
        <div className={styles.contentChild}>{children}</div>
      </div>
    </div>
  );
}

export interface TabsProps {
  children: React.ReactElement;
  groupName: string;
  height?: string;
}

/**
 * Tabs Component for Nextra
 *
 * A groupName is provided to the Tabs parent component.
 * The <Tabs /> component then maps over each child and propagates
 * the groupName to each <TabItem /> child
 *
 * This is done to avoid the need to pass groupName individually
 * to each <TabItem /> individually
 *
 * Note also that <Tabs /> and <TabItem /> uses no JS or React state, making it
 * perfectly renderable server or client side
 *
 * @example
 * ```tsx
 * <Tabs groupName="release-branches" height="600px">
 *   <TabItem value="devnet" defaultChecked={true}>
 *     ```bash filename="Terminal"
 *     git checkout --track origin/devnet
 *     ```
 *   </TabItem>
 *   <TabItem value="testnet">
 *     ```bash filename="Terminal"
 *     git checkout --track origin/testnet
 *     ```
 *   </TabItem>
 *   <TabItem value="mainnet">
 *     ```bash filename="Terminal"
 *     git checkout --track origin/mainnet
 *     ```
 *   </TabItem>
 * </Tabs>
 * ```
 */
export function Tabs({ children, groupName, height }: TabsProps) {
  // Clone each child with the groupName prop added
  const childrenWithProps = React.Children.map(children, (child) => {
    // Verify that the child is a valid React element before cloning
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        groupName: groupName,
      } as Partial<unknown>);
    }
    return child;
  });

  return (
    <div style={{ height }} className={styles.tabs}>
      {childrenWithProps}
    </div>
  );
}
