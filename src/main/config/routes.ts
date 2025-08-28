import env from "@/config/env";
import { User } from "@/domain/entities/user";
import { UserInMemoryRepository } from "@/infra/db/in-memory/user-repository";
import { Express } from "express";
import { v5 as uuid } from "uuid";

export const setupRoutes = (app: Express): void => {
  app.get("/", async (req, res) => {
    if (!req.oidc.isAuthenticated()) {
      res.send(`
        <h1>OAuth 2.0 Example for Raidiam!</h1>
        <a href="/login">Login with Auth0</a>
      `);
      return;
    }

    if (!req.oidc.user) {
      res.status(500).send(`<h1>No user present in OIDC</h1>`);
      return;
    }

    const reqUser = req.oidc.user;

    let userId = uuid(reqUser.email, env.idNamespace);
    let user = await UserInMemoryRepository.getInstance().getUserById(userId);

    if (!user) {
      console.log(
        `user ${reqUser.email} doesn't exist in our database yet. Persisting them...`,
      );

      const newUser = new User({
        id: userId,
        name: reqUser.name,
        email: reqUser.email,
        picture: reqUser.picture,
      });

      userId = await UserInMemoryRepository.getInstance().addUser(newUser);
      user = (await UserInMemoryRepository.getInstance().getUserById(
        userId,
      )) as User;
    } else {
      console.log(`successfully found user ${user.getId()} by their email!`);
    }

    res.send(`
      <h1>OAuth 2.0 Example for Raidiam!</h1>
      ${`
        <p>Hello, ${user.getName()}!</p>
        <p>You can see your user profile <a href="/profile">here!</a></p>
        <a href="/logout">Logout</a>
      `}
    `);
  });

  app.get("/profile", (req, res) => {
    if (!req.oidc.isAuthenticated()) {
      res.status(401).send("Unauthorized");
      return;
    }

    res.send(`
      <h2>User Profile</h2>
      <pre>${JSON.stringify(req.oidc.user, null, 2)}</pre>
      <a href="/">Go back to home</a>
    `);
  });
};
