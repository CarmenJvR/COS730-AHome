var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3000'
const api = apiAdapter(BASE_URL)

// Configuration for PostgreSQL connection
//connect local
/**const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sysadmin',
  host: 'localhost',
  database: 'api',
  password: '1234',
  port: 5433,
}) */

//connect to postgersql heroku
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//test api for connection
router.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM account');
    const results = { 'results': (result) ? result.rows : null};
    res.send(JSON.stringify(results));
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})


// Cryptography Dependencies
const crypto = require('crypto');

/////////////////////////////////////////////////////////////////////////////////////////////////
////    Account API
/////////////////////////////////////////////////////////////////////////////////////////////////

//API: Register New User
router.post('/createAccount', async (req, res) => {
  try {
    const client = await pool.connect();

    //request variables
      const pwd =  req.body.password;
      let hash = crypto.createHash('sha256').update(pwd).digest('base64');
      var tk = crypto.randomBytes(20).toString('hex') ;
      var today = new Date(new Date().getTime()+(5*24*60*60*1000));
      const values = [req.body.email, hash, tk , today  ]
      const value = [req.body.email]

   client.query('SELECT * FROM account WHERE email=$1', value ,(error, results) => {
    if (error) {
     throw error
    }

    if (results.rows.length > 0){
      //Email Already used: Reject Register
      res.status(200).send( JSON.stringify({message: 'Could Not Register: Email already in use'}) )
    }else{
        //Email Not Used: Create Account
        client.query('INSERT INTO account (email, password, accessToken, expiration) VALUES ($1, $2, $3, $4) RETURNING id', values ,(error, results) => {
          if (error) {
           //throw error
           res.status(404).send( JSON.stringify({message: 'Could Not Register: Could not Insert new user'})  )
          }
    
            var respond = { accessToken: tk  , ac: results.rows[0].id};
            res.status(201).send( JSON.stringify(respond))
          })
      }
    })


    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

//API: Log In User
router.post('/loginAccount', async (req, res) => {
  try {
    const client = await pool.connect();

    //request variables
      const pwd =  req.body.password;
      let hash = crypto.createHash('sha256').update(pwd).digest('base64');
      var today = new Date(new Date().getTime()+(5*24*60*60*1000));
      var tk = crypto.randomBytes(20).toString('hex') ;
      const valuesR1 = [req.body.email, hash ]
      const valuesR2 = [ tk , today,req.body.email ]

      client.query('SELECT * FROM account WHERE email = $1 AND password = $2', valuesR1, (error, results) => {
        if (error) {
         // throw error
         var resObj1 = {message: 'Could Not Login'};
         res.status(200).send(JSON.stringify(resObj1)) ;
        }
  
        if (results.rows.length == 0){
          var resObj = {message: 'Could Not Login: Invalid login credentials'};
          res.status(200).send(JSON.stringify(resObj)) ;
        }else{
          const uAC = results.rows[0].id;

          client.query('UPDATE account SET accessToken = $1 , expiration = $2 WHERE email = $3', valuesR2,
              (error, results) => {
              if (error) {
                  throw error
              }
                var respond = { accessToken: tk, ac: uAC };
                res.status(201).send( JSON.stringify(respond))
              }
          )
        }
      })

    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})


module.exports = router

