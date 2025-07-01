//  Middleware لحماية الـ async routes من الأخطاء
export const asyncHandling = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      error.statusCode = error.statusCode || 500;
      next(error);
    });
  };
};

//  Global Error Handler – بيرجع رسالة موحدة لأي خطأ يحصل في الابلكيشن
export const GlobalErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  //  Dev Mode – إظهار الـ Stack Trace
  if (process.env.MOOD === "dev") {
    return res.status(statusCode).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }

  // Production Mode – إظهار رسالة فقط
  return res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};