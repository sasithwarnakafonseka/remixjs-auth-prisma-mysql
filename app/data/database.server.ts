import { PrismaClient } from '@prisma/client';

declare const global: NodeJS.Global & {
    __db?: PrismaClient;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
    prisma.$connect();
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
        global.__db.$connect();
    }
    prisma = global.__db;
}

export { prisma };