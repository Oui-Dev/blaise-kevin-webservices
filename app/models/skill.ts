import { DateTime } from 'luxon';
import type { ManyToMany } from '@adonisjs/lucid/types/relations';
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm';
import User from '#models/user';

export default class Skill extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare slug: string;

    @column()
    declare name: string;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;

    @manyToMany(() => User)
    declare users: ManyToMany<typeof User>;
}
