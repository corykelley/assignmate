import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { AssignmentTable } from "./assignment";
import { TeacherTable } from "./teacher";
import { createdAt, updatedAt } from "../schemaHelpers";

export const TeacherAssignmentTable = t.pgTable(
  "teacher_assignments",
  {
    assignmentId: t
      .uuid()
      .notNull()
      .references(() => AssignmentTable.id),
    teacherId: t
      .uuid()
      .notNull()
      .references(() => TeacherTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (table) => [t.primaryKey({ columns: [table.assignmentId, table.teacherId] })]
);

export const TeacherAssignmentRelationships = relations(
  TeacherAssignmentTable,
  ({ one }) => ({
    assignment: one(AssignmentTable, {
      fields: [TeacherAssignmentTable.assignmentId],
      references: [AssignmentTable.id],
    }),
    teacher: one(TeacherTable, {
      fields: [TeacherAssignmentTable.teacherId],
      references: [TeacherTable.id],
    }),
  })
);
