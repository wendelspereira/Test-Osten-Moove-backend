import { DataSource } from "typeorm";
import { Business } from "./src/modules/business/infra/mysql/entity/Business";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  port: 3306,
  host: process.env.ENVIRONMENT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  entities: [
    Business,
    "__dirname + '/src/modules/business/infra/mysql/entity/*.{js,ts}'",
  ],
  migrations: ["./src/shared/infra/typeorm/migrations/*.{js,ts}"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
