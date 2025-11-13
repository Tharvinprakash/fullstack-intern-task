const knex = require("../../config/db");

exports.getAllTemplates = async (req, res) => {
    try {
        const templates = await knex("templates").select("*");
        res.json(templates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTemplateById = async (req, res) => {
    try {
        const template = await knex("templates").where({ id: req.params.id }).first();
        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }
        res.json(template);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getTemplatesByCategory = async (req, res) => {
    try {
        const { name } = req.params;
        const templates = await knex("templates").where({ category: name });
        if (templates.length === 0) {
            return res.status(404).json({ message: "No templates found in this category" });
        }
        res.json(templates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

