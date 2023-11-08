'use client'

import { User, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useCallback, useEffect, useState } from "react";

export function useUserId() {
    const supabase = createRouteHandlerClient({ cookies });

    const [user, setUser] = useState<User | null>();
    const [userId, setUserId] = useState<string | null>();

    const getUser = useCallback(async () => {
        const user = (await supabase.auth.getSession()).data?.session?.user;
        setUser(user);
    }, []);

    useEffect(() => {
        (async () => {
            getUser();
            setUserId(user?.id);
        })();
    }, [user]);

    return userId;
}