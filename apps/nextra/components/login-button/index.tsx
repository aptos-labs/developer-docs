import React, { ReactNode } from "react";
import { Button } from "@components/landing/components/Button";

export function LoginButton({
  handleLogin,
  provider,
  icon,
  className,
}: {
  handleLogin: () => void;
  provider: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Button size="sm" variant="secondary" onClick={handleLogin}>
      <div className="flex items-center justify-center gap-2">
        Login with {provider}
        {/*{!!Icon && (<Icon className="w-26 h-26" />)}*/}
        {!!icon && icon}
      </div>
    </Button>
  );
}
