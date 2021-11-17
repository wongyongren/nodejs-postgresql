const express = require('express');
const db = require('../services/db');
const router = express.Router();
const helper = require('../helper');
//const quotes = require('../services/quotes');
const config = require('../config');

/* GET quotes listing. */
router.get('/', async function (req, res, next) {
  try {
    const meta = req.query.page;
    const myDb = new db();
    //console.log(req.query)
    myDb.query(req.query, result => {
      res.json({ result, meta })
      res.status(200);
      //console.log(result.rows)

    });
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

router.get('/acknowledgement_getAll', (req, res) => {
  try {
    const myDb = new db();
    var sql = "acknowledgement_getall"
    //console.log(req.query)
    myDb.acknowledgement(req.query, sql, (status, result) => {
      //console.log(status)
      if (status == "OK") {
        res.json(result.rows);
        res.status(200);
      } else {
        res.status(404);
      }
    });
  } catch (e) {
    console.log(dateFormat + " " + "DB NOT CONNECTED");
    console.log(e)
  }
})


router.post('/acknowledgement_getAll', (req, res) => {
  try {
    const myDb = new db();
    var sql = "acknowledgement_getall"
    //console.log(req.body)
    myDb.acknowledgement(req.body, sql, (status, result) => {
      if (status == "OK") {
        res.send(result.rows).status(200);
      } else {
        res.status(404);
      }
    });
    // var sql = "SELECT * FROM acknowledgement_getall('" + JSON.stringify(req.body) + "'::jsonb);"
    // pool.query(sql)

    //     .then(users => { res.status(200).send(users.rows) })
    //     .catch(err => res.status(400).send(err))
  } catch (e) {
    console.log(dateFormat + " " + "DB NOT CONNECTED");
    console.log(e)
  }
})

module.exports = router;

//   try {
//     res.json(await quotes.getMultiple(req.query.page));
//     //console.log(req.query.page)
//   } catch (err) {
//     console.error(`Error while getting quotes `, err.message);
//     next(err);
//   }
// });

