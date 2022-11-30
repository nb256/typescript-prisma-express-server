import { DeliveryPointType, ShipmentStatus } from "@prisma/client";
import isSackUnloadable from "./isSackUnloadable";

describe("isSackUnloadable function", () => {
  const sackDummyProperties = {
    barcode: "C725800",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe("Sack's delivery point is branch", () => {
    const toBranchDeliverySackProps = {
      toDeliveryPoint: {
        name: DeliveryPointType["BRANCH"],
        value: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      toDeliveryPointValue: 1,
      ...sackDummyProperties,
    };

    it("should return false", () => {
      const sack = {
        status: ShipmentStatus["LOADED"],
        ...toBranchDeliverySackProps,
      };
      const toDeliveryPointValue = 1;
      expect(isSackUnloadable(sack, toDeliveryPointValue)).toBe(false);
    });
  });

  describe("Sack's delivery point is distribution centre", () => {
    const toDistributionCentreDeliverySackProps = {
      toDeliveryPoint: {
        name: DeliveryPointType["DISTRIBUTION_CENTRE"],
        value: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      toDeliveryPointValue: 2,
      ...sackDummyProperties,
    };

    it("should return false if the sack is not loaded", () => {
      const sack = {
        status: ShipmentStatus["CREATED"],
        ...toDistributionCentreDeliverySackProps,
      };
      const toDeliveryPointValue = 2;
      expect(isSackUnloadable(sack, toDeliveryPointValue)).toBe(false);
    });

    it("should return false if the sack's toDeliveryPoint is different", () => {
      const sack = {
        status: ShipmentStatus["LOADED"],
        ...toDistributionCentreDeliverySackProps,
      };
      const toDeliveryPointValue = 3;
      expect(isSackUnloadable(sack, toDeliveryPointValue)).toBe(false);
    });

    it("should return true if the sack's toDeliveryPoint is correct", () => {
      const sack = {
        status: ShipmentStatus["LOADED"],
        ...toDistributionCentreDeliverySackProps,
      };
      const toDeliveryPointValue = 2;
      expect(isSackUnloadable(sack, toDeliveryPointValue)).toBe(true);
    });
  });

  describe("Sack's delivery point is transfer centre", () => {
    const toTransferCentreDeliverySackProps = {
      toDeliveryPoint: {
        name: DeliveryPointType["TRANSFER_CENTRE"],
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      toDeliveryPointValue: 3,
      ...sackDummyProperties,
    };

    it("should return false if the sack is not loaded", () => {
      const sack = {
        status: ShipmentStatus["CREATED"],
        ...toTransferCentreDeliverySackProps,
      };
      const toDeliveryPointValue = 3;
      expect(isSackUnloadable(sack, toDeliveryPointValue)).toBe(false);
    });

    it("should return false if the sack's toDeliveryPoint is different", () => {
      const sack = {
        status: ShipmentStatus["LOADED"],
        ...toTransferCentreDeliverySackProps,
      };
      const toDeliveryPointValue = 2;
      expect(isSackUnloadable(sack, toDeliveryPointValue)).toBe(false);
    });

    it("should return true if the sack's toDeliveryPoint is correct", () => {
      const sack = {
        status: ShipmentStatus["LOADED"],
        ...toTransferCentreDeliverySackProps,
      };
      const toDeliveryPointValue = 3;
      expect(isSackUnloadable(sack, toDeliveryPointValue)).toBe(true);
    });
  });
});
