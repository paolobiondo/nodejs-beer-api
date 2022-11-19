import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Beer } from "./beer"

@Entity()
export class Production {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Beer, (beer) => beer.production)
    beer: Beer

    @Column()
    capacity: number

    @Column()
    createdDate: Date
}