import { SignUpMessage } from "@/app/_shared/_constants/sign-up-message";
import { TableConstants } from "@/app/_shared/_constants/table-constants";
import { UserConstants } from "@/app/_shared/_constants/user-constants";
import { SupabaseClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const artistName = String(formData.get('artist-name'));
    const password = String(formData.get('password'));
    const supabase = createRouteHandlerClient({ cookies });

    const { data: { user }, error: createUserError } = await createUser(supabase, email, password, `${requestUrl.origin}/auth/callback`);
    if (createUserError) {
        console.log(`Error while creating user account for artist sign up: ${JSON.stringify(createUserError)}`);
        return redirectToSignUpWithMessage(requestUrl.origin, 301, true, SignUpMessage.ERROR_WHILE_CREATING_ARTIST_ACCOUNT);
    }

    const userId = user?.id;
    if(!userId) {
        console.log(`Error while creating user account for artist sign up: userId is null`);
        return redirectToSignUpWithMessage(requestUrl.origin, 301, true, SignUpMessage.ERROR_WHILE_CREATING_ARTIST_ACCOUNT);
    }

    const { error: createArtistError } = await createArtist(supabase, userId, artistName);
    if(createArtistError) {
        console.log(`Error while completing artist sign up: ${JSON.stringify(createArtistError)}`);
        return redirectToSignUpWithMessage(requestUrl.origin, 301, true, SignUpMessage.ERROR_WHILE_CREATING_ARTIST_ACCOUNT);
    }

    return redirectToSignUpWithMessage(requestUrl.origin, 301, false, SignUpMessage.ACCOUNT_ACTIVATION_PENDING_POST_SIGN_UP);
}

function createUser(supabase: SupabaseClient, email: string, password: string, emailRedirectTo: string) {
    return supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                type: UserConstants.USER_TYPE_ARTIST,
            },
            emailRedirectTo: emailRedirectTo,
        },
    });
}

function createArtist(supabase: SupabaseClient, userId: string, name: string) {
    return supabase.from(TableConstants.ARTIST)
        .insert({ user_id: userId, name: name });
}

function redirectToSignUpWithMessage(origin: string, status: number, error: boolean, message: string): NextResponse {
    const messageTypeParam = error ? 'error' : 'message';
    return NextResponse.redirect(`${origin}/signup/artist?${messageTypeParam}=${message}`, {
        status: status
    });
}