/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('message', (table) => {
        table.increments();
        table.integer("sender_user_id").unsigned().notNullable();
        table.foreign("sender_user_id").references("local_user.id");
        table.integer("receiver_user_id").unsigned().notNullable();
        table.foreign("receiver_user_id").references("local_user.id");
        table.string("message_file_link", 255).notNullable();
        table.timestamps(false, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('message');
};
