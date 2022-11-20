import { dataSource } from "../configs/database"
import { Beer } from "../models/beer"

export async function cleanBeers() {
    try {
        dataSource
            .createQueryBuilder()
            .delete()
            .from(Beer)
            .execute()
            .then(() => {
                console.log("cleaned")
            })
    } catch (error) {
        console.log(`error while deleting: ${error}`)
    }
}

