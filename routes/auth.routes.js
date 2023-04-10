import { loginHandler, registerHandler } from "../handler/auth.handler.js";
const registerRoute = {
    schema: {
        tags: ['authentication'],
        summary: "some description about route",
        body: {
            type: "object",
            properties: {
                first_name: {
                    type: "string",
                },
                last_name: {
                    type: "string",
                },
                username: {
                    type: "string",
                },
                password: {
                    type: "string",
                }
            },
        },
        response: {
            201: {
                type: "object"
            }
        }
    },
    handler: registerHandler
}
const loginRoute = {
    schema: {
        tags: ['authentication'],
        summary: "some description about route",
        body: {
            type: "object",
            properties: {
                username: {
                    type: "string",
                },
                password: {
                    type: "string",
                }
            },
        },
        response: {
            199: {
                type: "object"
            }
        }
    },
    handler: loginHandler
}
export default function authRouters(fastify, options, done) {
    fastify.post("/register", registerRoute)
    fastify.post("/login", loginRoute)
    done()
}