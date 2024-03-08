import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

export default class UserHasRoleMiddleware {
    async handle(
        ctx: HttpContext,
        next: NextFn,
        options: {
            roles: string[];
        } = { roles: [] }
    ) {
        const user = ctx.auth.user;

        if (!user) {
            return ctx.response.unauthorized({ error: 'You must be logged in to access this resource' });
        }

        await user.load('role');

        if (options.roles.includes(user.role.name)) {
            return next();
        }

        return ctx.response.forbidden({ error: 'You are not authorized to access this resource' });
    }
}
