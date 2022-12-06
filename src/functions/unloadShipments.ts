import { Package, Sack } from "@prisma/client";

import unloadPackage from "../database/unloadPackage";
import unloadSackAndItsPackages from "../database/unloadSackAndItsPackages";
import getShipmentTypeFromBarcode from "./getShipmentTypeFromBarcode";
import getValueFromStatus from "./getValueFromStatus";
import unloadEmptySack from "../database/unloadEmptySack";

export default async function unloadShipments(
  shipments: DistributeInputReqBody["route"]
): Promise<DistributeOutputResBody["route"]> {
  const unloadedShipments = [];

  for (const shipment of shipments) {
    const { deliveryPoint, deliveries } = shipment;

    const unloadedDeliveries = [] as (
      | (Package & {
          sack: Sack | null;
        })
      | Sack
    )[];

    for (const delivery of deliveries) {
      const { barcode } = delivery;
      const shipmentType = getShipmentTypeFromBarcode(barcode);

      if (shipmentType === "package") {
        const unloadedPackage = await unloadPackage(barcode, deliveryPoint);
        if (unloadedPackage) {
          await unloadEmptySack(unloadedPackage.sack);
          unloadedDeliveries.push(unloadedPackage);
        }
      } else if (shipmentType === "sack") {
        const unloadedSack = await unloadSackAndItsPackages(
          barcode,
          deliveryPoint
        );
        if (unloadedSack) {
          unloadedDeliveries.push(unloadedSack);
        }
      }
    }

    unloadedShipments.push({
      deliveryPoint,
      deliveries: unloadedDeliveries.map((delivery) => ({
        barcode: delivery.barcode,
        state: getValueFromStatus(delivery.status),
      })),
    });
  }

  return unloadedShipments;
}
