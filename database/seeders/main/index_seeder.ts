import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class IndexSeeder extends BaseSeeder {
    private async seed(Seeder: { default: typeof BaseSeeder }) {
        await new Seeder.default(this.client).run();
    }

    async run() {
        await this.seed(await import('#database/seeders/role_seeder'));
        await this.seed(await import('#database/seeders/skill_seeder'));
        await this.seed(await import('#database/seeders/user_seeder'));
    }
}
