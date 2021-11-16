const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  //console.log(page)
  const offset = helper.getOffset(page, config.listPerPage);
  //const myDb = new db();
  const rows = await db.query(
    'SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );

  const data = helper.emptyOrRows(rows);
  const meta = {page};
  console.log(data)
  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}