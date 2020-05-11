import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from "typeorm";
import {Address} from "../route/Address/address.entity";
import SessionManager from "../common/sessionManager";

@EventSubscriber()
export class ValidationSubscriber implements EntitySubscriberInterface {

    beforeInsert(event: InsertEvent<Address>) {
        event.entity.createdAt = new Date()
        event.entity.createdBy = SessionManager.getSession()
        event.entity.updatedAt = new Date()
        event.entity.updatedBy = SessionManager.getSession()
        console.log(`BEFORE POST INSERTED: `, event.entity);
    }

    beforeUpdate(event: InsertEvent<Address>) {
        event.entity.updatedAt = new Date()
        event.entity.updatedBy = SessionManager.getSession()
        console.log(`BEFORE POST INSERTED: `, event.entity);
    }

}
