import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseClass } from "../common/BaseClass";
import { Post } from "./Post";

@Entity()
export class User extends BaseClass {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'first_name'
    })
    firstName: string;

    @Column({
        name: 'last_name'
    })
    lastName: string;

    @Column({
        name: 'age'
    })
    age: number;

    @OneToMany(type => Post, photo => photo.user)
    posts: Post[];

}
