import express, { Express, Request, Response } from 'express';
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app : Express = express();
const port = 8080;

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Iwahara?11',
    database : 'todoApp'
});

app.set( `view engine`, `ejs` );

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get( `/`, ( req: Request, res: Response ) => 
{
    connection.connect( ( err: Error) => {
    if (err) {
        console.log( 'error connecting: ' + err.stack );
        return
    }
        console.log('success');
    });
    connection.query(
        `SELECT * FROM tasks;`,
    ( error: Error, result: [] ) => {
        console.log(result);
        res.render( 'index', {
            title : 'ToDo App',
            todos : result,
        });
    });
});

app.post( `/`, function( req: Request, res: Response )
{
    const todo = req.body.add;
    connection.query(
        `INSERT INTO tasks ( content ) values ('${todo}');`,
    ( error: Error, result: {} ) => {
        console.log(error);
        console.log(result);
    });
    res.redirect( `/` );
})

app.listen( port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});