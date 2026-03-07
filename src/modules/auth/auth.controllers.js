import * as AuthServices from "./auth.services.js";
import { createRefreshToken, createAccessToken } from "../../configs/tokens.config.js";
import { get as getUser } from "../users/user.services.js";

export const logOut = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expires: new Date(0),
    };

    res.cookie("f_access_token", "", options);
    res.cookie("f_refresh_token", "", options);

    res.status(200).send();
}

export const authed = async (req, res) => {
    const data = await getUser(req.user);
    res.status(200).json({ data });
}

export const auth = async (req, res) => {
    try {

        const { identifier, password, remember } = req.body;

        const user = await AuthServices.auth(identifier, password);

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id, remember);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        };

        res.cookie("f_access_token", accessToken, {
            ...cookieOptions,
            maxAge: 30 * 60 * 1000,
        });

        res.cookie("f_refresh_token", refreshToken, {
            ...cookieOptions,
            maxAge: remember
                ? 24 * 60 * 60 * 1000   // 1 day
                : 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        user.lastLogin = Date.now();
        user.save()

        res.status(200).json({ message: "Successfully logged in" });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            detail: error.message
        });
    }
};
