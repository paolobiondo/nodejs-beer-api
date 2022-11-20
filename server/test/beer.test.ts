import 'dotenv/config'
import express from "express"
import request from "supertest"
import 'mocha'
import * as chai from 'chai'

import { cleanBeers } from "../src/helpers/beer"
import { cleanProduction } from "../src/helpers/production"
import { router as beerRouter } from "../src/routes/beer"
import { router as productionRouter } from "../src/routes/production"
import { dataSource } from "../src/configs/database"

const port = process.env.PORT
const expect = chai.expect
let server

async function connection() {
    const app = express()

    // middlewares
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // routes
    app.use("/api/v1/beer", beerRouter)
    app.use("/api/v1/production", productionRouter)

    return app
}

describe('Create Beers', function () {
    before(async () => {
        let db = await dataSource.initialize()
        server = await connection()
    })

    it('adding bionda...', async () => {
        const res = await request(server)
            .post('/api/v1/beer/add')
            .send({
                'name': 'bionda',
            })
        if (res) expect(res.body.message).to.equal("beer added")
    })
    it('adding rossa...', async () => {
        const res = await request(server)
            .post('/api/v1/beer/add')
            .send({
                'name': 'rossa',
            })
        if (res) expect(res.body.message).to.equal("beer added")
    })
    it('adding stout...', async () => {
        const res = await request(server)
            .post('/api/v1/beer/add')
            .send({
                'name': 'stout',
            })
        if (res) expect(res.body.message).to.equal("beer added")
    })
    
})
