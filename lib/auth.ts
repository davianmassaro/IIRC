import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { adminLogin, normalizeAdminRole } from "@/lib/iirc-api";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        try {
          const data = await adminLogin(email, password);
          const role = normalizeAdminRole(data.user.role);

          return {
            id: String(data.user.id),
            email: data.user.email,
            name: data.user.name,
            role,
            image: null,
            apiToken: data.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "ADMIN";
        token.apiToken = (user as { apiToken?: string }).apiToken;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        (session.user as { apiToken?: string }).apiToken = token.apiToken as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
