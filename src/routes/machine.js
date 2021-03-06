"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const MachineController = require("../controllers/machine")

router.get("/all", MachineController.list);
router.post("/", MachineController.create);
router.get("/getmachine/:id", MachineController.get);
router.put("/", MachineController.update);
router.delete("/", MachineController.remove);
router.put("/update_price/:id", MachineController.update_machine_price);
router.put("/enable_disable/:id", MachineController.enable_disable_machines_time_slots);
module.exports = router;