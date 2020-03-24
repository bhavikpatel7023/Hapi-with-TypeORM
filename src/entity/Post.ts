import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { BaseClass } from "../common/BaseClass";
import { User } from "./User";

@Entity()
export class Post extends BaseClass{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({
        name: 'content'
    })
    content: string;

}
