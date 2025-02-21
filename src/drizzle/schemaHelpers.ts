import * as t from "drizzle-orm/pg-core";

export const id = t.uuid().primaryKey().defaultRandom();
export const createdAt = t
  .timestamp({ withTimezone: true })
  .notNull()
  .defaultNow();
export const updatedAt = t
  .timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
