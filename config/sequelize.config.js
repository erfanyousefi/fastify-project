import { Sequelize } from "sequelize";
// export const sequelize = new Sequelize("postgres://postgres:root@localhost:5433/fastify");
export const sequelize = new Sequelize("fastify", "postgres", "root", {
    host: "localhost",
    port: 5433,
    dialect: "postgres"
});
// const DBConnection = async () => {
//     await sequelize.authenticate();
//     console.log("postgres is connected");
// }
// DBConnection()