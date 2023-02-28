import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  await connection.query(`truncate migrations`)
  await connection.query(`drop table users`)
  await connection.query(`drop table block_reasons`)
  await connection.query(`drop table user_groups`)
  await connection.query(`drop table cidades`)
  await connection.query(`drop table estados`)
  await connection.query(`drop table user_tokens`)
  await connection.query(`drop table menu_options`)
  await connection.query(`drop table modules`)
  await connection.query(`drop table navigation`)
  await connection.query(`drop table profile_options`)
  await connection.query(`drop table users_profiles`)
  await connection.query(`drop table profiles`)
  await connection.query(`drop table users`)
  await connection.query(`drop table block_reasons`)
  await connection.query(`drop table user_groups`)

  await connection.close()
}

create().then(() => console.log('Tabelas deletadas!'))
