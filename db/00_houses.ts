import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('houses'))) {
    return knex.schema.createTable('houses', (table: Knex.CreateTableBuilder) => {
      table.increments('house_id').primary();
      table.string('description').notNullable();
      table.integer('bedrooms').defaultTo(1);
      table.float('bathrooms').defaultTo(1);
      table.string('address');
      table.string('city');
      table.string('state');
      table.string('zip');
      table.float('latitude');
      table.float('longitude');
      table.timestamps(true, true);
    });
  }
}

export async function seed(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('houses')) {
    await knex('houses').del();
    return knex('houses').insert([
      {
        description: 'tiny house',
      },
      {
        address: '123 Main Street',
        bathrooms: 2,
        bedrooms: 3,
        city: 'Edmonds',
        description: '1950s rambler',
        state: 'WA',
        zip: '98026',
      },
      {
        bathrooms: 1.5,
        bedrooms: 2,
        description: 'downtown condo',
      },
    ]);
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('houses');
}
