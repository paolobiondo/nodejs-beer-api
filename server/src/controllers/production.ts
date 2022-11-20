import { Request, Response } from 'express';
import { dataSource } from "../configs/database"
import { Production } from "../models/production"
import { Beer } from "../models/beer"

import { Between } from "typeorm"

import { findBestProduction } from "../helpers/production"


class ProductionController {
    async addProduction(req: Request, res: Response) {
        /*  API: add a production day
            method: POST
            body: name, liters, day
        */
        const beerName: string = req.body.name
        const capacity: number = Number(req.body.liters)
        const createdDate: string = req.body.day

        if (!beerName || !capacity === undefined || !createdDate) return res.json({ 'error': 'add all required fields' })

        try {
            // get beer from db
            const beer = await dataSource
                .getRepository(Beer)
                .createQueryBuilder("beer")
                .where("name = :name", { name: beerName })
                .getOne()
            if (beer) {
                // add data
                const productionObj = new Production()
                productionObj.beer = beer
                productionObj.capacity = capacity
                productionObj.createdDate = new Date(createdDate)
                await dataSource.manager.save(productionObj)
                    .then(() => {
                        return res.json({ 'message': 'production added' })
                    })
                    .catch((error) => {
                        return res.json({ 'error': `error while adding production ${error}` })
                    })

            } else return res.json({ 'error': `beer not found` })
        } catch (error) {
            return res.json({ 'error': `error while creating: ${error}` })
        }
    }


    async productionResults(req: Request, res: Response) {
        /*  API: get capacity results by tipe and range of dates
            method: GET
            query: type, startDay and endDay
        */
        const productionRepo = dataSource.getRepository(Production)
        const type = req.query.type // mandatory
        let startDay = req.query.startDay
        let endDay

        if (startDay !== undefined) {
            endDay = req.query.endDay === undefined ? startDay : req.query.endDay

            endDay = endDay + "T23:59:59"
            startDay = startDay + "T00:00:00"
        }

        if (!type) return res.json({ 'error': 'add type field' })

        try {
            let queryWhere: string = ""

            // if type is not all, get the one from db
            if (type !== "all") {
                const beer = await dataSource
                    .getRepository(Beer)
                    .createQueryBuilder("beer")
                    .where("name = :name", { name: type })
                    .getOne()
                queryWhere = `production.beer = ${beer.id}`
            }

            // where query with start and end dates
            if (startDay !== undefined) {
                if (type === "all") queryWhere = `production.createdDate BETWEEN '${startDay.toString()}' AND '${endDay.toString()}'`
                else {
                    const beer = await dataSource
                        .getRepository(Beer)
                        .createQueryBuilder("beer")
                        .where("name = :name", { name: type })
                        .getOne()
                    queryWhere += ` AND production.createdDate BETWEEN '${startDay.toString()}' AND '${endDay.toString()}'`
                }
            }

            // get result
            const itemCount = await productionRepo.createQueryBuilder("production")
                .where(queryWhere)
                .select('SUM(production.capacity)', 'totalCapacity')
                .getRawOne()
            const totalCapacity = itemCount.totalCapacity == null ? 0 : itemCount.totalCapacity
            return res.json({ 'message': `${totalCapacity}` })
        } catch (error) {
            return res.json({ 'error': `error while creating: ${error}` })
        }
    }

    async bestPoductiontResults(req: Request, res: Response) {
        /*  API: add a production day
            method: GET
            query: type, startDay and endDay
        */
        const productionRepo = dataSource.getRepository(Production)
        const type = req.query.type // mandatory
        let startDay = req.query.startDay
        let endDay


        if (startDay !== undefined) {
            endDay = req.query.endDay === undefined ? startDay : req.query.endDay

            endDay = endDay + "T23:59:59"
            startDay = startDay + "T00:00:00"
        }

        if (!type) return res.json({ 'error': 'add type field' })

        try {
            let queryWhere: string = ""

            // if type is not all, get the one from db
            if (type !== "all") {
                const beer = await dataSource
                    .getRepository(Beer)
                    .createQueryBuilder("beer")
                    .where("name = :name", { name: type })
                    .getOne()
                if(beer) 
                    queryWhere = `production.beer = ${beer.id}`
            }

            // where query with start and end dates
            if (startDay !== undefined) {
                if (type === "all") queryWhere = `production.createdDate BETWEEN '${startDay.toString()}' AND '${endDay.toString()}'`
                else {
                    const beer = await dataSource
                        .getRepository(Beer)
                        .createQueryBuilder("beer")
                        .where("name = :name", { name: type })
                        .getOne()
                    if(beer)
                        queryWhere += ` AND production.createdDate BETWEEN '${startDay.toString()}' AND '${endDay.toString()}'`
                }
            }
            if (type !== "all") {
                // get items
                const items = await productionRepo.createQueryBuilder("production")
                    .where(queryWhere)
                    .getRawMany()

                findBestProduction(items)
                    .then((result) => {
                        return res.json({ 'message': `${result}` })
                    })

            } else {
                // get all items
                const items = await productionRepo.createQueryBuilder("production")
                    .where(queryWhere)
                    .groupBy("production.createdDate")
                    .select('SUM(production.capacity)', 'production_capacity')
                    .addSelect("production.createdDate")
                    .getRawMany()

                findBestProduction(items)
                    .then((result) => {
                        return res.json({ 'message': `${result}` })
                    })
            }
        } catch (error) {
            return res.json({ 'error': `error while creating: ${error}` })
        }
    }
}

const productionObj = new ProductionController()
module.exports = productionObj