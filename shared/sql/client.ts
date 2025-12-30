import { neon } from "@neondatabase/serverless";

export function createSql() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  return sql;
}
