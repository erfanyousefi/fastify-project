export const fastifySwaggerConfig = {
    swagger: {
        info: {
            title: "fastify Swagger",
            description: "swagger: documentation of my application",
            version: "0.1.0"
        },
        tags: [
            {name: "authentication", description: "all access"},
            {name: "user", description: "user can read & write (profile)"},
            {name: "Category", description: "admin can read & write and all roles can read (categories)"},
            {name: "products", description: "admin can write and user can read (products)"},
        ],
        schemes: ['http'],
        consumes: ['application/json', 'application/x-www-urlencoded'],
        securityDefinitions: {
            apiKey: {
                type: "apiKey",
                in: "header",
                name: "authorization"
            }
        }

    },
}

export const fastifySwaggerUiConfig = {
    prefix: "swagger",
    exposeRoute: true,
}