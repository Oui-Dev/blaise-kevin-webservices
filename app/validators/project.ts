import vine from '@vinejs/vine';

export const createValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .minLength(3)
            .maxLength(254)
            .unique(async (db, value) => {
                const project = await db.from('projects').where('name', value).first();
                return !project;
            }),
        users: vine
            .array(
                vine.number().exists(async (db, value) => {
                    const user = await db.from('users').where('id', value).first();
                    return !!user;
                })
            )
            .distinct()
            .nullable(),
    })
);

export const updateValidator = vine.compile(
    vine.object({
        name: vine
            .string()
            .minLength(3)
            .maxLength(254)
            .unique(async (db, value, field) => {
                const project = await db.from('projects').where('name', value).whereNot('id', field.data.id).first();
                return !project;
            }),
        users: vine
            .array(
                vine.number().exists(async (db, value) => {
                    const user = await db.from('users').where('id', value).first();
                    return !!user;
                })
            )
            .distinct()
            .nullable(),
    })
);
