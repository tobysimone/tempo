
import { getUser, getUserType } from '../_shared/helpers/AccountHelper';
import { createServerSupabaseClient } from '../_shared/helpers/ServerSupabaseClient';
import ErrorPage from '../error/page';
import ArtistSettings from './artist/artist-settings';

export default async function SettingsPage() {
    const supabase = createServerSupabaseClient();
    const user = await getUser(supabase);
    if(!user) {
        return (
            <ErrorPage />
        )
    }

    const userType = getUserType(user);
    switch(userType) {
        case 'artist':
            return <ArtistSettings />
        default:
            return (
                <h1 className="flex self-center mt-5 text-5xl font-bold text-foreground border-rose-500 border-4 p-5">You shouldn't be here 😤</h1>
            )
    }
}