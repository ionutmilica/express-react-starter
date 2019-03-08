exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.bigIncrements('id')
      .unsigned()
      .primary();

    t.string('email').unique();

    t.dateTime('created_at').notNullable();
    t.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
