import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'roles';

    async up() {
        this.schema.createTable(this.tableName, table => {
            table.increments('id');
            table.string('name', 80).notNullable().unique();

            table.timestamp('created_at');
            table.timestamp('updated_at');
        });

        this.schema.table('users', table => {
            table.dropColumn('is_admin');
            table
                .integer('role_id')
                .unsigned()
                .references('id')
                .inTable('roles')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        });
    }

    async down() {
        this.schema.table('users', table => {
            table.dropForeign(['role_id']);
            table.dropColumn('role_id');
            table.boolean('is_admin').defaultTo(false);
        });

        this.schema.dropTable(this.tableName);
    }
}
