import { User } from "@supabase/supabase-js";

export interface TempoUser {
    user: User;
    displayName: string;
}