import { DateTime } from 'luxon';
import { withAuthFinder } from '@adonisjs/auth';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import type { ManyToMany } from '@adonisjs/lucid/types/relations';
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm';
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import Project from '#models/project';
import Skill from '#models/skill';

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare firstName: string;

    @column()
    declare lastName: string;

    @column()
    declare email: string;

    @column()
    declare password: string;

    @column()
    declare isAdmin: boolean;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null;

    static accessTokens = DbAccessTokensProvider.forModel(User);

    @manyToMany(() => Project)
    declare projects: ManyToMany<typeof Project>;

    @manyToMany(() => Skill)
    declare skills: ManyToMany<typeof Skill>;
}
