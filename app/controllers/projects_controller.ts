import type { HttpContext } from '@adonisjs/core/http';
import { createValidator, updateValidator } from '#validators/project';
import Project from '#models/project';

export default class ProjectsController {
    public async index({ request, response }: HttpContext) {
        let query = Project.query();

        // if the request provide an array of users id
        if (request.input('users_filter')) {
            query = query.whereHas('users', builder => {
                builder.whereIn('users.id', [...request.input('users_filter')]);
            });
        }

        if (request.input('limit')) {
            query = query.limit(request.input('limit'));
        }

        if (request.input('order')) {
            if (request.input('order') !== 'asc' || request.input('order') !== 'desc') return;
            query = query.orderBy('created_at', request.input('order'));
        }

        const projects = await query.preload('users').exec();
        return response.ok(projects);
    }

    async latests({ response }: HttpContext) {
        const projects = await Project.query().limit(3).orderBy('created_at', 'desc').preload('users');
        return response.ok(projects);
    }

    public async show({ params, response }: HttpContext) {
        const project = await Project.findOrFail(params.id);
        await project.load('users');

        return response.ok(project);
    }

    async create({ request, response }: HttpContext) {
        const payload = await createValidator.validate(request.all());
        const project = await Project.create(payload);

        if (payload.users && payload.users.length > 0) {
            await project.related('users').attach(payload.users);
            await project.load('users');
        }

        return response.created(project);
    }

    public async update({ request, params, response }: HttpContext) {
        const data = { ...request.all(), id: params.id };
        const project = await Project.findOrFail(data.id);

        const payload = await updateValidator.validate(data);
        project.merge(payload);
        await project.save();

        if (payload.users) {
            await project.related('users').sync(payload.users);
        }
        await project.load('users');

        return response.ok(project);
    }

    public async delete({ params, response }: HttpContext) {
        const project = await Project.findOrFail(params.id);
        await project.delete();

        return response.noContent();
    }
}
