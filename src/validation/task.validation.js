import Joi from "joi";
import { TaskValidate } from "../utils/general.Validation.js";

//  Schema لإنشاء مهمة جديدة
export const createTaskSchema = Joi.object({
  title: TaskValidate.title.required(),
  description: TaskValidate.description.required(),
  dueDate: TaskValidate.dueDate.required(),
  status: TaskValidate.status.required(),
  priority: TaskValidate.priority.required(),
});

//  Schema لتعديل مهمة – كل الحقول اختيارية
export const updateTaskSchema = Joi.object({
  title: TaskValidate.title.optional(),
  description: TaskValidate.description.optional(),
  dueDate: TaskValidate.dueDate.optional(),
  status: TaskValidate.status.optional(),
  priority: TaskValidate.priority.optional(),
});