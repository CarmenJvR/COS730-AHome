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

/////////////////////////////////////////////////////////////////////////////////////////////////
////    Project API
/////////////////////////////////////////////////////////////////////////////////////////////////


//API: Get Project List

router.post('/projectList', async (req, res) => {
  try {
    const client = await pool.connect();

    const valuesR1 = [req.body.ac]

    client.query('SELECT * FROM project WHERE account_id = $1', valuesR1 ,(error, results) => {
      if (error) {
       throw error
      }
      
        const respond = { 'results': (results) ? results.rows : null};
        res.send(JSON.stringify(respond));
      })
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

//API: Create Project
router.post('/createProject', async (req, res) => {
  try {
    const client = await pool.connect();

    //request variables
      const values = [req.body.ac, req.body.name, req.body.sd, req.body.ed, req.body.budget]

        //Email Not Used: Create Account
        client.query('INSERT INTO project (account_id, name, start_date, end_date, budget_total) VALUES ($1, $2, $3, $4, $5)', values ,(error, results) => {
          if (error) {
           //throw error
           res.status(404).send( JSON.stringify({error: 'Could Not Create Project'})  )
          }
    
            var respond = { message : 'Project successfully created'};
            res.status(201).send( JSON.stringify(respond))
          })
      
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}); 


/////////////////////////////////////////////////////////////////////////////////////////////////
////    TASK API
/////////////////////////////////////////////////////////////////////////////////////////////////

//API: Create Task
router.post('/createTask', async (req, res) => {
  try {
    const client = await pool.connect();

    //request variables
      const values = [req.body.pid, req.body.desc, req.body.priority ]

        //Email Not Used: Create Task
        client.query('INSERT INTO task (project_id, description , priority ) VALUES ($1, $2, $3 )', values ,(error, results) => {
          if (error) {
           //throw error
           res.status(404).send( JSON.stringify({error: 'Could Not Create Task'})  )
          }
    
            var respond = { message : 'Task successfully created'};
            res.status(201).send( JSON.stringify(respond))
          })
      
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}); 

//API: Get Task List

router.post('/taskList', async (req, res) => {
  try {
    const client = await pool.connect();

    const valuesR1 = [req.body.pid]

    client.query('SELECT * FROM task WHERE project_id = $1', valuesR1 ,(error, results) => {
      if (error) {
       throw error
      }
      
        const respond = { 'results': (results) ? results.rows : null};
        res.send(JSON.stringify(respond));
      })
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


//API: Remove Task
router.post('/removeTask', async (req, res) => {
  try {
    const client = await pool.connect();

    //request variables
      const values = [req.body.tid]

        //Email Not Used: Create Task
        client.query('DELETE FROM task WHERE ID=$1', values ,(error, results) => {
          if (error) {
           //throw error
           res.status(404).send( JSON.stringify({error: 'Could Not Close Task'})  )
          }
    
            var respond = { message : 'Task successfully closed'};
            res.status(201).send( JSON.stringify(respond))
          })
      
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////
////    Board API
/////////////////////////////////////////////////////////////////////////////////////////////////

//API: Create Board
router.post('/createBoard', async (req, res) => {
  try {
    const client = await pool.connect();

    //request variables
      const values = [req.body.pid, req.body.name, req.body.image ]

        //Email Not Used: Create Task
        client.query('INSERT INTO board (project_id, name , image ) VALUES ($1, $2, $3 )', values ,(error, results) => {
          if (error) {
           //throw error
           res.status(404).send( JSON.stringify({error: 'Could Not Upload Image'})  )
          }
    
            var respond = { message : 'Image successfully uploaded'};
            res.status(201).send( JSON.stringify(respond))
          })
      
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}); 

//API: Get Board List

router.post('/boardList', async (req, res) => {
  try {
    const client = await pool.connect();

    const valuesR1 = [req.body.pid]

    client.query('SELECT * FROM board WHERE project_id = $1', valuesR1 ,(error, results) => {
      if (error) {
       throw error
      }
      
        const respond = { 'results': (results) ? results.rows : null};
        res.send(JSON.stringify(respond));
      })
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//API: Remove Image
router.post('/removeVisual', async (req, res) => {
  try {
    const client = await pool.connect();

    //request variables
      const values = [req.body.pid]

        //Email Not Used: Create Task
        client.query('DELETE FROM visal WHERE ID=$1', values ,(error, results) => {
          if (error) {
           //throw error
           res.status(404).send( JSON.stringify({error: 'Could Not Remove Image'})  )
          }
    
            var respond = { message : 'Image successfully removed'};
            res.status(201).send( JSON.stringify(respond))
          })
      
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});


module.exports = router

