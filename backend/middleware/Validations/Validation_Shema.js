import joi from 'joi';
export const auth_Validation_Shema = joi.object({
    userName: joi.string().required(),
    email: joi.string().lowercase().required(),
    password: joi.string().min(5).max(10).required()
})

export const auth_Validation_Shema_login = joi.object({
    usernames: joi.string().required(),
    password: joi.string().min(5).max(10).required()
})

