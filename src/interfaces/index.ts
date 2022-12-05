interface DistributeInputReqBody {
  route: {
    deliveryPoint: number;
    deliveries: {
      barcode: string;
    }[];
  }[];
}

interface DistributeInputReqParams {
  vehiclePlate: string;
}

interface DistributeOutputResBody {
  vehicle: string;
  route: {
    deliveryPoint: number;
    deliveries: {
      barcode: string;
      state: number;
    }[];
  }[];
}
