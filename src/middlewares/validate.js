export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, // يعرض كل الأخطاء مش أول واحدة بس
      allowUnknown: false, // يمنع وجود خصائص مش معرفة في السكيمه
      stripUnknown: true,  // يشيل الخصائص الزايدة تلقائيًا
    });

    if (error) {
      const messages = error.details.map((err) => err.message);
      const errObj = new Error(messages.join(", "));
      errObj.statusCode = 400;
      throw errObj;
    }

    next();
  };
};