import type { PartnerType } from "@/types";

interface PartnerTypeGuardProps extends BasePartnerTypeGuardProps {
  wantedType: PartnerType;
}

type BasePartnerTypeGuardProps = {
  partnerType: PartnerType;
  children: React.ReactNode;
};

function PartnerTypeGuard({
  partnerType,
  wantedType,
  children,
}: PartnerTypeGuardProps) {
  return partnerType === wantedType ? children : null;
}

function VetTypeGuard({ children, partnerType }: BasePartnerTypeGuardProps) {
  return (
    <PartnerTypeGuard partnerType={partnerType} wantedType="VET">
      {children}
    </PartnerTypeGuard>
  );
}

function OrgTypeGuard({ children, partnerType }: BasePartnerTypeGuardProps) {
  return (
    <PartnerTypeGuard partnerType={partnerType} wantedType="ORG">
      {children}
    </PartnerTypeGuard>
  );
}

function ShopTypeGuard({ children, partnerType }: BasePartnerTypeGuardProps) {
  return (
    <PartnerTypeGuard partnerType={partnerType} wantedType="SHOP">
      {children}
    </PartnerTypeGuard>
  );
}

function ShelterTypeGuard({
  children,
  partnerType,
}: BasePartnerTypeGuardProps) {
  return (
    <PartnerTypeGuard partnerType={partnerType} wantedType="SHELTER">
      {children}
    </PartnerTypeGuard>
  );
}

export { VetTypeGuard, OrgTypeGuard, ShelterTypeGuard, ShopTypeGuard };
