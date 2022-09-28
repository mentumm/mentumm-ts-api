import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('tags', function (table) {
    table.enum('category', ['Professional', 'Leadership', 'Personal'], { useNative: true, enumName: "tag_category" });
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('tags', function (table) {
    table.dropColumn('category');
  })
}

