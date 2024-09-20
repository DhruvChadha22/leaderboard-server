"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const PORT = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.prisma.user.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return res.json(users);
    }
    catch (e) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/claim/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield db_1.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return res.status(403).json({ error: "User not found" });
        }
        const randPoints = Math.floor(Math.random() * 10) + 1;
        yield db_1.prisma.user.update({
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
    catch (e) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/leaderboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.prisma.user.findMany({
            orderBy: {
                points: "desc",
            },
        });
        return res.json(users);
    }
    catch (e) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.listen(PORT);
