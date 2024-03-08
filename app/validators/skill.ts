import vine from '@vinejs/vine';

export const createValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(80),
        slug: vine.string().unique(async (db, value) => {
            const skill = await db.from('skills').where('slug', value).first();
            return !skill;
        }),
    })
);

export const updateValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(80),
        slug: vine.string().unique(async (db, value, field) => {
            const skill = await db.from('skills').where('slug', value).whereNot('id', field.data.id).first();
            return !skill;
        }),
    })
);
