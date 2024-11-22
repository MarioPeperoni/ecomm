"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

const UserContext = createContext<User | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setData(data.user);
    };
    getUser();
  }, []);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
