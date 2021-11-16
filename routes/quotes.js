const express = require('express');
const db = require('../services/db');
const router = express.Router();
const helper = require('../helper');
//const quotes = require('../services/quotes');
const config = require('../config');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
try {
  const page = req.query.page
  const offset = helper.getOffset(req.query.page, config.listPerPage);
  console.log(offset)
  //const myDb = new db();
  db.query(
      'SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2',
      [offset, config.listPerPage] ,(error, results) => {
          if (error) {
            throw error
          }
          const data = helper.emptyOrRows(results.rows);
          const meta = {page};
          res.json({data,meta}) 
        }
  );  
} catch (err) {
  console.error(`Error while getting quotes `, err.message);
  next(err);
}
});
module.exports = router;

//   try {
//     res.json(await quotes.getMultiple(req.query.page));
//     //console.log(req.query.page)
//   } catch (err) {
//     console.error(`Error while getting quotes `, err.message);
//     next(err);
//   }
// });

