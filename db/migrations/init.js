
exports.up = (knex, Promise) => {

  return Promise.all([

    knex.schema.createTable('users', (table) =>  {
      table.increments('id').primary()
      table.string('firstName')
      table.string('lastName')
      table.string('phoneNumber')
      table.string('address')
      table.string('email').unique()
      table.string('password')
      table.timestamps()
    }),

    knex.schema.createTable('services', (table) => {
      table.increments('id').primary()
      table.string('logoUrl')
      table.string('title')
      table.string('description')
    }),

    knex.schema.createTable('agents', (table) => {
      table.increments('id').primary()
      table.string('firstName')
      table.string('lastName')
      table.string('phoneNumber')
      table.string('imageUrl')
      table.json('availability')
      table.string('address')
      table.string('email')
      table.string('role')
      table.string('password')
    }),


    knex.schema.createTable('agent_services', (table) => {
      table.increments('id').primary()
      table.integer('agent_id')
      table.integer('service_id')
    }),

    knex.schema.createTable('appointments', (table) => {
      table.increments('id').primary()
      table.integer('agent_id') //.references('id').inTable('boards')
      table.integer('service_id') //.references('id').inTable('lists')
      table.string('content')
    }),

  ])

}

exports.down = (knex, Promise) => {

  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('services'),
    knex.schema.dropTable('agents'),
    knex.schema.dropTable('agent_services'),
    knex.schema.dropTable('appointments'),
  ])
}
