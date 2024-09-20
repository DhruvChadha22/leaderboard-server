import express from "express";
import cors from "cors";
import { prisma } from "./db";

const PORT = 8000;

const app = express();
app.use(cors());

app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
            },
        });

        return res.json(users);
    }
    catch(e) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/claim/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(403).json({ error: "User not found" });
        }

        const randPoints = Math.floor(Math.random() * 10) + 1;

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                points: {
                    increment: randPoints,
                },
            },
        });

        return res.json({ 
            name: user.name,
            points: randPoints,
        });
    }
    catch(e) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/leaderboard", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                points: "desc",
            },
        });

        return res.json(users);
    }
    catch(e) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT);