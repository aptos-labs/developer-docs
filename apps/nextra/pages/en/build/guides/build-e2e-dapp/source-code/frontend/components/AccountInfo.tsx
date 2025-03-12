import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal components
import { LabelValueGrid, DisplayValue } from "@/components/LabelValueGrid";

export function AccountInfo() {
  const { account } = useWallet();
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Account Info</h4>
      <LabelValueGrid
        items={[
          {
            label: "Address",
            value: (
              <DisplayValue value={account?.address.toStringLong() ?? "Not Present"} isCorrect={!!account?.address} />
            ),
          },
          {
            label: "Public key",
            value: (
              <DisplayValue value={account?.publicKey.toString() ?? "Not Present"} isCorrect={!!account?.publicKey} />
            ),
          },
          {
            label: "ANS name",
            subLabel: "(only if attached)",
            value: <p>{account?.ansName ?? "Not Present"}</p>,
          },
        ]}
      />
    </div>
  );
}
