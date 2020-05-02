import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Timestamp} from "typeorm";
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
    
    @CreateDateColumn({
        name: 'created_at'
    })
    createAt: Timestamp;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Timestamp;


    validate(){
        console.log("called");
        
    }
}
