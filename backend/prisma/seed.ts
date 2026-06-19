import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const demoEmail = 'demo@kadikoykavurma.com';

  const existingUser = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (existingUser) {
    console.log('Demo kullanıcı zaten mevcut.');
    return;
  }

  const roastery = await prisma.roastery.create({
    data: {
      name: 'Kadıköy Kavurma Atölyesi',
      address: 'Caferağa Mah. Moda Cad. No:88',
      city: 'İstanbul',
      district: 'Kadıköy',
      phone: '0216 456 78 90',
      email: 'info@kadikoykavurma.com',
      taxNo: 'KVR-34-2024-0088',
    },
  });

  const passwordHash = await bcrypt.hash('demo123456', 12);

  await prisma.user.create({
    data: {
      email: demoEmail,
      passwordHash,
      firstName: 'Can',
      lastName: 'Demir',
      role: 'admin',
      specialty: 'Baş Kavurucu',
      roasteryId: roastery.id,
    },
  });

  const customer1 = await prisma.customer.create({
    data: {
      companyName: 'Moda Kahve Evi',
      contactName: 'Selin Arslan',
      phone: '0532 111 22 33',
      email: 'selin@modakahve.com',
      address: 'Moda Mah. Bahariye Cad. No:12',
      city: 'İstanbul',
      notes: 'Aylık 20kg orta kavurma siparişi',
      roasteryId: roastery.id,
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      companyName: 'Bebek Roastery',
      contactName: 'Emre Yıldız',
      phone: '0533 444 55 66',
      email: 'emre@bebekroastery.com',
      address: 'Bebek Mah. Cevdet Paşa Cad. No:34',
      city: 'İstanbul',
      roasteryId: roastery.id,
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      companyName: 'Nişantaşı Espresso Bar',
      contactName: 'Ayşe Koç',
      phone: '0535 777 88 99',
      email: 'ayse@nisantasi-espresso.com',
      city: 'İstanbul',
      roasteryId: roastery.id,
    },
  });

  const profile1 = await prisma.roastProfile.create({
    data: {
      name: 'Etiyopya Yirgacheffe Orta',
      origin: 'Etiyopya',
      variety: 'Heirloom',
      roastLevel: 'medium',
      chargeTemp: 195,
      dropTemp: 210,
      durationMin: 11,
      description: 'Çiçeksi ve narenciye notaları',
      roasteryId: roastery.id,
    },
  });

  const profile2 = await prisma.roastProfile.create({
    data: {
      name: 'Kolombiya Supremo Koyu',
      origin: 'Kolombiya',
      variety: 'Caturra',
      roastLevel: 'medium_dark',
      chargeTemp: 200,
      dropTemp: 220,
      durationMin: 13,
      description: 'Kakao ve fındık aroması',
      roasteryId: roastery.id,
    },
  });

  await prisma.greenBean.createMany({
    data: [
      { name: 'Etiyopya Yirgacheffe G1', origin: 'ethiopia', processing: 'washed', stockKg: 120, unitCost: 185, supplier: 'Trabocca TR', harvestYear: 2024, roasteryId: roastery.id },
      { name: 'Kolombiya Huila Supremo', origin: 'colombia', processing: 'washed', stockKg: 85, unitCost: 142, supplier: 'Café Imports', harvestYear: 2024, roasteryId: roastery.id },
      { name: 'Brezilya Santos NY2', origin: 'brazil', processing: 'natural', stockKg: 200, unitCost: 95, supplier: 'Istanbul Coffee Exchange', harvestYear: 2023, roasteryId: roastery.id },
      { name: 'Kenya AA Nyeri', origin: 'kenya', processing: 'washed', stockKg: 15, unitCost: 210, supplier: 'Direct Trade Co.', harvestYear: 2024, roasteryId: roastery.id },
      { name: 'Güney Anadolu Doğal', origin: 'turkey', processing: 'natural', stockKg: 45, unitCost: 78, supplier: 'Adana Çiftlik Kooperatifi', harvestYear: 2024, roasteryId: roastery.id },
    ],
  });

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 86400000);
  const nextWeek = new Date(now.getTime() + 7 * 86400000);

  await prisma.cupping.createMany({
    data: [
      {
        date: tomorrow,
        duration: 60,
        type: 'sample_tasting',
        status: 'scheduled',
        notes: 'Yeni hasat Etiyopya numune tadımı',
        roasterName: 'Can Demir',
        customerId: customer1.id,
        roasteryId: roastery.id,
      },
      {
        date: tomorrow,
        duration: 45,
        type: 'wholesale_visit',
        status: 'confirmed',
        notes: 'Bebek Roastery fabrika turu',
        roasterName: 'Can Demir',
        customerId: customer2.id,
        roasteryId: roastery.id,
      },
      {
        date: nextWeek,
        duration: 30,
        type: 'quality_check',
        status: 'scheduled',
        notes: 'Kolombiya batch kalite kontrolü',
        roasterName: 'Can Demir',
        customerId: customer3.id,
        roasteryId: roastery.id,
      },
    ],
  });

  await prisma.order.createMany({
    data: [
      {
        productName: 'Etiyopya Yirgacheffe — 10kg',
        weightKg: 10,
        roastLevel: 'medium',
        status: 'roasting',
        totalPrice: 3200,
        paidAmount: 1600,
        orderDate: new Date(now.getTime() - 7 * 86400000),
        deliveryDate: nextWeek,
        notes: 'Vakumlu paket',
        customerId: customer1.id,
        roastProfileId: profile1.id,
        roasteryId: roastery.id,
      },
      {
        productName: 'Kolombiya Supremo — 25kg',
        weightKg: 25,
        roastLevel: 'medium_dark',
        status: 'packed',
        totalPrice: 5500,
        paidAmount: 5500,
        orderDate: new Date(now.getTime() - 14 * 86400000),
        deliveryDate: tomorrow,
        customerId: customer2.id,
        roastProfileId: profile2.id,
        roasteryId: roastery.id,
      },
      {
        productName: 'Özel Blend — 5kg',
        weightKg: 5,
        roastLevel: 'light',
        status: 'quoted',
        totalPrice: 1800,
        paidAmount: 0,
        orderDate: now,
        customerId: customer3.id,
        roasteryId: roastery.id,
      },
    ],
  });

  console.log('Demo veriler başarıyla oluşturuldu.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
