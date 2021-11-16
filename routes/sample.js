//const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

const { Pool } = require('pg')
const connectionString = 'postgresql://postgres:123456@localhost:5432/suzhou'
const pool = new Pool({
    connectionString,
})


    const offset = helper.getOffset(2, config.listPerPage);
    console.log(offset)
    //const myDb = new db();
    pool.query(
        'SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2',
        [offset, config.listPerPage] ,(error, results) => {
            if (error) {
              throw error
            }
            const data = helper.emptyOrRows(results.rows);
            const meta = { page:1 };
            console.log(data,meta)
          }
    );
    //console.log(rows)
    //const data = helper.emptyOrRows(rows);
    //const meta = { page:1 };
    
    //console.log(data,meta)

