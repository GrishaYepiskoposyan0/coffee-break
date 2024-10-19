import Joi from "joi";

export const createPartnerValidationSchema: Joi.ObjectSchema =
  Joi.object().keys({
    name: Joi.string().required(),
    cooperationType: Joi.number().strict().min(0).required(),
    tin: Joi.string().required(),
  });
