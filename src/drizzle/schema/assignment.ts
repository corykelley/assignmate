import * as t from "drizzle-orm/pg-core";

export const subjectsEnum = t.pgEnum("subjects", [
  "math",
  "english",
  "history",
  "science",
  "art",
  "music",
]);

export const AssignmentTable = t.pgTable("assignments", {
  id: t.uuid().primaryKey().defaultRandom(),
  title: t.text().notNull(),
  description: t.text().notNull(),
  subject: subjectsEnum().notNull().default("math"),
  dueDate: t.text().notNull(),
  createdAt: t.text(),
});
