import React, { createContext, useState } from "react";

type propsPage = {
  isLogin: null | string;
  setLogin: React.Dispatch<React.SetStateAction<null | string>>;
  user:User|null,
  setUser:React.Dispatch<React.SetStateAction<null | User>>;
};

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
};

export const authContext = createContext<propsPage | null>(null);
export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //lazy inilationatoin
  const [isLogin, setLogin] = useState<null | string>(() => {
    return localStorage.getItem("tkn");
  });
 const [user, setUser] = useState<User | null>(() => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    return null;
  }
});

  //   //handle refresh
  //   useEffect(()=>{
  //     if(localStorage.getItem('tkn'))
  //         setLogin(localStorage.getItem('tkn'))
  //   },[])

  return (
    <authContext.Provider value={{ isLogin, setLogin, user, setUser }}>
      {children}
    </authContext.Provider>
  );
}
