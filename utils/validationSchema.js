import Joi from 'joi';
import passwordComplexity  from 'joi-password-complexity';


export const signUpBodyValidation = (body) => {
    const schema = Joi.object({
        name: Joi.string().required().label("User Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        confirmPassword: passwordComplexity().required().label("Password"),
    });
    return schema.validate(body);
};


export const logInBodyValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(body);
};

export const refreshTokenBodyValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    });
    return schema.validate(body);
};