import Joi from "joi";
const validator = (schema: Joi.Schema<object>) => (payload:object) => schema.validate(payload);

const movieSchema: Joi.Schema<object> = Joi.object ({
    name:Joi.string().min(1).empty().required().messages({
        "string.min": "Name should have min 1 character",
        "string.empty": "Name cannot be an empty field",
        "any.required": "Name is required",
      }),
    image: Joi.string()
    .empty()
    .pattern(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/
    )
    .required()
    .messages({
      "string.empty": "Image url cannot be an empty field",
      "string.url": "Invalid url format",
      "any.required": "Image url is required",
      "string.pattern.base":
        "Invalid url! Url must start with http:// or https://",
    }),
    platform: Joi.string().min(1).empty().required().messages({
        "string.min": "platform should have min 1 character",
        "string.empty": "platform cannot be an empty field",
        "any.required": "platform is required",
      }),
    genreId: Joi.number().min(1).empty().required().messages({
      "number.min": "genreId should have min 1 character",
      "number.empty": "genreId cannot be an empty field",
      "any.required": "genreId is required",
      }),
 })

const watchSchema: Joi.Schema<object> = Joi.object ({
    movieId: Joi.number().min(1).empty().required().messages({
        "number.min": "movieId should have min 1 character",
        "number.empty": "movieId cannot be an empty field",
        "any.required": "movieId is required",
    }),
    watched: Joi.boolean().empty().required().messages({
        "boolean.empty": "watched cannot be an empty field",
        "any.required": "watched is required",
    }),
})

const genreSchema:Joi.Schema<object> = Joi.object ({
  genre:Joi.string().min(1).empty().required().messages({
      "string.min": "Genre should have min 1 character",
      "string.empty": "Genre cannot be an empty field",
      "any.required": "Genre is required",
    }),
})


const movieValidation = validator(movieSchema);
const watchedValidation = validator(watchSchema);
const genreValidation = validator(genreSchema);


export { movieValidation, watchedValidation, genreValidation};