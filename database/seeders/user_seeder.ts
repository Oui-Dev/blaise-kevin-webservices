import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';
import Role from '#models/role';

export default class UserSeeder extends BaseSeeder {
    async run() {
        const firstUser = await User.create({
            firstName: 'Kevin',
            lastName: 'Blaise',
            email: 'kevin@astronaut-agency.com',
            password: 'Pass1234',
        });

        const adminRole = await Role.findByOrFail('name', 'admin');
        await firstUser.related('role').associate(adminRole);
    }
}
