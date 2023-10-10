const Joi = require('joi');

module.exports = {
    registroSchema: Joi.object({
        usuario: Joi.string()
            .alphanum()
            .min(3)
            .max(30)

    })
}
