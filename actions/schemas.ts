import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const signUpSchema = z.object({
  email: z.email(),
  username: z
    .string()
    .min(6, "Usernames must contain at least 6 characters")
    .regex(/^[A-Za-z0-9]+$/, "usernames can only contain letters and numbers"),
  password: z
    .string()
    .min(6, "Passwords must contain at least 6 characters.")
    .regex(/[^A-Za-z0-9]/, "password must contain at least one special character"),
});

export const createPostSchema = z.object({
  title: z.string().regex(/[a-zA-Z0-9]/, "title must contain at least one letter or number"),
  image: z.instanceof(FormData),
});

export const editPostSchema = z.object({
  title: z.string().regex(/[a-zA-Z0-9]/, "title must contain at least one letter or number"),
  image: z.instanceof(FormData).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(3, "comment must contain at least 2 characters"),
});

export const createPromptSchema = z.object({
  title: z.string().trim().min(2, "title is required").max(100),
  description: z.string().trim().min(5, "description is required"),
  date: z.string().min(1, "date is required").regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "enter a valid date"
  ),
});
