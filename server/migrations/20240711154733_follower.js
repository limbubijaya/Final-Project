/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('follower', (table) => {
        table.increments();
        table.integer("being_followed_user_id").unsigned().notNullable();
        table.foreign("being_followed_user_id").references("local_user.id");
        table.integer("the_follower_user_id").unsigned().notNullable();
        table.foreign("the_follower_user_id").references("local_user.id");
        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return (knex.schema.dropTableIfExists('follower'));
};
