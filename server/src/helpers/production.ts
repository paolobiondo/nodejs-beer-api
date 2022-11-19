import { dataSource } from "../configs/database"
import { Production } from "../models/production"

export async function findBestProduction(items) {
    let bestDays: string[] = []
    for (let i = 0; i < items.length; i++) {
        if (Number(items[i].production_capacity) > 0) {
            if (i < items.length - 1 && Number(items[i].production_capacity) > Number(items[i + 1].production_capacity)) {
                bestDays.push(`${items[i].production_createdDate.getFullYear()}-${items[i].production_createdDate.getMonth()+1}-${items[i].production_createdDate.getDate()}`)
            } else if (i === items.length - 1 && Number(items[i].production_capacity) > Number(items[i - 1].production_capacity)) {
                bestDays.push(`${items[i].production_createdDate.getFullYear()}-${items[i].production_createdDate.getMonth()+1}-${items[i].production_createdDate.getDate()}`)
            }
        }
    }
    return bestDays.join(" and ")
}

export function cleanProduction() {
    return new Promise((resolve, reject) => {
        try {
            dataSource
                .createQueryBuilder()
                .delete()
                .from(Production)
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