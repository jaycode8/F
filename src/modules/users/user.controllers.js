import * as UserServices from "./user.services.js";


export const destroy = async (req, res) => {
    try {
        await UserServices.destroy(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const data = await UserServices.update(req.params.id, req.body);
        res.status(200).json({ data, message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

export const get = async (req, res) => {
    try {
        const data = await UserServices.get(req.params.id);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

export const list = async (req, res) => {
    try {
        const { page, limit, ...filters } = req.query;
        const data = await UserServices.list(page, limit, filters);
        //res.status(200).json({ data });
        res.render('users', {
            title: 'Users',
            userData: data,
            // currentSearch: search || null,
        });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

export const add = async (req, res) => {
    try {
        const data = await UserServices.add(req.body);

        res.status(201).json({ data, message: "User successfully created" });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};
