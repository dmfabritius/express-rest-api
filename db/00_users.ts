import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) {
    return knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
      table.increments('user_id').primary();
      table.string('email').notNullable().unique();
      table.string('name').notNullable();
      table.string('hash').notNullable();
      table.timestamps(true, true);
    });
  }
}

export async function seed(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('users')) {
    await knex('users').del();
    return knex('users').insert([
      {
        email: 'alice@ipsum.lorem',
        hash: '$2b$12$ureF2kavavekTjbvRLjAUOW354YwyXhsxnNgYjdVgAK62aRFl9Dei', // password: pass
        name: 'Alice Ipsum',
      },
      {
        email: 'bob@ipsum.lorem',
        hash: '$2b$12$fp0.ULQYcBHa1r5W9RdgOu4j7ZItrBgYWDgoDhbYUWUuO4z8IeweC', // password: pass
        name: 'Bob Lorem',
      },
      {
        email: 'charlie@ipsum.lorem',
        hash: '$2b$12$TGiG3mht3QPC9vxjw9Rx3.Yejd96TiW3goEzAcDYl2cLSCyMjJXa2', // password: pass
        name: 'Charlie Dolor',
      },
    ]);
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
