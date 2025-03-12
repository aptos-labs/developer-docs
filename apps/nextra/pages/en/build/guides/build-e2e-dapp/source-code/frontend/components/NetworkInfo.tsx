import { Network } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal components
import { DisplayValue, LabelValueGrid } from "@/components/LabelValueGrid";
import { isValidNetworkName } from "@/utils/helpers";

export function NetworkInfo() {
  const { network } = useWallet();
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Network Info</h4>
      <LabelValueGrid
        items={[
          {
            label: "Network name",
            value: (
              <DisplayValue
                value={network?.name ?? "Not Present"}
                isCorrect={isValidNetworkName(network)}
                expected={Object.values<string>(Network).join(", ")}
              />
            ),
          },
          {
            label: "URL",
            value: network?.url ? (
              <a href={network.url} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-300">
                {network.url}
              </a>
            ) : (
              "Not Present"
            ),
          },
          {
            label: "Chain ID",
            value: <p>{network?.chainId ?? "Not Present"}</p>,
          },
        ]}
      />
    </div>
  );
}
