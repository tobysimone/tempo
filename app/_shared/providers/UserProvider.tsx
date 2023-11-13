'use client'

import { createContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface UserContextProps {
  user: User | null;
  displayName: string | null;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    let ignore = false;
    (async () => {
      const response = await fetch('/api/user', { method: 'GET' });
      const data = await response.json();
      if(!ignore) {
        setUser(data.user);
        setDisplayName(data.displayName);
      }
    })();

    return () => { ignore = true; }
  }, [supabase.auth]);

  return (
    <UserContext.Provider value={{ user, displayName }}>
      {children}
    </UserContext.Provider>
  );
};