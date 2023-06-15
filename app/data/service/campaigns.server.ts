import { prisma } from "../database.server";

export async function addCampaigns(campaignsData: campaignData) {
    try {
        return await prisma.campaigns.create({
            data: campaignsData,
        });
    } catch (error) {
        throw new Error('Failed to add campaigns.');
    }
}

export async function getCampaignss() {
    try {
        const campaignss = await prisma.campaigns.findMany({
            orderBy: { created: 'desc' },
        });
        return campaignss;
    } catch (error) {
        throw new Error('Failed to get campaignss.');
    }
}

export async function getCampaigns(id: any) {
    try {
        const campaigns = await prisma.campaigns.findFirst({ where: { id } });
        return campaigns;
    } catch (error) {
        throw new Error('Failed to get campaigns.');
    }
}

export async function updateCampaigns(id: any, campaignsData: { title: any; amount: string | number; date: string | number | Date; }) {
    try {
        await prisma.campaigns.update({
            where: { id },
            data: {
                title: campaignsData.title,
            },
        });
    } catch (error) {
        throw new Error('Failed to update campaigns.');
    }
}

export async function deleteCampaigns(id: any) {
    try {
        await prisma.campaigns.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error('Failed to delete campaigns.');
    }
}