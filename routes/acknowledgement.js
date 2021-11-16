const express = require('express');
const router = express.Router();
var db = require('../services/db');
let todayDate = new Date();
let dateFormat = todayDate.toLocaleString();
const {
    Pool, Client
} = require('pg')
const config = require('../config');
this.connectionString = config.db;
const pool = new Pool({
    connectionString: this.connectionString
})
//console.log("2")
// pool.query('SELECT NOW()', (err, result) => {
//     if (err) {
//       return next(err)
//     }
//     console.log(result.rows[0])
//   })
router.get('/:id', function(req, res, next) {
    console.log("1")
    //const myDb = new db();
    
    pool.query('SELECT * FROM acknowledgement WHERE id = $1', [req.params.id], (err, result) => {
        console.log("2")
        if (err) {
          return next(err)
        }
        res.send(result.rows[0])
      })
  });

// router.post('/acknowledgement_getAll', (req, res) => {
//     try {
//         console.log("1")
//         const myDb = new db();
//         var sql = "acknowledgement_getall"
//         console.log("2")
//         myDb.acknowledgement(req.body, sql, res, (status, result) => {
//             console.log("3")
//             if (status == "OK") {
//                 res.send(result.rows);
//             } else {
//                 res.status(404);
//             }
//         });
//         // var sql = "SELECT * FROM acknowledgement_getall('" + JSON.stringify(req.body) + "'::jsonb);"
//         // pool.query(sql)

//         //     .then(users => { res.status(200).send(users.rows) })
//         //     .catch(err => res.status(400).send(err))
//     } catch (e) {
//         console.log(dateFormat + " " + "DB NOT CONNECTED");
//         console.log(e)
//     }
// });
module.exports = router;