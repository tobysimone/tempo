import { SupabaseClient } from "@supabase/supabase-js";

export async function getArtistIdFromUser(supabase: SupabaseClient) {
    const userId = (await supabase.auth.getSession())?.data.session?.user?.id;

    try {
        const { data, error } = await supabase
            .from('artist')
            .select('id')
            .eq('user_id', userId)
            .single();
        if(error) {
            throw new Error(`Could not retrieve artistId from artist table. UserId: ${userId}`, { cause: error });
        }
        return data?.id;
    } catch (e) {
        console.error(`Error while getting artistId from userId: ${userId}`);
    }

    return null;
}