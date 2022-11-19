import express from "express"
const productionController = require("../controllers/production")

const router = express.Router()

router.post("/add", productionController.addProduction)
router.get("/results", productionController.productionResults)
router.get("/best-days", productionController.bestPoductiontResults)


export { router }