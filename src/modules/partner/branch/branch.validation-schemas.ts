import Joi from "joi";

export const createBranchBodyValidationSchema: Joi.ObjectSchema =
  Joi.object().keys({
    partnerId: Joi.number().strict().min(0).required(),
    name: Joi.string().required(),
    locationLat: Joi.string().required(),
    locationLng: Joi.string().required(),
    address: Joi.string().required(),
    contacts: Joi.array()
      .items({
        contactType: Joi.number().strict().min(0).required(),
        value: Joi.string().required(),
      })
      .required(),
  });
export const updateBranchBodyValidationSchema: Joi.ObjectSchema =
  Joi.object().keys({
    name: Joi.string().optional(),
    locationLat: Joi.string().optional(),
    locationLng: Joi.string().optional(),
    address: Joi.string().optional(),
    contacts: Joi.array()
      .items({
        id: Joi.number().strict().min(0).required(),
        contactType: Joi.number().strict().min(0).required(),
        value: Joi.string().required(),
      })
      .optional(),
  });

export const getAllBranchQueryValidationSchema: Joi.ObjectSchema =
  Joi.object().keys({
    limit: Joi.string()
      .regex(/^[0-9]+$/)
      .optional(),
    offset: Joi.string()
      .regex(/^[0-9]+$/)
      .optional(),
    isActive: Joi.boolean().optional().allow("true", "false"),
  });
