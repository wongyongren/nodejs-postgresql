const {
    Pool, Client
} = require('pg')
const config = require('../config');
const e = require('express');
//const pool = new Pool(config.db);

// /**
//  * Query the database using the pool
//  * @param {*} query 
//  * @param {*} params 
//  * 
//  * @see https://node-postgres.com/features/pooling#single-query
//  */
class DB{
    constructor() {
        this.connectionString = config.db;
        this.connect();
        //this.alert_file_data;
    }
    connect() {
        try {
            this.pool = new Pool({
                connectionString: this.connectionString
            });

            // cron.schedule('*/30 * * * *', () => {
            // this.mail();
            // setTimeout(() => this.deletemail(), 10000);
            // })

            console.log("db connected");
        } catch (e) {
            console.log(e)
        }
    }
    query(query, params) {
        const {rows, fields} = await pool.query(query, params);
    
        return rows;
    }
    acknowledgement(ack_json, sql, res, rtn) {
        this.pool.query('SELECT * FROM acknowledgement WHERE id = $1', (err, result) => {
            if (err) {
              return next(err)
            }
            res.send(result.rows[0])
          })
        // this.pool.connect((err, client, done) => {
        //     if (err) throw err
        //     client.query('SELECT * FROM acknowledgement', [1], (err, res) => {
        //       done()
        //       if (err) {
        //         console.log(err.stack)
        //       } else {
        //         console.log(res.rows[0])
        //       }
        //     })
        //   })
        // try {
        //     var status;
        //     var ack_json =""
        //     if (ack_json == "") {
        //         var sql_query = "select * from " + sql + "();"
        //     } else {
        //         var sql_query = "SELECT * FROM " + sql + " ('" + JSON.stringify(ack_json) + "'::jsonb);"
        //     }
        //     //console.log(ack_json)
        //     console.log(sql_query)
        //     this.pool.connect((err, client, done) => {
        //         console.log("5")
        //         if (err) throw err;
        //         client.query(sql_query, (err, result) => {
        //             console.log("query")
        //             done()
        //             if (err) {
        //                 console.log("err")
        //                 console.log(err)
        //                 status = "Error"
        //             }
        //             res.send(result.rows);
        //             status = "OK";
        //             console.log("ok")
        //             rtn(res, status ,result);
        //         })
        //     })
        // } catch (ex) {
        //     console.log(ex);
        // }
    }
}
module.exports =  DB