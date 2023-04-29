import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextApiHandler } from 'next';
import type { NextAuthOptions, Session, User } from 'next-auth';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { prisma } from '@/lib/prisma';

export interface ExtendedSession extends Session {
    // Add any custom properties to the session here
    role: string;
}

export function getBaseUrl(req: any): string {
    const isHttps = req?.url?.startsWith('https://');
    const protocol = isHttps ? 'https' : 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;

    return `${protocol}://${host}`;
}

/**
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET || 'L#UIH84hiNIJ#IU*O858ji{}|"ki',
    adapter: PrismaAdapter(prisma),

    /**
     * @see https://next-auth.js.org/configuration/providers
     */
    providers: [

        // Github
        GithubProvider({
            allowDangerousEmailAccountLinking: true,
            clientId: `${process.env.GITHUB_CLIENT_ID}`,
            clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`
        }),

    ],


};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

export const GET = handler;
export const POST = handler;