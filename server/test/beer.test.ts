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

describe('Add Production', function () {
    before(async () => {
        if(!dataSource.isInitialized) {
            await dataSource.initialize()
        }
    })
    
    const arr = [{
        'name': 'bionda',
        'liters': 2,
        'day': "2022-11-18"
    },{
        'name': 'bionda',
        'liters': 3,
        'day': "2022-11-19"
    },{
        'name': 'bionda',
        'liters': 0,
        'day': "2022-11-20"
    },{
        'name': 'bionda',
        'liters': 5,
        'day': "2022-11-21"
    },{
        'name': 'bionda',
        'liters': 2,
        'day': "2022-11-22"
    },{
        'name': 'rossa',
        'liters': 3,
        'day': "2022-11-18"
    },{
        'name': 'rossa',
        'liters': 3,
        'day': "2022-11-19"
    },{
        'name': 'rossa',
        'liters': 4,
        'day': "2022-11-20"
    },{
        'name': 'rossa',
        'liters': 0,
        'day': "2022-11-21"
    },{
        'name': 'rossa',
        'liters': 2,
        'day': "2022-11-22"
    },{
        'name': 'stout',
        'liters': 0,
        'day': "2022-11-18"
    },{
        'name': 'stout',
        'liters': 0,
        'day': "2022-11-19"
    },{
        'name': 'stout',
        'liters': 4,
        'day': "2022-11-20"
    },{
        'name': 'stout',
        'liters': 1,
        'day': "2022-11-21"
    },{
        'name': 'stout',
        'liters': 6,
        'day': "2022-11-22"
    },]
    for(let i=0; i < arr.length; i++) {
        it(`adding ${arr[i].name} - day: ${arr[i].day}`, async () => {
            const res = await request(server)
                .post('/api/v1/production/add')
                .send(arr[i])
            if(res) {
                console.log(res.body)
                expect(res.body.message).to.equal("production added")
            }
        })
    }
})

describe('Check Result Production', function () {
    before(async () => {
        if(!dataSource.isInitialized) {
            await dataSource.initialize()
        }
    })
    let arr = [{'type':'all','startDay':'2022-11-18','endDay':'2022-11-22','result':"35"}, {'type':'rossa','startDay':'2022-11-18','endDay':'2022-11-22','result':"12"},
    {'type':'bionda','startDay':'2022-11-18','endDay':'2022-11-20','result':"5"}, {'type':'stout','startDay':'2022-11-20','endDay':'2022-11-22','result':"11"}]
    for(let i=0; i < arr.length; i++) {
        it(`Get result: type=${arr[i].type}, startDay=${arr[i].startDay}, endDay=${arr[i].endDay}, result=${arr[i].result}L`, async () => {
            const res = await request(server)
            .get(`/api/v1/production/results?type=${arr[i].type}&startDay=${arr[i].startDay}&endDay=${arr[i].endDay}`)
            if(res) expect(res.body.message).to.equal(arr[i].result)
        })
    }
    let arrNoEndDate = [{'type':'all','startDay':'2022-11-18','result':"5"}]
    for(let i=0; i < arrNoEndDate.length; i++) {
        it(`Get result: type=${arrNoEndDate[i].type}, startDay=${arrNoEndDate[i].startDay} (single day), result=${arrNoEndDate[i].result}L`, async () => {
            const res = await request(server)
            .get(`/api/v1/production/results?type=${arrNoEndDate[i].type}&startDay=${arrNoEndDate[i].startDay}`)
            if(res) expect(res.body.message).to.equal(arrNoEndDate[i].result)
        })
    }   
})

describe('Get best day', function () {
    before(async () => {
        if(!dataSource.isInitialized) {
            await dataSource.initialize()
        }
    })
    let arr = [{'type':'all','startDay':'2022-11-18','endDay':'2022-11-20','result':"2022-11-20"}, {'type':'all','startDay':'2022-11-18','endDay':'2022-11-22','result':"2022-11-20 and 2022-11-22"},
    {'type':'bionda','startDay':'2022-11-18','endDay':'2022-11-20','result':"2022-11-19"}, {'type':'bionda','startDay':'2022-11-18','endDay':'2022-11-22','result':"2022-11-19 and 2022-11-21"}]
    for(let i=0; i < arr.length; i++) {
        it(`Get result: type=${arr[i].type}, startDay=${arr[i].startDay}, endDay=${arr[i].endDay}, result=${arr[i].result}`, async () => {
            const res = await request(server)
            .get(`/api/v1/production/best-days?type=${arr[i].type}&startDay=${arr[i].startDay}&endDay=${arr[i].endDay}`)
            if(res) expect(res.body.message).to.equal(arr[i].result)
        })
    } 
})
