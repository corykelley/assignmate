import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { StudentAssignmentTable } from "./studentAssignment";
import { TeacherTable } from "./teacher";

export const gradeYears = [
  "kindergarten",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
] as const;
export type GradeYear = (typeof gradeYears)[number];
export const gradeYearsEnum = t.pgEnum("grade_years", gradeYears);

export const StudentTable = t.pgTable("students", {
  id,
  name: t.varchar({ length: 255 }).notNull(),
  year: gradeYearsEnum().notNull().default("kindergarten"),
  parentEmail: t.varchar({ length: 255 }).notNull().unique(),
  teacherId: t
    .uuid()
    .references(() => TeacherTable.id, { onDelete: "set null" }),
  createdAt,
  updatedAt,
});

export const StudentRelationships = relations(
  StudentTable,
  ({ one, many }) => ({
    teacher: one(TeacherTable, {
      fields: [StudentTable.teacherId],
      references: [TeacherTable.id],
    }),
    studentAssignments: many(StudentAssignmentTable),
  })
);
