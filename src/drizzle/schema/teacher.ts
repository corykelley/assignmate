import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { TeacherAssignmentTable } from "./teacherAssignment";

export const TeacherTable = t.pgTable("teachers", {
  id,
  name: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  createdAt,
  updatedAt,
});

export const TeacherRelationships = relations(TeacherTable, ({ many }) => ({
  teacherAssignments: many(TeacherAssignmentTable),
}));
