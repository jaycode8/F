import express from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import { engine } from "express-handlebars";
import { helpers } from "./configs/helpers.config.js";
import morgan from "morgan";
import "./configs/db.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import UserRoutes from "./modules/users/user.routes.js";
import AuthRoutes from "./modules/auth/auth.routes.js";
import FileRoutes from "./modules/files/file.routers.js";

const app = express();

app.use(morgan('dev'));
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [
        path.join(__dirname, 'views/partials'),
        path.join(__dirname, 'views/sections'),
    ],
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: helpers
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// app.use("/", CoreRoutes);
app.use("/users", UserRoutes);
app.use("/auth", AuthRoutes);
app.use("/files", FileRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "file flow v2",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
})

export default app;
