import { DeliveryPointType, ShipmentStatus } from "@prisma/client";
import isPackageUnloadable from "./isPackageUnloadable";

describe("isPackageUnloadable function", () => {
  const packageDummyProperties = {
    barcode: "P7988000121",
    desi: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    sackBarcode: null,
  };

  describe("Package's delivery point is branch", () => {
    const toBranchDeliveryPointPackageProps = {
      toDeliveryPoint: {
        name: DeliveryPointType["BRANCH"],
        value: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      toDeliveryPointValue: 1,
      ...packageDummyProperties,
    };

    it("should return false if the package is not loaded or loaded_into_sack", () => {
      const shipment = {
        status: ShipmentStatus["CREATED"],
        ...toBranchDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 1;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(false);
    });

    it("should return false if the package's toDeliveryPoint is different", () => {
      const shipment = {
        status: ShipmentStatus["LOADED"],
        ...toBranchDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 2;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(false);
    });

    it("should return true if the package is loaded", () => {
      const shipment = {
        status: ShipmentStatus["LOADED"],
        ...toBranchDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 1;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(true);
    });

    it("should return false if the package is loaded_into_sack", () => {
      const shipment = {
        status: ShipmentStatus["LOADED_INTO_SACK"],
        ...toBranchDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 1;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(false);
    });
  });

  describe("Package's delivery point is distribution center", () => {
    const toDistributionCenterDeliveryPointPackageProps = {
      toDeliveryPoint: {
        name: DeliveryPointType["DISTRIBUTION_CENTRE"],
        value: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      toDeliveryPointValue: 2,
      ...packageDummyProperties,
    };

    it("should return false if the package is not loaded or loaded_into_sack", () => {
      const shipment = {
        status: ShipmentStatus["CREATED"],
        ...toDistributionCenterDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 2;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(false);
    });

    it("should return false if the package's toDeliveryPoint is different", () => {
      const shipment = {
        status: ShipmentStatus["LOADED"],
        ...toDistributionCenterDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 3;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(false);
    });

    it("should return true if the package is loaded", () => {
      const shipment = {
        status: ShipmentStatus["LOADED"],
        ...toDistributionCenterDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 2;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(true);
    });

    it("should return true if the package is loaded_into_sack", () => {
      const shipment = {
        status: ShipmentStatus["LOADED_INTO_SACK"],
        ...toDistributionCenterDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 2;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(true);
    });
  });

  describe("Package's delivery point is transfer center", () => {
    const toTransferCenterDeliveryPointPackageProps = {
      toDeliveryPoint: {
        name: DeliveryPointType["TRANSFER_CENTRE"],
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      toDeliveryPointValue: 3,
      ...packageDummyProperties,
    };

    it("should return false if the package is not loaded_into_sack", () => {
      const shipment = {
        status: ShipmentStatus["LOADED"],
        ...toTransferCenterDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 3;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(false);
    });

    it("should return false if the package's toDeliveryPoint is different", () => {
      const shipment = {
        status: ShipmentStatus["LOADED_INTO_SACK"],
        ...toTransferCenterDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 2;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(false);
    });

    it("should return true if the package is loaded_into_sack", () => {
      const shipment = {
        status: ShipmentStatus["LOADED_INTO_SACK"],
        ...toTransferCenterDeliveryPointPackageProps,
      };
      const toDeliveryPointValue = 3;
      expect(isPackageUnloadable(shipment, toDeliveryPointValue)).toBe(true);
    });
  });
});
