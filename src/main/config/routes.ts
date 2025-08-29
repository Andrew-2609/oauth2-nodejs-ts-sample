import env from "@/config/env";
import { User } from "@/domain/entities/user";
import { UserInMemoryRepository } from "@/infra/db/in-memory/user-repository";
import { Express } from "express";
import { v5 as uuid } from "uuid";

export const setupRoutes = (app: Express): void => {
  app.get("/", async (req, res) => {
    if (!req.oidc.isAuthenticated()) {
      res.render("index", {
        isAuthenticated: false,
      });
      return;
    }

    if (!req.oidc.user) {
      console.log("this should never happen in this sample!");
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

    res.render("index", {
      isAuthenticated: true,
      user,
    });
  });

  app.get("/profile", (req, res) => {
    if (!req.oidc.isAuthenticated()) {
      res.status(401).send("Unauthorized");
      return;
    }

    const {
      sid: _sid,
      sub: _sub,
      ...nonSensitiveUserData
    } = req.oidc.user ?? {};

    res.render("profile", {
      user: nonSensitiveUserData,
    });
  });
};
