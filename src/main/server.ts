import "module-alias/register";
import env from "@/config/env";
import { setupApp } from "@/main/config/app";

const app = setupApp();

app.listen(env.port, () => {
  console.log(`Server listening on https://localhost:${env.port}`);
});

// A graceful shutdown could be implemented after assigning app.listen to a server constant
