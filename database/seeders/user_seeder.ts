import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';

export default class UserSeeder extends BaseSeeder {
    async run() {
        await User.createMany([
            {
                firstName: 'Kevin',
                lastName: 'Blaise',
                email: 'kevin@astronaut-agency.com',
                password: 'Pass1234',
                isAdmin: true,
            },
        ]);
    }
}
