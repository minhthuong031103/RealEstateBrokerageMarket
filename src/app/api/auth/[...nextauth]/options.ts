import { AuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
const options: AuthOptions = {
  //SIGN IN CHAY TRUOC JWT, TRONG SIGNIN SE RETURN 1 THANG USER, JWT CHAY TRUOC SESSION
  // Configure one or more authentication providers

  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      async profile(profile) {
        //cai profile nay se truyen xuong jwt function
        return {
          id: profile.id,
          name: profile.global_name,
          email: profile.email,
          avatar: profile.picture,
        };
      },
    }),

    GithubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
      async profile(profile) {
        console.log('inside prfileeeeeeeeeeeeeee');
        //cai profile nay se truyen xuong jwt function

        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          avatar: profile.avatar_url,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) throw new Error('Email or password is incorrect');
        if (user.password !== password)
          throw new Error('Email or password is incorrect');

        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user.id,
          avatar: user.avatar,
        };
      },
    }),

    // ...add more providers here
  ],

  callbacks: {
    async signIn(params) {
      console.log('paramssssssssssssssssssssssssssssssssssssssssssssss: ');
      console.log(params);
      if (params?.user?.email) {
        const userFind = await prisma.user.findUnique({
          where: {
            email: params?.user?.email,
          },
        });

        if (!userFind) {
          const payload = jwt.sign(
            { email: params?.user?.email, name: params?.user?.name },
            process.env.NEXT_PUBLIC_JWT_SECRET,
            { expiresIn: '1h' }
          );
          return `/auth/register/?payload=${payload}`;
        } else return true;
      }

      return true;
    },
    //first it run the jwt function, the jwt function will return the token , then in the session function we can access the token
    async jwt({ token, user }) {
      console.log('user in jwt: ');
      console.log(user);
      if (!user) return token; //if no user, token is from jwt function

      //user is from the oauth config or in the credentials setting options
      //if token==null , session will not run
      token.role = user.role;
      token.id = user.id;
      token.avatar = user.avatar;
      token.name = user.name;
      token.email = user.email;

      //return final token
      return token;
    },
    async session({ token, session }) {
      // if (!userFind) {
      //   return {
      //     redirectTo: `/auth/login?email=${session?.user.email}&name=${session?.user.name}`,
      //   };
      // }
      console.log('token in sessionnnnnnnnnnnnnnnnn: ', token);
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { name: string }).name = token.name as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { avatar: string }).avatar = token.avatar as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};
export default options;
