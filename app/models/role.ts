import { DateTime } from 'luxon';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import User from '#models/user';

export default class Role extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare name: string;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;

    @hasMany(() => User)
    declare users: HasMany<typeof User>;
}
