import { getHomepageSettings } from '@/app/_shared/service/homepage/homepage-settings.service';
import './styles.css';

import { createServerSupabaseClient } from '@/app/_shared/helpers/ServerSupabaseClient';
import { FlowbiteTheme } from '@/app/_shared/theme/flowbite-theme';
import ErrorPage from '@/app/error/page';
import { Card } from 'flowbite-react';

async function getArtist(artistId: string) {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
        .from('artist')
        .select('*')
        .eq('id', artistId)
        .single();
    if (error) {
        console.error(`Error while getting artist by ID: ${artistId}. Error: ${JSON.stringify(error)}`);
        return null;
    }

    return data;
}

export default async function Page({ params }: { params: { artistName: string } }) {
    const settings = await getHomepageSettings({ subdomain: params.artistName });
    if(!settings) {
        return <ErrorPage />
    }

    const artist = await getArtist(settings?.artistId);

    return (
        <div className="page-container">
            <Card 
                className="container w-full"
                imgSrc={settings?.header}
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 0 }}
                theme={FlowbiteTheme.CARD}
            >
                <h1 className="text-3xl font-bold text-black dark:text-white">{artist?.name}</h1>
                <p className="mt-5 text-black dark:text-white">{settings?.description}</p>
            </Card>
        </div>
    );
}