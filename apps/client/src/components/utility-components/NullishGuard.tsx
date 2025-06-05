type NullishGuardProps = {
  check: unknown | unknown[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  falsy?: boolean; // If true, treat falsy values as nullish
};

function NullishGuard({
  check,
  fallback = "-",
  children,
  falsy = true,
}: NullishGuardProps) {
  const values = Array.isArray(check) ? check : [check];

  const hasNullish = values.some(value =>
    falsy ? !value : value === null || value === undefined,
  );

  return hasNullish ? <>{fallback}</> : <>{children}</>;
}

export default NullishGuard;
