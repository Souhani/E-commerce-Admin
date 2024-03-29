import clientPromise from '@/lib/mongodb'
import { mongooseConnect } from '@/lib/mongoose'
import { Admin } from '@/models/Admin'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

async function isAdminEmail(email) {
  await mongooseConnect();
  const isAdmin = !!(await Admin.findOne({email}));
   return isAdmin
}
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  callbacks: {
    session: async ({session, token, user}) => {
      if(await isAdminEmail(session?.user?.email)){
        return session;
      }else{
        session.notAdmin = true;
        session.user = "";
        return session;
      }
    }
  },
  secret: process.env.SECRET,
}

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
   const session = await getServerSession(req,res,authOptions);
    if(! await isAdminEmail(session?.user?.email)){
          res.status(401);
          res.end();
          throw "Not an admin"
    }
}