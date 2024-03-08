import type { HttpContext } from '@adonisjs/core/http';
import { loginValidator } from '#validators/auth';
import User from '#models/user';

export default class AuthController {
    async login({ request, response }: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator);

        const user = await User.verifyCredentials(email, password);
        const token = await User.accessTokens.create(user);

        return response.ok({
            ...user.serialize(),
            auth: token,
        });
    }

    public async logout({}: HttpContext) {}
}
