import { createSql } from "@/shared/sql/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const sql = createSql();
  const result = await sql.query(
    "select * from abysshole_appearance order by appearance_time desc limit 1",
    []
  );

  return NextResponse.json({ data: result[0] }, { status: 200 });
};
