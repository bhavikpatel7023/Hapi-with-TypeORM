import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity({
    name:"address"
})
export class Address {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: 'street'
    })
    street: string;

    @Column({
        name: 'unitNumber'
    })
    unitNumber: string;

    @Column({
        name: 'city'
    })
    city: string;

    @Column({
        name: 'province'
    })
    province: string;

    @Column({
        name: 'country'
    })
    country: string;

    @Column({
        name: 'postalCode'
    })
    postalCode: string;

    @Column({
        name: 'createdAt'
    })
    createdAt: Date;

    @Column({
        name: 'createdBy'
    })
    createdBy: string;

    @Column({
        name: 'updatedAt'
    })
    updatedAt: Date;

    @Column({
        name: 'updatedBy'
    })
    updatedBy: string;

}


