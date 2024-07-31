/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('post', (table) => {
        table.increments('id').primary();
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("local_user.id");
        table.integer("game_id").unsigned().notNullable();
        table.foreign("game_id").references("game.id");
        table.string("description", 255).notNullable();
        table.string("media", 255).notNullable();
        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return (knex.schema.dropTableIfExists('post'));
};
