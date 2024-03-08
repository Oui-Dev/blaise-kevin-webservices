import { DateTime } from 'luxon';
import { withAuthFinder } from '@adonisjs/auth';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { AccessToken } from '@adonisjs/auth/access_tokens';
import type { ManyToMany, BelongsTo } from '@adonisjs/lucid/types/relations';
import { BaseModel, column, manyToMany, belongsTo } from '@adonisjs/lucid/orm';
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import Project from '#models/project';
import Skill from '#models/skill';
import Role from '#models/role';

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
    declare roleId: number;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null;

    @manyToMany(() => Project)
    declare projects: ManyToMany<typeof Project>;

    @manyToMany(() => Skill)
    declare skills: ManyToMany<typeof Skill>;

    @belongsTo(() => Role)
    declare role: BelongsTo<typeof Role>;

    currentAccessToken?: AccessToken;

    static accessTokens = DbAccessTokensProvider.forModel(User, {
        expiresIn: '30 days',
        prefix: 'oat_',
        table: 'auth_access_tokens',
        type: 'auth_token',
        tokenSecretLength: 40,
    });
}
