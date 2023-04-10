import {
    Category
} from "../model/category.model.js";

async function findOneCategory(id, reply) {
    const category = await Category.findOne({
        where: {
            id
        }
    });
    if (!category) return reply.status(404).send({
        message: "category not found"
    });
    return category
}
export const createNewCategory = async (req, reply) => {
    const {
        name,
        ParentId
    } = req.body;
    const category = await Category.findOne({
        where: {
            name
        }
    });
    if (category) {
        return reply.status(400).send({
            message: "category name already exist "
        });
    }
    const newCategory = await Category.create({
        name, ParentId
    });
    await newCategory.save();
    reply.send({
        message: "created Category successfully"
    })
}
export const updateCategory = async (req, reply) => {
    const {
        id
    } = req.params;
    const {
        name
    } = req.body;
    console.log(req.body, req.params);
    const category = await findOneCategory(id, reply);
    category.setDataValue("name", name)
    await category.save();
    reply.send({
        category
    })
}
export const getAllCategories = async (req, reply) => {
    const categories = await Category.findAll({
        include: [
            {
                model: Category,
                as: "Children",
            }
        ],
        where: {
            ParentId: null
        }
    });

    reply.status(200).send({
        categories
    })
}
export const getOneCategory = async (req, reply) => {
    const {
        id
    } = req.params;
    const category = await findOneCategory(id, reply)
    reply.status(200).send({
        category
    })
}

export const removeCategory = async (req, reply) => {
    const {id} = req.params;
    const category = await findOneCategory(id, reply)
    await category.destroy();
    reply.send({message: `deleted category successfully`})
}