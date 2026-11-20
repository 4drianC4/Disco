import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("Falta DATABASE_URL");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL?.toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password || password.length < 8 || new TextEncoder().encode(password).length > 72)
    throw new Error("Define credenciales locales de seed: contraseña entre 8 caracteres y 72 bytes");

  await prisma.user.upsert({
    where: { email }, update: {},
    create: { email, name: "Administración demo", role: "ADMIN", passwordHash: await bcrypt.hash(password, 12) },
  });
  await prisma.event.upsert({
    where: { id: "00000000-0000-4000-8000-000000000001" }, update: {},
    create: { id: "00000000-0000-4000-8000-000000000001", name: "Noche de prueba", startsAt: new Date("2026-12-05T22:00:00-04:00"), capacity: 100, status: "OPEN" },
  });
  const category = await prisma.category.upsert({
    where: { name: "Sin alcohol" }, update: {}, create: { name: "Sin alcohol" },
  });
  await prisma.drink.upsert({
    where: { id: "00000000-0000-4000-8000-000000000002" }, update: {},
    create: { id: "00000000-0000-4000-8000-000000000002", name: "Agua", priceCents: 1000, categoryId: category.id },
  });
  await prisma.clubTable.upsert({
    where: { number: 1 }, update: {}, create: { number: 1, capacity: 4 },
  });
}

main().catch(() => {
  console.error("Seed fallido; revisar configuración local sin imprimir secretos");
  process.exitCode = 1;
}).finally(async () => { await prisma.$disconnect(); });
