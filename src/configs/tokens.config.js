import jwt from "jsonwebtoken";
const jwtSecrete = process.env.JWT_SECRET
const refreshJwtSecrete = process.env.JWT_REFRESH_SECRET

export const createRefreshToken = (userId, username, role, remember) => {
    return jwt.sign(
        { user: { _id: userId, username: username, role: role } },
        refreshJwtSecrete,
        { expiresIn: remember ? "1d" : "30d" }
    );
}

export const createAccessToken = (userId, username, role) => {
    return jwt.sign(
        { user: { _id: userId, username: username, role: role } },
        jwtSecrete,
        { expiresIn: "30m" }
    );
}
