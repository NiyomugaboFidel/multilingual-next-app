import Joi from "joi";

const userProfileSchema = Joi.object({
  firstName: Joi.string().min(3).optional(),
  lastName: Joi.string().min(3).optional(),
  gender: Joi.string().valid("male", "female").optional(),
  dateOfBirth: Joi.date().less("1-1-2100").optional().label("Date of Birth"),
  preferredCurrency: Joi.string()
    .uppercase()
    .optional()
    .label("Preferred Currency"),
  preferredLanguage: Joi.string()
    .max(50)
    .optional()
    .label("Preferred Language"),
  street: Joi.string().max(100).optional().label("Street"),
  province: Joi.string().max(50).optional().label("Province"),
  district: Joi.string().max(50).optional().label("District"),
  city: Joi.string().max(50).optional().label("City"),
  state: Joi.string().max(50).optional().label("State"),
  postalCode: Joi.string().max(10).optional().label("Postal Code"),
  phoneN: Joi.string()
    .min(10)
    .max(20)
    .pattern(/^[0-9]+$/)
    .optional()
    .label("Phone Number"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "co"] },
    })
    .optional()
    .label("Email"),
  nationality: Joi.string().max(50).optional().label("Nationality"),
  preferredContactMethod: Joi.string()
    .valid("email", "phone")
    .optional()
    .label("Preferred Contact Method"),
  marketingPreferences: Joi.object()
    .pattern(
      Joi.string().valid("email", "sms", "pushNotifications"),
      Joi.boolean()
    )
    .optional()
    .label("Marketing Preferences"),
  socialLinks: Joi.object()
    .pattern(Joi.string(), Joi.string().uri())
    .optional()
    .label("Social Links"),
  preferredCategories: Joi.array()
    .items(Joi.string().max(50))
    .optional()
    .label("Preferred Categories"),
  termsAccepted: Joi.boolean().optional().label("Terms Accepted"),
}).min(1);

export const editUserProfileValidation = async (req, res, next) => {
  const { error } = userProfileSchema.validate(req.body, {
    abortEarly: false, // Gather all errors instead of stopping at the first one.
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((err) =>
        err.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  }

  next();
};
