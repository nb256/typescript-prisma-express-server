import request from "supertest";
import { app } from "../src";
import { main as seed, removeSeeds } from "../src/prisma/seed";

const apiURL = (vehiclePlate: string) =>
  `/v1/vehicles/${vehiclePlate}/distribute`;

describe("POST /api/distribute", () => {
  beforeAll(async () => {
    await seed().catch(() => {});
  });

  afterAll(async () => {
    await removeSeeds();
    await seed();
  });

  it("should return 404 if vehicle plate is not provided", async () => {
    const response = await request(app)
      .post(apiURL(""))
      .send({
        route: [
          {
            deliveryPoint: 1,
            deliveries: [
              {
                barcode: "P8988000125",
              },
            ],
          },
        ],
      });
    expect(response.status).toBe(404);
  });
  it("should return 400 if route is not provided", async () => {
    const response = await request(app).post(apiURL("ABC123")).send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Route is required");
  });
  it("should return 400 if delivery point is not provided", async () => {
    const response = await request(app)
      .post(apiURL("ABC123"))
      .send({
        route: [
          {
            deliveryPoint: null,
            deliveries: [
              {
                barcode: "P8988000125",
              },
            ],
          },
        ],
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Delivery point is required");
  });
  it("should return 400 if deliveries are not provided", async () => {
    const response = await request(app)
      .post(apiURL("ABC123"))
      .send({
        route: [
          {
            deliveryPoint: 1,
            deliveries: [],
          },
        ],
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Deliveries are required");
  });
  it("should return 400 if delivery barcode is not provided", async () => {
    const response = await request(app)
      .post(apiURL("ABC123"))
      .send({
        route: [
          {
            deliveryPoint: 1,
            deliveries: [
              {
                barcode: null,
              },
            ],
          },
        ],
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Delivery barcode is required");
  });

  it("should return 200 if request is valid", async () => {
    const response = await request(app)
      .post(apiURL("34TL34"))
      .send({
        route: [
          {
            deliveryPoint: 1,
            deliveries: [
              { barcode: "P7988000121" },
              { barcode: "P7988000122" },
              { barcode: "P7988000123" },
              { barcode: "P8988000121" },
              { barcode: "C725799" },
            ],
          },
          {
            deliveryPoint: 2,
            deliveries: [
              { barcode: "P8988000123" },
              { barcode: "P8988000124" },
              { barcode: "P8988000125" },
              { barcode: "C725799" },
            ],
          },
          {
            deliveryPoint: 3,
            deliveries: [
              { barcode: "P9988000126" },
              { barcode: "P9988000127" },
              { barcode: "P9988000128" },
              { barcode: "P9988000129" },
              { barcode: "P9988000130" },
            ],
          },
        ],
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      vehicle: "34TL34",
      route: [
        {
          deliveryPoint: 1,
          deliveries: [
            { barcode: "P7988000121", state: 4 },
            { barcode: "P7988000122", state: 4 },
            { barcode: "P7988000123", state: 4 },
            { barcode: "P8988000121", state: 3 },
            { barcode: "C725799", state: 3 },
          ],
        },
        {
          deliveryPoint: 2,
          deliveries: [
            { barcode: "P8988000123", state: 4 },
            { barcode: "P8988000124", state: 4 },
            { barcode: "P8988000125", state: 4 },
            { barcode: "C725799", state: 4 },
          ],
        },
        {
          deliveryPoint: 3,
          deliveries: [
            { barcode: "P9988000126", state: 3 },
            { barcode: "P9988000127", state: 3 },
            { barcode: "P9988000128", state: 4 },
            { barcode: "P9988000129", state: 4 },
            { barcode: "P9988000130", state: 3 },
          ],
        },
      ],
    });
  });
});
