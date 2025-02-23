import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { AssignmentTable } from "./assignment";
import { StudentTable } from "./student";
import { createdAt, updatedAt } from "../schemaHelpers";

export const StudentAssignmentTable = t.pgTable(
  "student_assignments",
  {
    assignmentId: t
      .uuid()
      .notNull()
      .references(() => AssignmentTable.id),
    studentId: t
      .uuid()
      .notNull()
      .references(() => StudentTable.id, { onDelete: "no action" }),
    createdAt,
    updatedAt,
  },
  (table) => [t.primaryKey({ columns: [table.assignmentId, table.studentId] })]
);

export const StudentAssignmentRelationships = relations(
  StudentAssignmentTable,
  ({ one }) => ({
    assignment: one(AssignmentTable, {
      fields: [StudentAssignmentTable.assignmentId],
      references: [AssignmentTable.id],
    }),
    student: one(StudentTable, {
      fields: [StudentAssignmentTable.studentId],
      references: [StudentTable.id],
    }),
  })
);
