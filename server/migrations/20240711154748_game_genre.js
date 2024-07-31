/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('game_genre', (table) => {
        table.increments();
        table.integer("game_id").unsigned().notNullable();
        table.foreign("game_id").references("game.id");
        table.integer("genre_id").unsigned().notNullable();
        table.foreign("genre_id").references("genre.id");
        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return (knex.schema.dropTableIfExists('game_genre'));
};
