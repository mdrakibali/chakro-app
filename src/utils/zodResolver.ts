import { FieldErrors, FieldValues, Resolver } from 'react-hook-form';
import { z } from 'zod';

/**
 * Lightweight Zod resolver for react-hook-form.
 */
export function zodResolver<T extends FieldValues>(
  schema: z.ZodType<T, any, any>
): Resolver<T> {
  return async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: FieldErrors<T> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof T;
      if (field && !errors[field]) {
        (errors as Record<string, unknown>)[field as string] = {
          type: issue.code,
          message: issue.message,
        };
      }
    }

    return { values: {}, errors };
  };
}
