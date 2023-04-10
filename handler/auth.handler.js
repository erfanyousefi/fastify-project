import {
    fastify
} from "./../server.js";
import {
    User
} from "../model/user.model.js";

export const registerHandler = async (req, reply) => {
    const {
        username,
        password,
        first_name,
        last_name
    } = req.body;
    const user = await User.findOne({where: {username}})
    if(user) return reply.send("username is already exist")
    const newUser = await User.create({
        first_name,
        last_name,
        username,
        password: await fastify.bcrypt.hash(password)
    });
    await newUser.save()
    reply.send(newUser)
}
export const loginHandler = async (req, reply) => {
    const {
        username,
        password,
    } = req.body;
    const user = await User.findOne({
        where: {
            username
        }
    })
    if (!user) return reply.status(404).send({
        message: "not fount any user"
    });
    console.log(user);
    const compareResult = await fastify.bcrypt.compare(password, user.password);
    if (compareResult) {
        const accessToken = fastify.jwt.sign({
            username
        }, {
            expiresIn: "1d"
        })
        user.setDataValue("accessToken", accessToken);
        await user.save();
        reply.send({
            message: "login successfully",
            accessToken: user.accessToken,
            user
        })
    } else {
        reply.status(401).send({
            message: "username or password is incorrect"
        })
    }
}