const knex = require("../../config/db");

exports.addFavourite = async (req, res) => {
    try {
        const { templateId } = req.params;
        const userId = req.user.userId; 
        
        const template = await knex("templates").where({ id: templateId }).first();
        if (!template) {
            return res.status(404).json({ message: "Template not found" });
        }
        
        const exists = await knex("favorites").where({ 
            template_id: templateId, 
            user_id: userId 
        }).first();

        if (exists) {
            return res.status(400).json({ message: "Already in favorites!" });
        }

        await knex("favorites").insert({ 
            template_id: templateId, 
            user_id: userId 
        });
        
        res.json({ message: "Added to favorites!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getFavourites = async (req, res) => {
    try {
        const favorites = await knex("favorites")
            .join("templates", "favorites.template_id", "templates.id")
            .where("favorites.user_id", req.user.userId)
            .select("templates.*");

        res.json(favorites);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

