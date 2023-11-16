
import React from 'react';
import { createServerSupabaseClient } from '../_shared/helpers/ServerSupabaseClient';
import { getUserType } from '../_shared/helpers/AccountHelper';
import ErrorPage from '../error/page';

export default async function ProfilePage() {
    const supabase = createServerSupabaseClient();
    const session = (await supabase.auth.getSession())?.data?.session;
    if(!session) {
        return (
            <ErrorPage />
        )
    }
    const userType = getUserType(session?.user);
    //const user = useUser();
    switch(userType) {
        //case 'artist':
            //return <ArtistProfile />
        default:
            return (
                <h1 className="mt-5 text-5xl font-bold text-foreground border-rose-500 border-4 p-5">You shouldn't be here 😤</h1>
            )
    }
}