'use client'

import { createContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface UserContextProps {
  user: User | null;
  displayName: string | null;
  pending: boolean;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const supabase = createClientComponentClient();

  const updateUser = (user: User | null, displayName: string | null) => {
    setUser(user);
    setDisplayName(displayName);
  }

  const getUser = async () => {
    setPending(true);
    const response = await fetch('/api/user', { method: 'GET' });
    const data = await response.json();
    setPending(false);
    return {
      user: data.user,
      displayName: data.displayName
    }
  }

  useEffect(() => {
    (async () => {
      if ((await supabase.auth.getSession())?.data?.session) {
        const { user, displayName } = await getUser();
        updateUser(user, displayName);

        supabase.auth.onAuthStateChange(async (event, _) => {
          if (event === 'SIGNED_IN') {
            const { user, displayName } = await getUser();
            updateUser(user, displayName);
          } else if (event === 'SIGNED_OUT') {
            updateUser(null, null);
          }
        });
      } else {
        setPending(false);
      }
    })();
  }, [supabase]);

  return (
    <UserContext.Provider value={{ user, displayName, pending }}>
      {children}
    </UserContext.Provider>
  );
};