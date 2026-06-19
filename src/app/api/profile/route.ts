import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PUT(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const data = await req.json();
  const existing = await prisma.profile.findFirst();

  let profile;
  if (existing) {
    profile = await prisma.profile.update({
      where: { id: existing.id },
      data,
    });
  } else {
    profile = await prisma.profile.create({ data });
  }

  return NextResponse.json(profile);
}
