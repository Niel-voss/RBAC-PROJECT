import { signIn, signOut } from "next-auth/react";



export const logout = async () => {
  await signOut({ callbackUrl: "/auth/SignIn" });
};

export const login = async () => {
  await signIn(undefined, { callbackUrl: "/student" });
}

//theres something wrong with this logic i dont think the logout funcion works for both google and credentials sign in methods.
//i have to find out later if it uses the whole user session cookies to know if they are sign in or nor or works for just one of the sign in methods. i.s google and credentials