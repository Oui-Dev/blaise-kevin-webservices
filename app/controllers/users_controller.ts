import type { HttpContext } from '@adonisjs/core/http';
import { createValidator, updateValidator } from '#validators/user';
import User from '#models/user';

export default class UsersController {
    public async index({ request, response }: HttpContext) {
        let query = User.query();

        // if the request provide an array of skills id
        if (request.input('skills_filter')) {
            query = query.whereHas('skills', builder => {
                builder.whereIn('skills.id', [...request.input('skills_filter')]);
            });
        }

        if (request.input('limit')) {
            query = query.limit(request.input('limit'));
        }

        if (request.input('order')) {
            if (request.input('order') !== 'asc' || request.input('order') !== 'desc') return;
            query = query.orderBy('created_at', request.input('order'));
        }

        const developpers = await query.preload('skills').exec();
        return response.ok(developpers);
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
