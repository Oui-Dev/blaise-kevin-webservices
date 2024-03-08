import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Skill from '#models/skill';

export default class SkillSeeder extends BaseSeeder {
    async run() {
        await Skill.createMany([
            {
                slug: 'angular',
                name: 'Angular',
            },
            {
                slug: 'vuejs',
                name: 'VueJS',
            },
            {
                slug: 'react',
                name: 'React',
            },
            {
                slug: 'svelte',
                name: 'Svelte',
            },
            {
                slug: 'solidjs',
                name: 'SolidJS',
            },
            {
                slug: 'nodejs',
                name: 'NodeJS',
            },
            {
                slug: 'express',
                name: 'Express',
            },
            {
                slug: 'nestjs',
                name: 'NestJS',
            },
            {
                slug: 'adonisjs',
                name: 'AdonisJS',
            },
            {
                slug: 'laravel',
                name: 'Laravel',
            },
            {
                slug: 'symfony',
                name: 'Symfony',
            },
            {
                slug: 'django',
                name: 'Django',
            },
            // ...
        ]);
    }
}
