import * as db from "./zapatos/src";
import * as s from "./zapatos/schema";
import { pool } from "./server";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";

passport.serializeUser((user: s.employee.Selectable, done) => {
  console.log("serialize", user);
  done(null, user.name);
});

passport.deserializeUser((username: s.employee.Selectable, done) => {
  db.sql<s.employee.SQL, s.employee.Selectable[]>`
  SELECT ${"name"} 
  FROM ${"employee"} 
  WHERE ${"name"} = ${db.param(username)} 
  LIMIT 1
  `
    .run(pool)
    .then(([user]) => done(null, user));
});

passport.use(
  new passportLocal.Strategy((username, password, done) => {
    db.sql<s.employee.SQL, s.employee.Selectable[]>`
    SELECT ${"name"}, ${"password_hash"} 
    FROM ${"employee"} 
    WHERE ${"name"} = ${db.param(username)} 
    LIMIT 1`
      .run(pool)
      .then(([user]) => {
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        bcrypt.compare(password, user.password_hash).then((passwordValid) => {
          if (!passwordValid) {
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        });
      });
  })
);

export default passport;
