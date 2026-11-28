import app from "./app";
import { initNeonDB } from "./config/db";
import config from "./config/env";

const main = async () => {
  try {
    await initNeonDB();

    app.listen(config.port, () => {
      console.log(`Express Server is running on PORT: ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void main();
