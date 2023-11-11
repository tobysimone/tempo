import { NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export default function handler(request: Request, { params }: any) {
    console.log(JSON.stringify(params));
    const supabase = createRouteHandlerClient({ cookies });
    if (request.method === 'GET') {
        getHomepagePreferences(supabase, "");
    } else {
        // Handle other HTTP requests here
        return NextResponse.json({}, { status: 405 });
    }
}


export async function getHomepagePreferences(supabase: SupabaseClient, artistName: string) {
    // TODO: Implement function logic
}

