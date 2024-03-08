import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'skills';
    protected pivotTableName = 'skill_user';

    async up() {
        this.schema.createTable(this.tableName, table => {
            table.increments('id');
            table.string('slug').notNullable().unique();
            table.string('name').notNullable();

            table.timestamp('created_at');
            table.timestamp('updated_at');
        });

        this.schema.createTable(this.pivotTableName, table => {
            table.increments('id');
            table
                .integer('skill_id')
                .unsigned()
                .references('id')
                .inTable('skills')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        });
    }

    async down() {
        this.schema.dropTable(this.pivotTableName);
        this.schema.dropTable(this.tableName);
    }
}
