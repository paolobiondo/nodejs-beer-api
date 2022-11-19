import { dataSource } from "../configs/database"
import { Beer } from "../models/beer"

export function cleanBeers() {
    return new Promise((resolve, reject) => {
        try {
            dataSource
                .createQueryBuilder()
                .delete()
                .from(Beer)
                .execute()
                .then(() => {
                    console.log("cleaned")
                    resolve("cleaned")
                })
        } catch (error) {
            console.log(`error while deleting: ${error}`)
            reject("error")
        }
    })
}

