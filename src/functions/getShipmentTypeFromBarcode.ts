export default function getShipmentTypeFromBarcode(barcode: string): string {
  if (barcode.startsWith("C")) {
    return "sack";
  } else if (barcode.startsWith("P")) {
    return "package";
  }
  return "";
}
