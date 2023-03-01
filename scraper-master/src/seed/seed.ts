import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto';
import fs from 'fs';
import JobService from '../services/JobService';
const prisma = new PrismaClient();

const main = async () => {
    let seedData = JSON.parse(fs.readFileSync('./src/seed/seed.json', { encoding: 'utf8' }));
    for await (const url of seedData) {
        await JobService.createJobIfNotExists({
            url: url,
            status: "free",
            contentHashId: randomUUID(),
        })
    }
}

main().then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
