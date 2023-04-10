import {
    User,
    UserDetail
} from "../model/user.model.js"
export const changeProfileHandler = async (req, reply) => {
    const body = {
        ...req.body
    };
    const userDetail = await UserDetail.findOne({
        where: {
            UserId: +req.user.id
        }
    });
    if (userDetail) {
        for (const key in body) {
            if (body[key]) {
                // if(!isNaN(+body[key])) body[key] = +body[key]
                userDetail.setDataValue(key, body[key]);
            }
        }
        console.log(body);
        await userDetail.save()
    }else{
        Object.assign(body, {UserId: req.user.id})
        const newUserDetail = await UserDetail.create(body);
        await newUserDetail.save();
    }
    return reply.status(200).send({
        message: "updated user profile successfully"
    })
}

export const getProfileHandler = async (req, reply) => {

    const user = await User.findOne({
        where: {
            id: req.user.id
        },
        include: [{
            model: UserDetail,
            as: "UserDetail",
            attributes: ['id', 'address', 'latitudes', 'longitudes']
        }, ]
    })
    return reply.status(200).send({
        statusCode: 200,
        user
    })
}