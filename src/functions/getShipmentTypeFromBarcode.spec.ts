import getShipmentTypeFromBarcode from "./getShipmentTypeFromBarcode";

describe("getShipmentTypeFromBarcode", () => {
  it("should return 'sack' if the barcode starts with 'C'", () => {
    const barcode = "C123456789";
    expect(getShipmentTypeFromBarcode(barcode)).toBe("sack");
  });

  it("should return 'package' if the barcode starts with 'P'", () => {
    const barcode = "P123456789";
    expect(getShipmentTypeFromBarcode(barcode)).toBe("package");
  });

  it("should return '' if the barcode does not start with 'C' or 'P'", () => {
    const barcode = "123456789";
    expect(getShipmentTypeFromBarcode(barcode)).toBe("");
  });
});
