import { db } from "@/db";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken"

const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: 
    {
        async signIn({user, account}) {

         let existingUser = await db.query.users.findFirst({
            where: eq(users.email, user.email!)
         });

         if (!existingUser) {
        const [newUser] = await db.insert(users).values({
          fullName: user.name || "",
          email: user.email!,
          googleId: account?.providerAccountId,
          isAdmin: false,
        }).returning();
        existingUser = newUser;
      } else if (account && !existingUser.googleId) {
        await db.update(users)
          .set({ googleId: account.providerAccountId })
          .where(eq(users.email, user.email!));
      }
         return true;
        },
          
        async jwt({token, account}) {
            if (account) {
        const userData = await db.query.users.findFirst({
          where: eq(users.email, token.email!)
        });

        if (userData) {
          token.customToken = jwt.sign(
            {
              userId: userData.id,
              isAdmin: userData.isAdmin || false
            },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
          );
          token.userId = userData.id;
          token.isAdmin = userData.isAdmin!;
          token.fullName = userData.fullName;
        }
      }
      return token;
        },

        async session({session, token}) {
            if (session.user && token.userId) {
                session.user.id = token.userId as number;
                session.user.isAdmin = token.isAdmin as boolean;
                session.user.fullName = token.fullName as string;
                session.user.customToken = token.customToken as string;
            }
            
            return session
        
    }}


})

export {handler as GET, handler as POST};