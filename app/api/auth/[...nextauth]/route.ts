import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";


const handler = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: 
    {
        async signIn({user, account}) {

         const existingUser = await db.query.users.findFirst({
            where: eq(users.email, user.email!)
         });

         if (existingUser && account) {
            await db.update(users)
          .set({ googleId: account.providerAccountId })
          .where(eq(users.email, user.email!));
         }
         return true;
        },
           
        async session({session, user}) {
            if (session.user) {
                session.user.id = user.id; 
                const userData = await db.query.users.findFirst({
                where: eq(users.email, session.user.email!)
            });

            if(userData) {
                session.user.isAdmin = userData.isAdmin;
                session.user.fullName = userData.fullName;
            }
            }
            
            return session
        
    }}


})

export {handler as GET, handler as POST};