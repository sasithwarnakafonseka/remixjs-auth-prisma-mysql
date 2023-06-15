import { prisma } from "../database.server";

export async function addResponses(responsesData: responsesData) {
    try {
        return await prisma.responses.create({
            data: responsesData,
        });
    } catch (error) {
        throw new Error('Failed to add responsess.');
    }
}

export async function getResponsess() {
    try {
        const responsesss = await prisma.responses.findMany({
            orderBy: { created: 'desc' },
        });
        return responsesss;
    } catch (error) {
        throw new Error('Failed to get responsesss.');
    }
}

export async function getResponses(id: any) {
    try {
        const responsess = await prisma.responses.findFirst({ where: { id } });
        return responsess;
    } catch (error) {
        throw new Error('Failed to get responsess.');
    }
}

export async function updateResponses(id: any, responsessData: responsesData) {
    try {
        await prisma.responses.update({
            where: { id },
            data: responsessData,
        });
    } catch (error) {
        throw new Error('Failed to update responsess.');
    }
}

export async function deleteResponses(id: any) {
    try {
        await prisma.responses.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error('Failed to delete responsess.');
    }
}