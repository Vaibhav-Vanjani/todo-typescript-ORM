"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = insertData;
exports.updateData = updateData;
exports.deleteData = deleteData;
// src/index.ts
const client_1 = require("../generated/prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
async function insertData(id, title) {
    try {
        const response = await prisma.todo.create({
            data: { id, title },
        });
        console.log(response, "insertData");
    }
    catch (error) {
        console.error(error, "catch");
    }
    finally {
        await prisma.$disconnect();
    }
}
async function updateData(id, title) {
    try {
        const response = await prisma.todo.update({
            where: {
                id: id,
            },
            data: {
                title: title,
            }
        });
        console.log(response, "updateData");
    }
    catch (error) {
        console.error(error, "catch");
    }
    finally {
        await prisma.$disconnect();
    }
}
async function deleteData(id) {
    try {
        const response = await prisma.todo.delete({ where: {
                id: id
            } });
        console.log(response, "updateData");
    }
    catch (error) {
        console.error(error, "catch");
    }
    finally {
        await prisma.$disconnect();
    }
}
// insertData("id2", "title2");
// updateData("id2", "title3");
// deleteData("id");
//# sourceMappingURL=dbUtils.js.map