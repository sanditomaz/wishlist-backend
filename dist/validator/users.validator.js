import Joi from "joi";
var validator = function (schema) { return function (payload) { return schema.validate(payload); }; };
var signUpSchema = Joi.object({
    name: Joi.string().min(1).empty().required().messages({
        "string.min": "Name should be min 1 character",
        "string.empty": "Name cannot be an empty field",
        "any.required": "Name is required"
    }),
    image: Joi.string()
        .empty()
        .pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/)
        .required()
        .messages({
        "string.empty": "Image url cannot be an empty field",
        "string.url": "Invalid url format",
        "any.required": "Image url is required",
        "string.pattern.base": "Invalid url! Url must start with http:// or https://"
    }),
    email: Joi.string().email().empty().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email cannot be an empty field",
        "any.required": "Email is required"
    }),
    password: Joi.string().min(3).empty().required().regex(/^\S+$/).messages({
        "string.min": "Password should have at least 3 characters",
        "string.empty": "Password cannot be an empty field",
        "string.pattern.base": "No empty spaces allowed",
        "any.required": "Password is required"
    })
});
var signInSchema = Joi.object({
    email: Joi.string().email().empty().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email cannot be an empty field",
        "any.required": "Email is required"
    }),
    password: Joi.string().empty().required().messages({
        "string.empty": "Password cannot be an empty field",
        "any.required": "Password is required"
    })
});
var signUpValidation = validator(signUpSchema);
var signInValidation = validator(signInSchema);
export { signUpValidation, signInValidation };
