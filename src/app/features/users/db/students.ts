import { db } from "@/drizzle/db";
import { StudentTable } from "@/drizzle/schema";

export async function insertUser(data: typeof StudentTable.$inferInsert) {
  const [newStudent] = await db.insert(StudentTable).values(data).returning();
}
