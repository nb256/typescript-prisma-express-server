export default function validateDistributeApiInput(
  vehiclePlate: string,
  route: DistributeInputReqBody["route"]
): { status: boolean; message: string } {
  if (!route || route.length === 0) {
    return { status: false, message: "Route is required" };
  }

  if (!vehiclePlate) {
    return { status: false, message: "Vehicle plate is required" };
  }

  for (const routeItem of route) {
    if (!routeItem.deliveryPoint) {
      return { status: false, message: "Delivery point is required" };
    }

    if (typeof routeItem.deliveryPoint !== "number") {
      return { status: false, message: "Delivery point must be a number" };
    }

    if (!routeItem.deliveries || routeItem.deliveries.length === 0) {
      return { status: false, message: "Deliveries are required" };
    }

    for (const delivery of routeItem.deliveries) {
      if (!delivery.barcode) {
        return { status: false, message: "Delivery barcode is required" };
      }

      if (typeof delivery.barcode !== "string") {
        return { status: false, message: "Delivery barcode must be a string" };
      }
    }
  }

  return { status: true, message: "OK" };
}
