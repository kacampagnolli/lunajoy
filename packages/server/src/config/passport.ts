import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { UserService } from "../services/user.service";

export function createPassport(userService: UserService) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      },
      async (accessToken: string, refreshToken: string, profile: Profile, done) => {
        try {
          let user = await userService.getUserByExternalId(profile.id);

          if (!user) {
            user = await userService.createUser({
              externalId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value,
            });
          }

          done(null, user);
        } catch (error) {
          done(error as Error);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    const user = await userService.getUserById(id);
    done(null, user);
  });

  return passport
}
