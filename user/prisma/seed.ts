import { PrismaClient, User } from '@prisma/client'

const client = new PrismaClient();

async function main() {
    const users: User[] = [
        {
            id: 1,
            username: 'alice',
        },
        {
            id: 2,
            username: 'bob',
        },
        {
            id: 3,
            username: 'carlos',
        },
    ]

    await client.user.createMany({
        data: users
    })
}

main();