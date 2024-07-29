import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User:`);
  console.log(user);
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  console.log(`Inside Deserializer:`);
  try {
    const findUser = mockUsers.find((user) => user.username === username);
    if (!findUser) throw new Error("User Not Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
