// This file is a workaround for a bug in Next.js
import { PrismaClient } from '@prisma/client';

import { env } from "@/env.mjs"

declare const global: Global & { prisma?: PrismaClient };

export let prisma: PrismaClient; // eslint-disable-line

// Prevent multiple instances of Prisma Client in development
if (typeof window === 'undefined') {
    if (env.NODE_ENV === 'production') {
        prisma = new PrismaClient(); // This is only executed once in a production environment
    } else {
        if (!global.prisma) {
            global.prisma = new PrismaClient(); // This is only executed once per request
        }

        prisma = global.prisma; // This is executed on every request
    }
}