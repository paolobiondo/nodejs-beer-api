import server from '../server'
import * as chai from 'chai'
import request from "supertest"
import { cleanBeers } from "../src/helpers/beer"
import { cleanProduction } from "../src/helpers/production"
import 'mocha'

const expect = chai.expect

describe('Create Beers', function ()  {
    it('adding bionda...', async () => {
        const res = await request(server)
            .post('/api/v1/beer/add')
            .send({
                'name': 'bionda',
            })
        if(res) expect(res.body.message).to.equal("beer added")
    })
    it('adding rossa...',async () =>  {
        const res =  await request(server)
            .post('/api/v1/beer/add')
            .send({
                'name': 'rossa',
            })
        if(res) expect(res.body.message).to.equal("beer added")
    })
    it('adding stout...', async () => {
        const res = await request(server)
            .post('/api/v1/beer/add')
            .send({
                'name': 'stout',
            })
        if(res) expect(res.body.message).to.equal("beer added")
    })
})