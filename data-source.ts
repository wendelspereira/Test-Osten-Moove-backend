import { DataSource } from "typeorm";
import { Business } from "./src/modules/business/infra/mysql/entity/Business";
import "dotenv/config";
import {CreateBusinessTable1658976782300} from "./src/shared/infra/typeorm/migrations/1658976782300-CreateBusinessTable"

export const AppDataSource = new DataSource({
  type: "mysql",
  port: 3306,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  entities: [
    Business,
    "__dirname + '/src/modules/business/infra/mysql/entity/*.{js,ts}'",
  ],
  migrations: [CreateBusinessTable1658976782300],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
