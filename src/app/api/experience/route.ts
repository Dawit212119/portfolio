import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(experiences);
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const data = await req.json();
  const experience = await prisma.experience.create({ data });
  return NextResponse.json(experience);
}
