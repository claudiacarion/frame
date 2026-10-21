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
    .min(3, "usernames must contain at least 3 characters")
    .max(20, "usernames cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  password: z
    .string()
    .min(8, "passwords must contain at least 8 characters")
    .max(64, "password cannot exceed 64 characters")
    .regex(/[^A-Za-z0-9]/, "password must contain at least one special character"),
});

export const createPostSchema = z.object({
  title: z.string().regex(/[a-zA-Z0-9]/, "title must contain at least 1 character"),
  image: z.instanceof(FormData),
});

export const editPostSchema = z.object({
  title: z.string().regex(/[a-zA-Z0-9]/, "title must contain at least 1 character"),
  image: z.instanceof(FormData).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(3, "comment must contain at least 2 characters"),
});

export const createPromptSchema = z.object({
  title: z.string().trim().min(3, "the title must contain at least 3 characters").max(64),
  description: z.string().trim().min(5, "the description must contain at least 5 characters").max(128),
  date: z
    .string()
    .min(1, "date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "enter a valid date"),
});
