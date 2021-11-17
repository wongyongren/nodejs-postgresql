const {
    Pool, Client
} = require('pg')
const config = require('../config')
const helper = require('../helper');
// const { Pool } = require('pg')
const connectionString = 'postgresql://postgres:123456@localhost:5432/suzhou'
// const pool = new Pool({
//     connectionString,
// })
// /**
//  * Query the database using the pool
//  * @param {*} query 
//  * @param {*} params 
//  * 
//  * @see https://node-postgres.com/features/pooling#single-query
//  */

// function query(query, params) {
//     const {rows, fields} = pool.query(query, params);

//     return rows;
// }

class DB{
    constructor() {
        this.connectionString = config.db.connectionString;
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
    query(ack_json, rtn) {
        const offset = helper.getOffset(ack_json.page, config.listPerPage);
        const listPerPage = config.listPerPage
        if (ack_json == "") {
            var sql_query = "SELECT id, quote, author FROM quote ;"
        } else {
            var sql_query = "SELECT id, quote, author FROM quote OFFSET "+ offset +" LIMIT "+ listPerPage+" ;"        
        }
        this.pool.connect((err, client, done) => {
            //console.log(sql_query)
            if (err) throw err;
            client.query(sql_query, (err, result) => {
                done()
                if (err) {
                    console.log(err)
                }
                //result = result.rows , meta
                //console.log(result)
                rtn(result.rows);
            })
        })
    }
    acknowledgement(ack_json, sql, rtn) {
        try {
            var status;
            //console.log(ack_json)
            if (ack_json == "") {
                var sql_query = "select * from " + sql + "();"
            } else {
                var sql_query = "SELECT * FROM " + sql + " ('" + JSON.stringify(ack_json) + "'::jsonb);"
            }
            console.log(ack_json,sql_query)
            this.pool.connect((err, client, done) => {
                if (err) throw err;
                client.query(sql_query, (err, result) => {
                    done()
                    if (err) {
                        console.log(err)
                        status = "Error"
                    }
                    //res.send(result.rows);
                    status = "OK";

                    rtn( status , result);
                })
            })
        } catch (ex) {
            console.log(ex);
        }
    }
}
module.exports = DB;