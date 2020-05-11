import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity({
    name:"user"
})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        name: 'firstName'
    })
    firstName: string;

    @Column({
        name: 'lastName'
    })
    lastName: string;

    @Column({
        name: 'email'
    })
    email: string;

    @Column({
        name: 'password'
    })
    password: string;

    @Column({
        name: 'dob'
    })
    dob: Date;

    @Column({
        name: 'phoneNumber'
    })
    phoneNumber: string;

    @Column({
        name: 'isBusiness',
        default: false
    })
    isBusiness: boolean;

    @Column({
        name: 'isActive',
        default: true
    })
    isActive: boolean;

    @Column({
        name: 'isApproved',
        default: false
    })
    isApproved: boolean;

    @Column({
        name: 'profilePicture'
    })
    profilePicture: string;

    @Column({
        name: 'authToken'
    })
    authToken?: string;

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

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}


