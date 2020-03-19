import {Entity, BaseEntity} from "typeorm";

export class BaseClass extends BaseEntity{

    validate(){
    }

    save(options?: any): Promise<this>{
        this.validate()
        return super.save(options);
    }

}
