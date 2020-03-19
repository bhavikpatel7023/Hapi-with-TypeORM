import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { BaseClass } from "../common/BaseClass";

@Entity()
export class User extends BaseClass{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    validate(){
        console.log('User validate called');
        
    }

}
