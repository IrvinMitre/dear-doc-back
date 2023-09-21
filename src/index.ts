import http from "http";
import debug from "debug";
import App from "./App";
import { normalizePort } from "./utils/expressPortUtils";
import packageJson from "../package.json";
debug("ts-express:server");

const port = normalizePort(process.env.PORT || 3002);

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCESS":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = (): void => {
  console.log(
    `${packageJson.name} ${packageJson.version} listening on port ${port}!`
  );
  console.log(`${process.env.NODE_ENV} mode is ON`);
};

App.set("port", port);

const server = http.createServer(App);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
