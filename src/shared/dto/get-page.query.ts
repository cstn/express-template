import { z } from 'zod';

/**
 * Schema definition for paginated query parameters.
 *
 * This schema is used to validate and enforce constraints on pagination parameters
 * commonly used in APIs, such as `offset` and `limit`. Both fields are optional and
 * have default values if not provided.
 *
 * - `offset`: Specifies the number of results to skip before starting to return results.
 *    Must be a nonnegative integer, with a default value of `0`.
 * - `limit`: Specifies the maximum number of results to return.
 *    Must be a positive integer, with a default value of `10`.
 */
export const PagingQuerySchema = z.object({
  offset: z.coerce
    .number()
    .int()
    .nonnegative()
    .optional()
    .default(0)
    .describe('Result offset, default 0'),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .default(10)
    .describe('Result limit, default 10'),
});

/**
 * Represents the structure of a paging query object inferred from the PagingQuerySchema.
 *
 * This type is used to define the expected format for handling pagination-related queries.
 * It is typically utilized in APIs or functions where paginated results need to be fetched,
 * allowing clients to specify options such as page number, page size, and other query parameters.
 *
 * The type is derived from a validation schema (PagingQuerySchema), ensuring that the input adheres
 * to the defined schema rules, providing type safety and data validation.
 */
export type PagingQuery = z.infer<typeof PagingQuerySchema>;
