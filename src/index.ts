import { configDotenv } from "dotenv";
import { makeApp } from "./app";
import mongoose from "mongoose";

configDotenv();

const app = makeApp();

const PORT = process.env.PORT || 5001;

let server: any;
mongoose.connect(process.env.MONGODB_URL!).then(
  () => {
    console.log('Connected to MongoDB');
    server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
)

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});