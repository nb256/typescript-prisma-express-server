import express, { Request } from "express";
import loadShipments from "../functions/loadShipments";
import unloadShipments from "../functions/unloadShipments";
import validateDistributeApiInput from "../functions/validateDistributeApiInput";

const router = express.Router();

router.post(
  "/:vehiclePlate/distribute",
  async (
    req: Request<DistributeInputReqParams, {}, DistributeInputReqBody>,
    res
  ) => {
    const { vehiclePlate } = req.params;
    const requestBody = req.body;

    const inputValidation = validateDistributeApiInput(
      vehiclePlate,
      requestBody.route
    );

    if (!inputValidation.status) {
      return res.status(400).json({ message: inputValidation.message });
    }

    const loadedShipments = await loadShipments(requestBody.route);

    const unloadedShipments = await unloadShipments(loadedShipments);

    const responseObject = {
      vehicle: vehiclePlate,
      route: unloadedShipments,
    } as DistributeOutputResBody;

    return res.json(responseObject);
  }
);

export default router;
