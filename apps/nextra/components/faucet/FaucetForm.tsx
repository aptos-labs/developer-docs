"use client";

import React, { FormEvent, FormEventHandler, useState } from "react";
import { Button } from "@components/landing/components/Button";
import * as Form from "@radix-ui/react-form";
import { useAuth } from "../../hooks/useAuth";
import { IconCheck, IconWarning } from "@components/landing/components/Icons";
import Link from "next/link";

export function FaucetForm() {
  const [accountAddress, setAccountAddress] = useState<string>("");
  const [txnHash, setTxnHash] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  if (!user) {
    // This should never happen, only use this component if the user is logged in.
    return null;
  }

  const handleFaucetRequest = async (e: FormEvent<Element>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setTxnHash(null);
    const idToken = await user.getIdToken();
    const response = await fetch("https://faucet.testnet.aptoslabs.com/fund", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        // Required by the faucet.
        "x-is-jwt": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: accountAddress,
      }),
    });

    try {
      if (response.ok) {
        const data = await response.json();
        setTxnHash(data["txn_hashes"][0]);
      } else {
        const text = await response.text();
        const data: any = JSON.parse(text);
        if (typeof data === "string") {
          setError(data);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError(
            data["rejection_reasons"]
              .map((reason: any) => reason.reason)
              .join(", "),
          );
        }
      }
    } catch (e) {
      setError(`Unknown error: ${e}`);
    }
    setIsSubmitting(false);
  };

  const isSubmitEnabled = accountAddress && !isSubmitting;

  return (
    <div className="w-full">
      <Form.Root
        className="w-full flex items-end gap-4"
        onSubmit={handleFaucetRequest}
      >
        <Form.Field className="w-full grid" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
              Enter an account address below to receive APT
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="box-border inline-flex h-[34px] w-full appearance-none items-center justify-center rounded px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px_#DEDEE0] outline-none selection:text-white hover:shadow-[0_0_0_1px_white] focus:shadow-[white]"
              type="text"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild disabled={!isSubmitEnabled}>
          <Button size="sm">Mint</Button>
        </Form.Submit>
      </Form.Root>
      <div className="mt-6 text-[15px] font-medium">
        {txnHash && (
          <div className="flex gap-2 items-center">
            <IconCheck className="text-text-success" />
            Minted transaction {truncateHash(txnHash)}
            <Button
              size="sm"
              variant="secondary"
              className="text-text-success border-text-success"
            >
              <Link
                href={`https://explorer.aptoslabs.com/txn/0x${txnHash}?network=testnet`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on explorer
              </Link>
            </Button>
          </div>
        )}
        {error && (
          <div className="flex gap-2 items-center text-text-error">
            <IconWarning />
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

function truncateHash(input: string) {
  return input.length <= 10
    ? input
    : `${input.slice(0, 6)}...${input.slice(-4)}`;
}
