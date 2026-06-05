import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Idempotent seed (safe to run multiple times). Creates an admin, a demo
// customer, locations, add-ons and a few cars so the app has data to show.
const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin@xrent.bg";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "Admin1234";
const CUSTOMER_EMAIL = "customer@xrent.bg";
const CUSTOMER_PASSWORD = "Customer1234";

async function main() {
  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const customerHash = await bcrypt.hash(CUSTOMER_PASSWORD, 12);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { role: "ADMIN" },
    create: {
      email: ADMIN_EMAIL,
      name: "Администратор",
      passwordHash: adminHash,
      role: "ADMIN",
      emailVerified: new Date()
    }
  });

  await prisma.user.upsert({
    where: { email: CUSTOMER_EMAIL },
    update: {},
    create: {
      email: CUSTOMER_EMAIL,
      name: "Иван Клиентов",
      phone: "+359888123456",
      passwordHash: customerHash,
      role: "CUSTOMER",
      consents: {
        create: { type: "GDPR_REGISTRATION", policyVersion: "2026-06-05" }
      }
    }
  });

  // Locations (stable ids for upsert idempotency).
  const sofia = await prisma.location.upsert({
    where: { id: "loc_sofia_center" },
    update: {},
    create: {
      id: "loc_sofia_center",
      name: "София — Център",
      address: "бул. Витоша 1",
      city: "София"
    }
  });

  const airport = await prisma.location.upsert({
    where: { id: "loc_sofia_airport" },
    update: {},
    create: {
      id: "loc_sofia_airport",
      name: "Летище София",
      address: "Терминал 2",
      city: "София"
    }
  });

  // Add-ons.
  const addOns = [
    { id: "addon_driver", name: "Допълнителен шофьор", priceType: "PER_DAY" as const, price: 8 },
    { id: "addon_child_seat", name: "Детско столче", priceType: "PER_DAY" as const, price: 5 },
    { id: "addon_full_cover", name: "Пълно покритие", priceType: "PER_DAY" as const, price: 15 },
    { id: "addon_delivery", name: "Доставка до адрес", priceType: "FLAT" as const, price: 30 }
  ];
  for (const a of addOns) {
    await prisma.addOn.upsert({
      where: { id: a.id },
      update: {},
      create: a
    });
  }

  // Cars.
  const cars = [
    {
      id: "car_skoda_octavia",
      brand: "Škoda",
      model: "Octavia",
      year: 2023,
      category: "Среден клас",
      fuel: "DIESEL" as const,
      transmission: "AUTOMATIC" as const,
      seats: 5,
      doors: 5,
      dailyRate: 65,
      depositAmount: 300,
      mileageLimit: 250,
      locationId: sofia.id
    },
    {
      id: "car_vw_golf",
      brand: "Volkswagen",
      model: "Golf",
      year: 2022,
      category: "Компактен",
      fuel: "PETROL" as const,
      transmission: "MANUAL" as const,
      seats: 5,
      doors: 5,
      dailyRate: 55,
      depositAmount: 250,
      mileageLimit: 250,
      locationId: sofia.id
    },
    {
      id: "car_tesla_model3",
      brand: "Tesla",
      model: "Model 3",
      year: 2024,
      category: "Премиум",
      fuel: "ELECTRIC" as const,
      transmission: "AUTOMATIC" as const,
      seats: 5,
      doors: 4,
      dailyRate: 120,
      depositAmount: 600,
      mileageLimit: null,
      locationId: airport.id
    }
  ];
  for (const c of cars) {
    await prisma.car.upsert({
      where: { id: c.id },
      update: {},
      create: c
    });
  }

  console.log("Seed complete:");
  console.log(`  Admin:    ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  console.log(`  Customer: ${CUSTOMER_EMAIL} / ${CUSTOMER_PASSWORD}`);
  console.log(`  Cars: ${cars.length}, Locations: 2, Add-ons: ${addOns.length}`);
  void admin;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
