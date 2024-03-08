import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Role from '#models/role';

export default class RoleSeeder extends BaseSeeder {
    async run() {
        await Role.createMany([
            {
                name: 'user',
            },
            {
                name: 'admin',
            },
        ]);
    }
}
