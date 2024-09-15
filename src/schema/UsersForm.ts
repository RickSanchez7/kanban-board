import { z } from 'zod';
import { Positions } from '../models/Users';

export const UsersFormSchema = z.object({
  id: z.string().default(Math.random().toString()),
  name: z.string().min(3, 'Users must have at least 3 characters'),
  position: z.nativeEnum(Positions),
  value: z.string().optional(),
  label: z.string().optional(),
});
