import Joi from "joi";

export const createPartnerBodyValidationSchema: Joi.ObjectSchema =
  Joi.object().keys({
    name: Joi.string().required(),
    cooperationType: Joi.number().strict().min(0).required(),
    tin: Joi.string().required(),
  });
export const updatePartnerBodyValidationSchema: Joi.ObjectSchema =
  Joi.object().keys({
    name: Joi.string().optional(),
    cooperationType: Joi.number().strict().min(0).optional(),
    isActive: Joi.boolean().optional(),
    tin: Joi.string().optional(),
  });

export const getAllPartnersQueryValidationSchema: Joi.ObjectSchema =
  Joi.object().keys({
    limit: Joi.string()
      .regex(/^[0-9]+$/)
      .optional(),
    offset: Joi.string()
      .regex(/^[0-9]+$/)
      .optional(),
    isActive: Joi.boolean().optional().allow("true", "false"),
  });
