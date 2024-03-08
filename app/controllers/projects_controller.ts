import type { HttpContext } from '@adonisjs/core/http';
import { createValidator, updateValidator } from '#validators/project';
import Project from '#models/project';

export default class ProjectsController {
    public async index({ response }: HttpContext) {
        const projects = await Project.all();

        return response.ok(projects);
    }

    public async show({ params, response }: HttpContext) {
        const project = await Project.findOrFail(params.id);

        return response.ok(project);
    }

    async create({ request, response }: HttpContext) {
        const payload = await createValidator.validate(request.all());
        const project = await Project.create(payload);

        return response.created(project);
    }

    public async update({ request, params, response }: HttpContext) {
        const data = { ...request.all(), id: params.id }
        const project = await Project.findOrFail(data.id);
        
        const payload = await updateValidator.validate(data);
        project.merge(payload);
        await project.save();

        return response.ok(project);
    }

    public async delete({ params, response }: HttpContext) {
        const project = await Project.findOrFail(params.id);
        await project.delete();

        return response.noContent();
    }
}
