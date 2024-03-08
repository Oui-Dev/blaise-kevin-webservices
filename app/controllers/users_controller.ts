import type { HttpContext } from '@adonisjs/core/http';
import { createValidator, updateValidator } from '#validators/user';
import User from '#models/user';

export default class UsersController {
    public async index({ response }: HttpContext) {
        const users = await User.query().preload('skills');

        return response.ok(users);
    }

    public async show({ params, response }: HttpContext) {
        const user = await User.findOrFail(params.id);
        await user.load('skills');

        return response.ok(user);
    }

    async create({ request, response }: HttpContext) {
        const payload = await createValidator.validate(request.all());
        const user = await User.create(payload);

        if (payload.skills && payload.skills.length > 0) {
            await user.related('skills').attach(payload.skills);
            await user.load('skills');
        }

        return response.created(user);
    }

    public async update({ request, params, response }: HttpContext) {
        const data = { ...request.all(), id: params.id };
        const user = await User.findOrFail(data.id);

        const payload = await updateValidator.validate(data);
        user.merge(payload);
        await user.save();

        if (payload.skills) {
            await user.related('skills').sync(payload.skills);
        }
        await user.load('skills');

        return response.ok(user);
    }

    public async delete({ params, response }: HttpContext) {
        const user = await User.findOrFail(params.id);
        await user.delete();

        return response.noContent();
    }
}
