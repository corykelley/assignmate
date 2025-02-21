import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { StudentAssignmentTable } from "./studentAssignment";

export const subjects = [
  "math",
  "english",
  "history",
  "science",
  "art",
  "music",
] as const;
export type Subject = (typeof subjects)[number];
export const subjectsEnum = t.pgEnum("subjects", subjects);

export const AssignmentTable = t.pgTable("assignments", {
  id,
  title: t.varchar({ length: 255 }).notNull(),
  description: t.varchar({ length: 255 }).notNull(),
  subject: subjectsEnum().notNull().default("math"),
  dueDate: t.date().notNull().defaultNow(),
  createdAt,
  updatedAt,
});

export const AssignmentRelationships = relations(
  AssignmentTable,
  ({ many }) => ({
    studentAssignments: many(StudentAssignmentTable),
  })
);
