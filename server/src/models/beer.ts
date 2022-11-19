import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Production } from "./production"


@Entity()
export class Beer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Production, (prod) => prod.beer)
    production: Production[]
}
