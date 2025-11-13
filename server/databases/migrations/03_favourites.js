const knex = require("../../config/db");


exports.up = async (knex) => {
    await knex.schema.createTable("favorites", (table) => {
        table.increments("id").primary();
        table.integer("user_id")
             .unsigned()
             .notNullable()
             .references("id")
             .inTable("users")
             .onDelete("CASCADE");
        table.integer("template_id")
             .unsigned()
             .notNullable()
             .references("id")
             .inTable("templates")
             .onDelete("CASCADE");
        table.unique(["user_id", "template_id"]);
        table.timestamps(true, true);
    })
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("favorites");
}