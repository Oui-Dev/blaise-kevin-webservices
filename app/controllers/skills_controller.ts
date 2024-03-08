import type { HttpContext } from '@adonisjs/core/http';
import { createValidator, updateValidator } from '#validators/skill';
import Skill from '#models/skill';

export default class SkillsController {
    public async index({ response }: HttpContext) {
        const skills = await Skill.all();

        return response.ok(skills);
    }

    public async show({ params, response }: HttpContext) {
        const skill = await Skill.findOrFail(params.id);

        return response.ok(skill);
    }

    async create({ request, response }: HttpContext) {
        const name = request.input('name');
        const slug = name.toLowerCase().replace(/ /g, '-');

        const payload = await createValidator.validate({ name, slug });
        const skill = await Skill.create(payload);

        return response.created(skill);
    }

    public async update({ request, params, response }: HttpContext) {
        const name = request.input('name');
        const slug = name.toLowerCase().replace(/ /g, '-');

        const data = { name, slug, id: params.id };
        const skill = await Skill.findOrFail(data.id);

        const payload = await updateValidator.validate(data);
        skill.merge(payload);
        await skill.save();

        return response.ok(skill);
    }

    public async delete({ params, response }: HttpContext) {
        const skill = await Skill.findOrFail(params.id);
        await skill.delete();

        return response.noContent();
    }
}
