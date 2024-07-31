/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('likes', (table) => {
        table.increments('id').primary();
        table.integer("post_id").unsigned().notNullable();
        table.foreign("post_id").references("post.id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("local_user.id");
        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return (knex.schema.dropTableIfExists('likes'));
};
