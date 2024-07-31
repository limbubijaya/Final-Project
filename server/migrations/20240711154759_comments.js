/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', (table) => {
        table.integer("post_id").unsigned().notNullable();
        table.foreign("post_id").references("post.id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("local_user.id");
        table.string("comment", 255).notNullable();
        table.primary(['user_id', 'post_id']);
        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return (knex.schema.dropTableIfExists('comments'));
};