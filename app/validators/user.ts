import vine from '@vinejs/vine';

export const createValidator = vine.compile(
    vine.object({
        firstName: vine.string().minLength(3).maxLength(254),
        lastName: vine.string().minLength(3).maxLength(254),
        email: vine
            .string()
            .email()
            .unique(async (db, value) => {
                const user = await db.from('users').where('email', value).first();
                return !user;
            }),
        password: vine.string().minLength(8).maxLength(200),
        roleId: vine.number().exists(async (db, value) => {
            const role = await db.from('roles').where('id', value).first();
            return !!role;
        }),
        skills: vine
            .array(
                vine.number().exists(async (db, value) => {
                    const skill = await db.from('skills').where('id', value).first();
                    return !!skill;
                })
            )
            .distinct()
            .nullable(),
    })
);

export const updateValidator = vine.compile(
    vine.object({
        firstName: vine.string().minLength(3).maxLength(254),
        lastName: vine.string().minLength(3).maxLength(254),
        email: vine
            .string()
            .email()
            .unique(async (db, value, field) => {
                const user = await db.from('users').where('email', value).whereNot('id', field.data.id).first();
                return !user;
            }),
        password: vine.string().minLength(8).maxLength(200),
        roleId: vine.number().exists(async (db, value) => {
            const role = await db.from('roles').where('id', value).first();
            return !!role;
        }),
        skills: vine
            .array(
                vine.number().exists(async (db, value) => {
                    const skill = await db.from('skills').where('id', value).first();
                    return !!skill;
                })
            )
            .distinct()
            .nullable(),
    })
);
