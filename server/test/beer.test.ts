import 'dotenv/config'
import express from "express"
import request from "supertest"
import 'mocha'
import * as chai from 'chai'

import server from '../server'
import { dataSource } from "../src/configs/database"

const expect = chai.expect

describe('Create Beers', function () {
    before(async () => {
        if(!dataSource.isInitialized) {
            await dataSource.initialize()
        }
    })

    it('adding bionda...', async () => {
        const res = await request(server)
            .post('/api/v1/beer/add')
            .send({
                'name': 'bionda',
            }).then((done) => {
                expect(done.body.message).to.equal("beer added")
            })
            
    })
    it('adding rossa...', async () => {
        const res = await request(server)
            .post('/api/v1/beer/add')
            .send({
                'name': 'rossa',
            }).then((done) => {
                expect(done.body.message).to.equal("beer added")
            })
    })
    it('adding stout...', async () => {
        const res = await request(server)
            .post('/api/v1/beer/add')
            .send({
                'name': 'stout',
            }).then((done) => {
                expect(done.body.message).to.equal("beer added")
            })
    })
    
})
