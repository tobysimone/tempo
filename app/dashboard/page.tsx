import { getUser, getUserType } from "../_shared/helpers/AccountHelper"
import { createServerSupabaseClient } from "../_shared/helpers/ServerSupabaseClient";
import ArtistDashboard from "./artist/page";

export default async function Dashboard() {
    const supabase = createServerSupabaseClient();
    const user = await getUser(supabase);
    const userType = getUserType(user);
    
    switch(userType) {
        case 'artist':
            return <ArtistDashboard />
        default:
            return <></>
    }
}