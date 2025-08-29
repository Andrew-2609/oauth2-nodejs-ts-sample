import env from "@/config/env";
import { setupRoutes } from "@/main/config/routes";
import express, { Express } from "express";
import { auth } from "express-openid-connect";
import path from "path";

export const setupApp = (): Express => {
  const app = express();

  app.use(
    auth({
      authRequired: false,
      auth0Logout: true,
      secret: env.auth0.secret,
      baseURL: env.auth0.baseUrl,
      clientID: env.auth0.clientId,
      issuerBaseURL: `https://${env.auth0.domain}`,
    }),
  );

  app.use(express.static("public"));
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "..", "views"));

  setupRoutes(app);

  return app;
};
