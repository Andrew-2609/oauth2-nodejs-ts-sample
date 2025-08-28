import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.SERVER_PORT ?? 5000,
  idNamespace:
    process.env.ID_NAMESPACE ?? "8ce113db-db5d-4bd0-9c20-d3c114b064d5",
  auth0: {
    secret: process.env.AUTH0_SECRET,
    clientId: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    baseUrl: process.env.AUTH0_BASE_URL,
  },
};
