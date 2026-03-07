import bcrypt from "bcrypt";
import UserModel from "../users/user.models.js";


export const auth = async (identifier, password) => {
    const user = await UserModel.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    }).select('+password');

    if (!user) {
        const error = new Error(`${identifier} not found`);
        error.statusCode = 404;
        throw error;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        const error = new Error("Incorrect password");
        error.statusCode = 401;
        throw error;
    }

    return user;
};
