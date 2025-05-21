declare module "woof" {
  interface SignInDto {
    username: string;
    password: string;
  }

  type GoodsState = "LOW" | "OK" | "MEDIUM";

  interface CreateNeededGoodsDto {
    name: string;
    note?: string;
    amountCurrent?: number;
    amountMax: number;
    amountUnit?: string;
    state: GoodsState;
    stateInfo?: string;
    partnerId: number;
  }

  interface UpdateNeededGoodsDto extends Partial<CreateNeededGoodsDto> {}

  type PartnerType = "VET" | "ORG" | "SHOP" | "SHELTER";

  interface CreatePartnerDto {
    name: string;
    type: PartnerType;
    description?: string;
    getToInfo?: string;
    city?: string;
    street?: string;
    postal?: string;
    phone?: string;
    website?: string;
    animals: string[];
    email?: string;
    image?: string;
    visitHours?: string;
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  }

  interface UpdatePartnerDto extends Partial<CreatePartnerDto> {}

  interface SuccessResponse<T = unknown> {
    ok: true;
    data: T;
  }

  interface ErrorResponse {
    ok: false;
    message: string;
    error: string;
  }

  type GenericResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

  type JwtType = "auth" | "refresh";

  interface JwtPayload {
    sub: string;
    username: string;
    exp: number;
    type: JwtType;
  }

  interface DatabaseEntity {
    id: number;
    uuid: string;
  }

  interface WorkingHours extends DatabaseEntity {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  }

  interface PartnerProfile extends DatabaseEntity {
    description?: string;
    getToInfo?: string;
    city?: string;
    street?: string;
    postal?: string;
    phone?: string;
    website?: string;
    animals: string[];
    visitHours?: string;
    openHours?: WorkingHours;
    email?: string;
    image?: string;
  }

  interface Partner extends DatabaseEntity {
    name: string;
    slug: string;
    latitude: number;
    longitude: number;
    type: PartnerType;
    accountId: number;
    profile?: PartnerProfile;
    neededGoods?: NeededGoods[];
    neededGoodsMeta?: NeededGoodsMeta;
  }

  interface PartnerAccount extends DatabaseEntity {
    username: string;
    partner?: Partner;
  }

  interface NeededGoods extends DatabaseEntity {
    name: string;
    amountCurrent?: number;
    amountMax: number;
    amountUnit?: string;
    state: GoodsState;
    stateInfo: String;
    createdAt: Date;
    updatedAt: Date;
  }

  interface NeededGoodsMeta extends DatabaseEntity {
    note?: string;
  }

  interface PartnerEvent extends DatabaseEntity {
    title: string;
    description: string;
    thumbnail?: string;
    eventDate: Date;
  }
}
