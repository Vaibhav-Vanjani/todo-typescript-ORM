// src/index.ts
import { PrismaClient } from '../generated/prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

console.log("Prisma is -",prisma);

export async function insertData(id: string, title: string) {
  try {
    const response = await prisma.todo.create({
      data: { id, title },
    });
    console.log(response, "insertData");
  } catch (error) {
    console.error(error, "catch");
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateData(id: string, title: string) {
  try {
    const response = await prisma.todo.update({
        where:{
            id:id,
        },
        data:{
            title:title,
        }
});
    console.log(response, "updateData");
  } catch (error) {
    console.error(error, "catch");
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteData(id: string) {
  try {
    const response = await prisma.todo.delete({where:{
        id:id
    }});
    console.log(response, "updateData");
  } catch (error) {
    console.error(error, "catch");
  } finally {
    await prisma.$disconnect();
  }
}


// insertData("id2", "title2");
// updateData("id2", "title3");
// deleteData("id");


