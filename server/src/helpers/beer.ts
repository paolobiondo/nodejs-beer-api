import { dataSource } from "../configs/database"
import { Beer } from "../models/beer"

export function cleanBeers() {

        dataSource
            .createQueryBuilder()
            .delete()
            .from(Beer)
            .execute()
            .then(() => {
                console.log("cleaned")
            })

}

