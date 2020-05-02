import {Entity, BaseEntity, BeforeInsert, BeforeUpdate} from "typeorm";

export class BaseClass extends BaseEntity{

    @BeforeInsert()
    @BeforeUpdate()
    validate(){
    }

    save(options?: any): Promise<this>{
        this.validate()
        return super.save(options);
    }

}
