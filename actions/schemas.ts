import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const signUpSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .trim()
    .min(3, "username must contain at least 3 characters")
    .max(20, "username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_.]+$/, "username can only contain letters, numbers, underscores, and periods"),
  password: z
    .string()
    .min(8, "password must contain at least 8 characters")
    .max(64, "password cannot exceed 64 characters")
    .regex(/[^A-Za-z0-9]/, "password must contain at least one special character"),
});

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "title is required")
    .max(50, "title must be 50 characters or less")
    .regex(/[a-zA-Z0-9]/, "title must contain at least 1 letter or number"),
  image: z.instanceof(FormData),
});

export const editPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "title is required")
    .max(50, "title must be 50 characters or less")
    .regex(/[a-zA-Z0-9]/, "title must contain at least 1 letter or number"),
  image: z.instanceof(FormData).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(2, "comment must contain at least 2 characters"),
});

export const createPromptSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "prompt must contain at least 3 characters")
    .max(20, "prompt cannot exceed 20 characters"),
  description: z
    .string()
    .trim()
    .min(5, "description must contain at least 5 characters")
    .max(80, "description cannot exceed 80 characters"),
  date: z
    .string()
    .min(1, "date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "enter a valid date"),
});
