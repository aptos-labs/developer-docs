"use client";

import { Button } from "@components/landing/components/Button";
import { useAuth } from "../../hooks/useAuth";
import { LoginButton } from "@components/login-button";
import { IconGithub, IconGoogle } from "@components/landing/components/Icons";
import { FaucetForm } from "@components/faucet/FaucetForm";

export interface FaucetProps {
  showGithub?: boolean;
}

export function Faucet({ showGithub = false }: FaucetProps) {
  const { error, user, handleGithubLogin, handleGoogleLogin, handleLogout } =
    useAuth();

  if (error) {
    return (
      <p className="text-text-error mt-8">
        Could not instantiate a connection with firebase. Please make sure the
        correct environment variables are specified.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 mt-8">
        {user ? (
          <div className="flex flex-col gap-16 items-start">
            <FaucetForm />
            <Button
              size="sm"
              variant="secondary"
              onClick={handleLogout}
              className="text-text-muted border-text-muted"
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <LoginButton
              handleLogin={handleGoogleLogin}
              provider="Google"
              icon={<IconGoogle style={{ width: "16", height: "16" }} />}
            />
            {showGithub && (
              <LoginButton
                handleLogin={handleGithubLogin}
                provider="GitHub"
                icon={<IconGithub />}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
