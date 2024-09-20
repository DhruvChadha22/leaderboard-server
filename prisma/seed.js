const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const users = [
        {
            name: "Rahul",
            points: 10,
        },
        {
            name: "Kamal",
            points: 10,
        },
        {
            name: "Sanaki",
            points: 10,
        },
        {
            name: "Dhruv",
            points: 10,
        },
        {
            name: "Aditya",
            points: 10,
        },
        {
            name: "Arjun",
            points: 10,
        },
        {
            name: "Harsh",
            points: 10,
        },
        {
            name: "Ishaan",
            points: 10,
        },
        {
            name: "Kabir",
            points: 10,
        },
        {
            name: "Vishal",
            points: 10,
        },
    ]

    await prisma.user.createMany({
        data: users,
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });
