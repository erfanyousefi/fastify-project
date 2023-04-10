const indexRoute = {
    schema: {
        tags: ['home'],
        security: [{
            apiKey: []
        }],
        response: {
            200: {
                type: "object",
                properties: {
                    header: {
                        type: "object",
                        properties: {
                            authorization: {
                                type: "string"
                            }
                        }
                    },
                    message: {
                        type: "string"
                    }
                }
            }
        }
    },
    handler: (req, reply) => {
        reply.send({
            header: req.headers,
            message: "Hello Fastify"
        })
    },
}
const middleware1 = (req, reply, next) => {
    console.log("Hello From Middleware1");
    console.log(req.headers['sec-ch-ua-platform']);
    // return reply.send("Hello Middleware1")
    next()
}
const middleware2 = (req, reply, next) => {
    console.log("Hello From Middleware2");
    next()
}
export default function indexRoutes(fastify, options, done) {
    fastify.get("/", {preHandler: [middleware1, middleware2]} ,async (req, reply) => {
        reply.send({
            users,
            message: "Hello Fastify",
        })
    })
    done()
}