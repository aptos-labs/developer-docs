import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export type TransferAPTArguments = {
  to: string; // the account address to transfer the APT to
  amount: number; // the APT amount to transfer
};

export const transferAPT = (args: TransferAPTArguments): InputTransactionData => {
  const { to, amount } = args;
  return {
    data: {
      function: "0x1::coin::transfer",
      functionArguments: [to, amount],
      typeArguments: ["0x1::aptos_coin::AptosCoin"],
    },
  };
};
