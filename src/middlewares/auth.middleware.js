import jwt from "jsonwebtoken";


const refreshToken = async (req, res, next) => {
    const refreshToken = req.cookies?.f_refresh_token;

    if (!refreshToken) {
        return res.status(403).send();
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newAccessToken = jwt.sign(
            { user: payload.user },
            process.env.JWT_SECRET,
            { expiresIn: "3m" }
        );

        res.cookie("f_access_token", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 30 * 60 * 1000,
        });

        req.user = payload.user;

        return next();
    } catch (error) {
        res.status(403).send();
    }
}

export const requireAuth = async (req, res, next) => {
    const accessToken = req.cookies?.f_access_token;

    if (!accessToken) return refreshToken(req, res, next);

    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = payload.user;

        return next();
    } catch (error) {
        return refreshToken(req, res, next);
    }
}

export const redirectIfAuth = async (req, res, next) => {
    const accessToken = req.cookies?.f_access_token;

    if (!accessToken) return refreshToken(req, res, next);

    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = payload.user;

        return res.redirect("/")
    } catch (error) {
        return refreshToken(req, res, next);
    }
}

