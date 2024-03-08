import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'projects';
    protected pivotTableName = 'project_user';

    async up() {
        this.schema.createTable(this.tableName, table => {
            table.increments('id');
            table.string('name').notNullable().unique();

            table.timestamp('created_at');
            table.timestamp('updated_at');
        });

        this.schema.createTable(this.pivotTableName, table => {
            table.increments('id');
            table
                .integer('project_id')
                .unsigned()
                .references('id')
                .inTable('projects')
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
