import type { HttpContext } from '@adonisjs/core/http';

export default class UsersController {
    public async index({}: HttpContext) {}

    public async show({ params }: HttpContext) {}

    public async create({}: HttpContext) {}

    public async update({ params }: HttpContext) {}

    public async delete({ params }: HttpContext) {}
}
