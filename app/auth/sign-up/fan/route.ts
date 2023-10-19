import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const username = String(formData.get('username'));
    const password = String(formData.get('password'));
    const supabase = createRouteHandlerClient({ cookies });

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username,
            },
            emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        },
    });

    if (error) {
        console.log(error);
        return NextResponse.redirect(
          `${requestUrl.origin}/login?error=Could not authenticate user`,
          {
            // a 301 status is required to redirect from a POST to a GET route
            status: 301,
          }
        );
      }
    
      return NextResponse.redirect(
        `${requestUrl.origin}/login?message=Check email to continue sign up process`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
}