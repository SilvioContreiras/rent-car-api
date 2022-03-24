import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1648030152543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({ 
          name: "users",
          columns: [
            {
              name: "id",
              type: "uuid",
            },
            {
              name: "name",
              type: "varchar",
              isPrimary: true
            },
            {
              name: "password",
              type: "varchar",
            },
            {
              name: "email",
              type: "varchar",
            },
            {
              name: "driver_licence",
              type: "varchar",
            },
            {
              name: "admin",
              type: "boolean",
              default: false,
            },
            {
              name: "avatar",
              type: "varchar",
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()"
            }
          ]
         })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users")
    }

}