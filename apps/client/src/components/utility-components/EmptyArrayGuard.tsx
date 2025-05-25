import React from "react";

type EmptyArrayGuardProps = {
  check: unknown[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

function EmptyArrayGuard({
  check,
  fallback = "-",
  children,
}: EmptyArrayGuardProps) {
  const isEmpty = check.length === 0;

  return isEmpty ? <>{fallback}</> : <>{children}</>;
}

export default EmptyArrayGuard;
