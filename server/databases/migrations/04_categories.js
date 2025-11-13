const knex = require("../../config/db");

exports.up = async(knex) => {
    await knex.schema.createTable("categories",(table) => {
        table.increments("id").primary();
        table.string("category_type");
        table.integer("template_id").references("id").inTable("templates");
    });
}

exports.down = async(knex) => {
    await knex.schema.dropTableIfExists("categories");
}



