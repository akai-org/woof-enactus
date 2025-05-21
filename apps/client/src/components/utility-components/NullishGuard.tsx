type NullishGuardProps = {
  check: unknown | unknown[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

function NullishGuard({ check, fallback = "-", children }: NullishGuardProps) {
  const values = Array.isArray(check) ? check : [check];

  const hasNullish = values.some(
    value => value === null || value === undefined,
  );

  return hasNullish ? <>{fallback}</> : <>{children}</>;
}

export default NullishGuard;
