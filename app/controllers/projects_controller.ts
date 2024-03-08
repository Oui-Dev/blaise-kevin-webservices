import type { HttpContext } from '@adonisjs/core/http';
import Project from '#models/project';

export default class ProjectsController {
    public async index({}: HttpContext) {
        const projects = await Project.all();

        return projects;
    }

    public async show({ params }: HttpContext) {
        const project = await Project.findOrFail(params.id);

        return project;
    }

    public async create({}: HttpContext) {}

    public async update({ params }: HttpContext) {}

    public async delete({ params }: HttpContext) {}
}
