import { createNewCategory, getAllCategories, getOneCategory, removeCategory, updateCategory } from "../handler/category.handler.js";
import { GetUserMiddleware } from "../utils/get-user.js";
const addCategoryRoute = {
    schema: {
        tags: ['Category'],
        summary: "add category",
        security: [{apiKey: []}],
        body: {
            type: "object",
            properties: {
                name: {
                    type: "string"
                },
                ParentId: {
                    type: "integer"
                }
            },
        },
        response: {
            201: {
                type: "object"
            }
        }
    },
    handler: createNewCategory,
    preHandler: [GetUserMiddleware],

}
const updateCategoryRoute = {
    schema: {
        tags: ['Category'],
        summary: "change category",
        security: [{apiKey: []}],
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                }
            }
        },
        body: {
            type: "object",
            properties: {
                name: {
                    type: "string"
                }
            },
        },
        response: {
            201: {
                type: "object"
            }
        }
    },
    handler: updateCategory,
    preHandler: [GetUserMiddleware],

}
const getAllCategoryRoute = {
    schema: {
        tags: ['Category'],
        summary: "get categories",
        security: [{apiKey: []}],
        response: {
            199: {
                type: "object"
            }
        }
    },
    handler: getAllCategories,
    preHandler: [GetUserMiddleware]
}
const getOneCategoryRoute = {
    schema: {
        tags: ['Category'],
        summary: "get one category",
        security: [{apiKey: []}],
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                }
            }
        },
        response: {
            199: {
                type: "object"
            }
        }
    },
    handler: getOneCategory,
    preHandler: [GetUserMiddleware]
}
const removeOneCategoryRoute = {
    schema: {
        tags: ['Category'],
        summary: "remove one category",
        security: [{apiKey: []}],
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                }
            }
        },
        response: {
            199: {
                type: "object"
            }
        }
    },
    handler: removeCategory,
    preHandler: [GetUserMiddleware]
}
export default function categoryRouters(fastify, options, done) {
    fastify.post("/add", addCategoryRoute)
    fastify.patch("/update/:id", updateCategoryRoute)
    fastify.get("/list", getAllCategoryRoute)
    fastify.get("/:id", getOneCategoryRoute)
    fastify.delete("/:id", removeOneCategoryRoute)
    done()
}