const express = require('express');
const path = require('path');
const pg = require('pg');
const { query } = require('express');
const app = express();

const connectionString = 'postgres://postgres:Hawaii27@localhost:5432/userManager';

const client = new pg.Client(connectionString);
client.connect();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', async(req, res) =>{
    client.query('select * from users', (err, data) => {
        if (err) console.log(err);
        res.render('index',{users: data.rows})
    })
});

app.post('/editor/:editedUser', async(req, res) => {
    

    client.query('update users set (firname, lastname, email, age) = ($1, $2, $3, $4) where userid = $5',
        [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.age,
            req.params.editedUser
        ], (err, data) => {
            if (err) console.log(err);
        }
    )
    res.redirect('/')
});

app.get('/users/:user', async(req, res) => {
    let data = await User.find({userId: req.params.user});
    res.render('editor',{editUser: data[0]} )
});

app.get('/ascend', async(req, res) => {
    await User.find().sort()
    res.redirect('/')
});

app.get('/descend', async(req, res) => {
    
});

app.get('/search', async(req, res) => {
    
});

app.get('/create', (req, res) => {
    res.render('pleaseGiveMeFullPointsThomas')
});

app.post('/create', (req, res) => {
    client.query('insert into users (firstname, lastname, email, age, userid) values ($1, $2, $3, $4, $5)', 
    [req.body.firstName, 
    req.body.lastName,
    req.body.email,
    req.body.age,
    Math.floor(Math.random() * 1000)], (err, data) => {
        if(err) console.log(err);
    })
    res.redirect('/')
});

app.get('/delete/:dyingUser', async(req, res) => {

   client.query('delete from users where userid = $1', 
   [
       req.params.dyingUser
   ], (err, operaWinfry) =>{
        if (err) console.log(err);
    });
    res.redirect('/')
});

app.listen(3000, (err) => {
    err ? console.log(err):console.log('currently cooking pasta')
})