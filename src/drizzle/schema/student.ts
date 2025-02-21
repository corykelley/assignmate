import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { StudentAssignmentTable } from "./studentAssignment";

export const gradeYears = [
  "freshman",
  "sophomore",
  "junior",
  "senior",
] as const;
export type GradeYear = (typeof gradeYears)[number];
export const gradeYearsEnum = t.pgEnum("years", gradeYears);

export const StudentTable = t.pgTable("students", {
  id,
  name: t.varchar({ length: 255 }).notNull(),
  year: gradeYearsEnum().notNull().default("freshman"),
  email: t.varchar({ length: 255 }).notNull(),
  createdAt,
  updatedAt,
});

export const StudentRelationships = relations(StudentTable, ({ many }) => ({
  studentAssignments: many(StudentAssignmentTable),
}));
