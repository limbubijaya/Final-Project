/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('local_user', (table) => {
        table.increments();
        table.string("email", 80).unique().notNullable();
        table.string("password", 255).notNullable();
        table.string("display_name", 16).unique().nullable();
        table.string("profile_pic", 255);
        table.string("bio", 255);
        table.boolean("is_linked_to_google").notNullable();
        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('local_user');
};

