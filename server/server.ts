import 'dotenv/config'
import express from "express"
import { dataSource } from "./src/configs/database"
import { router as beerRouter } from "./src/routes/beer"
import { router as productionRouter } from "./src/routes/production"
import { cleanBeers } from "./src/helpers/beer"
import { cleanProduction } from "./src/helpers/production"

const port = process.env.PORT

dataSource
    .initialize()
    .then(() => {
        console.log("connected to db!")
        // remove all records from db every time run
        cleanProduction()
        cleanBeers()

        // run server
        server.listen(port, () => {
            console.log("running")
        })

    })
    .catch((error) => {
        console.log(`error connecting to db! ${error}`)
    })

const server = express()

// middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// routes
server.use("/api/v1/beer", beerRouter)
server.use("/api/v1/production", productionRouter)

export = server