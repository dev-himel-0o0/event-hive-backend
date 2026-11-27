import app from "./app";
import { initNeonDB } from "./config/db";
import config from "./config/env";

const main = async () => {
  await initNeonDB();
  app.listen(config.port, () => {
    console.log(`Express Server is running on PORT: ${config.port}`);
  });
};

main();
