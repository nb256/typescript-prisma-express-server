import { ShipmentStatus } from "@prisma/client";
import getValueFromStatus from "./getValueFromStatus";

describe("getValueFromStatus function", () => {
  it("should return the correct value for each status", () => {
    expect(getValueFromStatus(ShipmentStatus.CREATED)).toBe(1);
    expect(getValueFromStatus(ShipmentStatus.LOADED_INTO_SACK)).toBe(2);
    expect(getValueFromStatus(ShipmentStatus.LOADED)).toBe(3);
    expect(getValueFromStatus(ShipmentStatus.UNLOADED)).toBe(4);
  });
});
