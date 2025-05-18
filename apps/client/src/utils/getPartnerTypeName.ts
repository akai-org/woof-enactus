export const getPartnerTypeName = (type: string) => {
  switch (type) {
    case "VET":
      return "Weterynarz";
    case "ORG":
      return "Organizacja";
    case "SHOP":
      return "Sklep Zoologiczny";
    case "SHELTER":
      return "Schronisko";
    default:
      throw new Error(`${type} partner type doesn't exist.`);
  }
};
