import { changeProfileHandler, getProfileHandler } from "../handler/user.handler.js";
import { GetUserMiddleware } from "../utils/get-user.js";
const changeProfileRoute = {
    schema: {
        tags: ['user'],
        summary: "change user profile",
        security: [{apiKey: []}],
        body: {
            type: "object",
            properties: {
                address: {
                    type: "string"
                },
                latitudes: {
                    type: "number"
                },
                longitudes: {
                    type: "number"
                }
            },
        },
        response: {
            201: {
                type: "object"
            }
        }
    },
    handler: changeProfileHandler,
    preHandler: [GetUserMiddleware],

}
const getProfileRoute = {
    schema: {
        tags: ['user'],
        summary: "get user profile",
        security: [{apiKey: []}],
        response: {
            199: {
                type: "object"
            }
        }
    },
    handler: getProfileHandler,
    preHandler: [GetUserMiddleware]
}
export default function userRouters(fastify, options, done) {
    fastify.patch("/change", changeProfileRoute)
    fastify.get("/get", getProfileRoute)
    done()
}