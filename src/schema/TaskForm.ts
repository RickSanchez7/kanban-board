import z from 'zod';
import { typeOptions } from '../models';
import { UsersFormSchema } from './UsersForm';

export const TaskFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string(),
  subTasks: z
    .array(
      z.object({
        id: z.string(),
        title: z.string().min(1, 'Title is required'),
        isChecked: z.boolean().default(false),
      })
    )
    .optional(),
  taskType: z
    .object({
      value: z.string(),
      label: z.string(),
      Icon: z.function(),
      style: z.object({
        color: z.string(),
      }),
    })
    .refine(
      data => {
        // Check if the value and label exist in optionsArray
        return typeOptions.some(
          option => option.value === data.value && option.label === data.label
        );
      },
      {
        message: 'Invalid selection. Please select a valid label.',
      }
    ),
  assignUser: UsersFormSchema.optional().nullable(),
});

export type TaskFormSchemaType = z.infer<typeof TaskFormSchema>;
