import 'dotenv/config'
import express from "express"
import { dataSource } from "./src/configs/database"


const port = process.env.PORT

dataSource
    .initialize()
    .then(() => {
        console.log("connected to db!")

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
