import {Request, Response} from 'express'
import { dataSource } from "../configs/database"
import { Beer } from "../models/beer"


class BeerController {

    async addBeer(req: Request, res: Response) {
        /*  API add a new beer
            method: POST
            body: name
        */
        let beerName = req.body.name
        if(!beerName) return res.json({ 'error': 'name required' })

        try {
            await dataSource
                .createQueryBuilder()
                .insert()
                .into(Beer)
                .values(
                    { name: beerName },
                )
                .execute()
                .then(() => {
                    return res.status(200).json({ 'message': 'beer added' })
                })
        } catch (error) {
            return res.status(500).json({ 'error': `error while creating: ${error}` })
        }
    }
}

const beerObj = new BeerController()
export = beerObj