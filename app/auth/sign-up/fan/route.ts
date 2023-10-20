import { SignUpMessage } from "@/app/_constants/sign-up-message";
import { TableConstants } from "@/app/_constants/table-constants";
import { SupabaseClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const username = String(formData.get('username'));
    const password = String(formData.get('password'));
    const supabase = createRouteHandlerClient({ cookies });

    const { error: createUserError } = await createUser(supabase, email, password, `${requestUrl.origin}/auth/callback`);
    if (createUserError) {
        console.log(`Error while creating user account for fan sign up: ${createUserError}`);
        return redirectToSignUpWithMessage(requestUrl.origin, 301, true, SignUpMessage.ERROR_WHILE_CREATING_ARTIST_ACCOUNT);
    }

    const { error: createFanError } = await createFan(supabase, username);
    if(createFanError) {
      console.log(`Error while completing fan sign up: ${createFanError}`);
      return redirectToSignUpWithMessage(requestUrl.origin, 301, true, SignUpMessage.ERROR_WHILE_CREATING_ARTIST_ACCOUNT);
    }
    
    return redirectToSignUpWithMessage(requestUrl.origin, 301, false, SignUpMessage.ACCOUNT_ACTIVATION_PENDING_POST_SIGN_UP);
}

function createUser(supabase: SupabaseClient, email: string, password: string, emailRedirectTo: string) {
  return supabase.auth.signUp({
      email,
      password,
      options: {
          emailRedirectTo: emailRedirectTo,
      },
  });
}

function createFan(supabase: SupabaseClient, username: string) {
  return supabase.from(TableConstants.FAN)
    .insert({ username: username });
}

function redirectToSignUpWithMessage(origin: string, status: number, error: boolean, message: string): NextResponse {
  const messageTypeParam = error ? 'error' : 'message';
  return NextResponse.redirect(`${origin}/signup/fan?${messageTypeParam}=${message}`, {
      status: status
  });
}