import Knex from 'knex';

export async function up(knex: Knex) {
    // CRIAR TABELA
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points'); // TODO POINT_ID VAI CRIAR UMA CHAVE ESTRANGEIRA QUE DEVE TER UM ID VÁLIDO DENTRO DA TABELA POINTS

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items'); // TODO ITEM_ID VAI CRIAR UMA CHAVE ESTRANGEIRA QUE DEVE TER UM ID VÁLIDO DENTRO DA TABELA ITEMS
    });
}
export async function down(knex: Knex) {
    // REMOVE A TABELA
    return knex.schema.dropTable('point_items');
}