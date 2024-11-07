import dbConnect from '@/db/database';
import Title from '../../../models/Title';

export async function GET(_req: Request) {
    await dbConnect();
    try {
        const titles = await Title.find(); // Fetch titles from the database
        console.log("Titles from server", titles);
        return new Response(JSON.stringify(titles), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Unable to fetch titles' }), { status: 500 });
    }
}
