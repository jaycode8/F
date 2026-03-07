import jwt from "jsonwebtoken";
const jwtSecrete = process.env.JWT_SECRET
const refreshJwtSecrete = process.env.JWT_REFRESH_SECRET

export const createRefreshToken = (userId, remember) => {
    return jwt.sign(
        { user: userId },
        refreshJwtSecrete,
        { expiresIn: remember ? "1d" : "30d" }
    );
}

export const createAccessToken = (userId) => {
    return jwt.sign(
        { user: userId },
        jwtSecrete,
        { expiresIn: "30m" }
    );
}
