const knex = require("../../config/db");


exports.up = async (knex) => {
  await knex.schema.createTable("templates", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.string("thumbnail_url");
    table.string("category").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async(knex) =>{
  await knex.schema.dropTableIfExists("templates");
}

