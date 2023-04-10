import Fastify from "fastify";
import productRoutes from "./routes/product.routes.js";
import indexRoutes from "./routes/index.routes.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
    fastifySwaggerConfig,
    fastifySwaggerUiConfig
} from "./config/swagger.config.js";
import "./config/sequelize.config.js";
import authRouters from "./routes/auth.routes.js";
import fastifyBcrypt from "fastify-bcrypt";
import {
    fastifyJwt
} from "@fastify/jwt";
import cors from "cors"
import fastifyMiddie from "@fastify/middie";
import serveStatic from "serve-static";
import * as path from "path"
import { fileURLToPath } from 'url';
import userRouters from "./routes/user.routes.js";
import categoryRouters from "./routes/category.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const fastify = Fastify({
    logger: true
});
const PORT = 5000
const main = async () => {
    await fastify.register(fastifyMiddie)
    fastify.register(fastifyBcrypt, {
        saltWorkFactor: 12
    })
    fastify.register(fastifyJwt, {
        secret: "DFBDFB6537DFB657DFGB685D7FB6FGB7",
    })
    fastify.register(fastifySwagger, fastifySwaggerConfig);
    fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig);
    fastify.use(cors())
    fastify.use((req, res, next) => {
        console.log("Hello middleware in fastify");
        next()
    })
    fastify.use("/my-files", serveStatic(path.join(__dirname, "public")))
    fastify.register(indexRoutes);
    fastify.register(authRouters, {
        prefix: "auth"
    })
    fastify.register(userRouters, {
        prefix: "user",
    })
    fastify.register(categoryRouters, { prefix: "category"})
    fastify.register(productRoutes, {
        prefix: "products",
    })

    fastify.listen({
        port: PORT,
    }, (err) => {
        if (err) console.log(err);
        console.log(`server run on port ${fastify.server.address().port}`);
    })
}
main();