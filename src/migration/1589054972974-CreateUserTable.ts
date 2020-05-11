import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1589054972974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isUnique: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v1()`
                },
                {
                    name: "firstName",
                    type: "varchar",
                },
                {
                    name: "lastName",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "dob",
                    type: "date",
                },
                {
                    name: "phoneNumber",
                    type: "varchar",
                },
                {
                    name: "isBusiness",
                    type: "boolean",
                    isNullable:true,
                    default: false
                },
                {
                    name: "isActive",
                    type: "boolean",
                    isNullable:true,
                    default: false
                },
                {
                    name: "isApproved",
                    type: "boolean",
                    isNullable:true,
                    default: true
                },
                {
                    name: "profilePicture",
                    type: "varchar",
                    isNullable:true
                },
                {
                    name: "authToken",
                    type: "varchar",
                    isNullable:true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default:`now()`
                },
                {
                    name: "createdBy",
                    type: "varchar"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default:`now()`
                },
                {
                    name: "updatedBy",
                    type: "varchar"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("user");
    }

}
