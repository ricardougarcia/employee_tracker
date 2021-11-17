const router = require("express").Router();
const departments = require("./departmentsRoutes");

router.use("/departments", departments);

module.exports = router;
