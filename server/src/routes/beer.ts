import express from "express"
const beerController = require("../controllers/beer")

const router = express.Router()

router.post("/add", beerController.addBeer)

export { router }