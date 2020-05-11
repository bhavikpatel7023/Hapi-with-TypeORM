import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAddressTable1589055878075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "address",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v1()`
                },
                {
                    name: "street",
                    type: "varchar",
                },
                {
                    name: "unitNumber",
                    type: "varchar",
                },
                {
                    name: "city",
                    type: "varchar",
                },
                {
                    name: "province",
                    type: "varchar",
                },
                {
                    name: "country",
                    type: "varchar",
                },
                {
                    name: "postalCode",
                    type: "varchar",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default:`now()`
                },
                {
                    name: "createdBy",
                    type: "varchar",
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
        await queryRunner.dropTable("address");
    }

}
