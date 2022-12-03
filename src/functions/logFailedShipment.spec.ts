import { prismaMock } from "../../__mocks__/prisma";
import { FailedShipmentReason } from "@prisma/client";

import logFailedShipment from "./logFailedShipment";

describe("logFailedShipment function", () => {
  it("should log a failed shipment", async () => {
    const failedShipmentResult = {
      id: 1,
      barcode: "P8988000125",
      toDeliveryPointValue: 2,
      reason: FailedShipmentReason["WRONG_DELIVERY_POINT"],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.failedShipment.create.mockResolvedValue(failedShipmentResult);

    await expect(
      logFailedShipment(
        failedShipmentResult.barcode,
        failedShipmentResult.toDeliveryPointValue,
        failedShipmentResult.reason
      )
    ).resolves.toEqual(failedShipmentResult);
  });
});
