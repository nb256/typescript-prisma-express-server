import validateDistributeApiInput from "./validateDistributeApiInput";

describe("validateDistributeApiInput function", () => {
  it("should return false and a message when route is empty", () => {
    const result = validateDistributeApiInput("plate", []);
    expect(result.status).toBe(false);
    expect(result.message).toBe("Route is required");
  });

  it("should return false and a message when vehicle plate is empty", () => {
    const result = validateDistributeApiInput("", [
      {
        deliveryPoint: 1,
        deliveries: [
          {
            barcode: "barcode",
          },
        ],
      },
    ]);
    expect(result.status).toBe(false);
    expect(result.message).toBe("Vehicle plate is required");
  });

  it("should return false and a message when delivery point is empty", () => {
    const result = validateDistributeApiInput("plate", [
      {
        deliveryPoint: 0,
        deliveries: [
          {
            barcode: "barcode",
          },
        ],
      },
    ]);
    expect(result.status).toBe(false);
    expect(result.message).toBe("Delivery point is required");
  });

  it("should return false and a message when deliveries are empty", () => {
    const result = validateDistributeApiInput("plate", [
      {
        deliveryPoint: 3,
        deliveries: [],
      },
    ]);
    expect(result.status).toBe(false);
    expect(result.message).toBe("Deliveries are required");
  });

  it("should return false and a message when delivery barcode is empty", () => {
    const result = validateDistributeApiInput("plate", [
      {
        deliveryPoint: 3,
        deliveries: [
          {
            barcode: "",
          },
        ],
      },
    ]);
    expect(result.status).toBe(false);
    expect(result.message).toBe("Delivery barcode is required");
  });

  it("should return true and a message when all inputs are valid", () => {
    const result = validateDistributeApiInput("plate", [
      {
        deliveryPoint: 3,
        deliveries: [
          {
            barcode: "barcode",
          },
        ],
      },
    ]);
    expect(result.status).toBe(true);
    expect(result.message).toBe("OK");
  });
});
