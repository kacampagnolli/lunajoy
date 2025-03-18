import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

async function main() {
  const activityTypes = ['running', 'cycling', 'walking', 'swimming', 'yoga'];
  const socialOptions = ['daily', 'weekly', 'once a week', 'twice a week', 'none'];
  const sleepDisturbanceOptions = ['none', 'woke up frequently', 'snoring', 'insomnia'];
  const symptomDetailsOptions = [
    'mild anxiety symptoms',
    'feeling relaxed',
    'feeling tired',
    'depressive symptoms',
    'normal'
  ];

  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        externalId: `google-${1000 + i}`,
        name: `User ${i}`,
        email: `user${i}@google.com`,
        healthLogs: {
          create: Array.from({ length: 10 }).map(() => {
            const daysAgo = randomInt(0, 30);
            const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
            return {
              mood: randomInt(1, 10),
              anxiety: randomInt(1, 10),
              sleepHours: randomInt(0, 24),
              sleepQuality: randomInt(1, 10),
              sleepDisturbance: randomChoice(sleepDisturbanceOptions),
              physicalActivityType: randomChoice(activityTypes),
              physicalActivityDuration: randomInt(10, 60),
              socialInteractions: randomChoice(socialOptions),
              stress: randomInt(1, 10),
              symptomDetails: randomChoice(symptomDetailsOptions),
              createdAt,
            };
          }),
        },
      },
    });
    console.log(`Created user ${user.id}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
