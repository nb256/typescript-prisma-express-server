import { Package, Sack } from "@prisma/client";

import loadPackage from "../database/loadPackage";
import loadSackAndItsPackages from "../database/loadSackAndItsPackages";
import getShipmentTypeFromBarcode from "./getShipmentTypeFromBarcode";
import getValueFromStatus from "./getValueFromStatus";

export default async function loadShipments(
  shipments: DistributeInputReqBody["route"]
): Promise<DistributeOutputResBody["route"]> {
  const loadedShipments = [];

  for (const shipment of shipments) {
    const { deliveryPoint, deliveries } = shipment;

    const loadDeliveryPromises = [] as Promise<Sack | Package | false>[];

    deliveries.forEach((delivery) => {
      const { barcode } = delivery;
      const shipmentType = getShipmentTypeFromBarcode(barcode);

      if (shipmentType === "package") {
        loadDeliveryPromises.push(loadPackage(barcode));
      } else if (shipmentType === "sack") {
        loadDeliveryPromises.push(loadSackAndItsPackages(barcode));
      }
    });

    const loadDeliveryPromisesResult = await Promise.all(loadDeliveryPromises);

    loadedShipments.push({
      deliveryPoint,
      deliveries: loadDeliveryPromisesResult
        .filter((result): result is Sack | Package => !!result)
        .map((delivery) => ({
          barcode: delivery.barcode,
          state: getValueFromStatus(delivery.status),
        })),
    });
  }

  return loadedShipments;
}
