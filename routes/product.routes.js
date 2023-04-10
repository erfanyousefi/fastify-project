import {
    getAllProducts,
    getOneProduct
} from "../handler/product.handler.js"
import {
    GetUserMiddleware
} from "../utils/get-user.js"

const Product = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        name: {
            type: 'string'
        }
    }
}
const getOneProductItem = {
    schema: {
        tags: ['products'],
        security: [{
            apiKey: []
        }],
        summary: "some description about route",
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    description: "the id of product"
                }
            },
        },
        response: {
            200: Product
        }
    },
    handler: getOneProduct,
    preHandler: [GetUserMiddleware]
}
const getProductsItem = {
    schema: {
        tags: ['products'],
        security: [{
            apiKey: []
        }],
        response: {
            200: {
                type: "object",
                properties: {
                    products: {
                        type: 'array',
                        items: Product
                    },
                    user: {
                        type: "object",
                        properties: {
                            id: {type: "integer"},
                            first_name: {type: "string"},
                            last_name: {type: "string"},
                            username: {type: "string"},
                            accessToken: {type: "string"},
                        }
                    }
                }
            }
        }
    },
    handler: getAllProducts,
    preHandler: [GetUserMiddleware]
}

export default function productRoutes(fastify, options, done) {
    //get one product
    // fastify.addHook("onRequest", (request) => request.jwtVerify())
    fastify.get("/", getProductsItem)
    //get all products
    fastify.get("/:id", getOneProductItem)
    done()
}