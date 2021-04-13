const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/controller');
var jwt = require('jsonwebtoken');
var Userdb = require('../model/model');
var User = require('../model/log');

const accessTokenSecret = 'youraccesstokensecret';


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}



function checktoken(req, res, next) {
  var accessToken = localStorage.getItem('mytoken');

  try {


    jwt.verify(accessToken, "youraccesstokensecret")
  } catch (err) {


    res.render('login');
  }
  next();
}









route.get('/login/', function (req, res) {

  res.render('login');
})

route.post('/loggg/', (req, res) => {
  var password = req.body.password;
  var email = req.body.email;
  User.findOne({ email: req.body.email }, function (err, result) {

    if (result !== null && (result.password === password)) {

      localStorage.setItem('email', req.body.email);
      localStorage.setItem('password', req.body.password);

      const accessToken = jwt.sign({ foo: "bar" }, "youraccesstokensecret");
      localStorage.setItem('mytoken', accessToken);

      res.redirect('/');

    }
    else {


      res.redirect('/')
    }

  });




})




route.get('/', checktoken, function (req, res, next) {
  var pas = localStorage.getItem('password');
  var em = localStorage.getItem('email');


  var item_list = Userdb.find({ email: em, password: pas });

  item_list.exec(function (err, data) {
    if (err) throw err;
    res.render('index', { users: data });
  })
});




route.get('/signup/', (req, res) => {
  res.render('signup');
})




route.post('/signupd/', (req, res) => {
  var password = req.body.password;
  var email = req.body.email;

  var Userlogin = new User({
    password: req.body.password,
    email: req.body.email
  })

  User.findOne({ email: req.body.email }, function (err, result) {

    if (result === null) {
      Userlogin.save((error, itemss) => {

        localStorage.setItem('email', req.body.email);
        localStorage.setItem('password', req.body.password);
        const accessToken = jwt.sign({ foo: "bar" }, "youraccesstokensecret");
        localStorage.setItem('mytoken', accessToken);
        res.redirect('/');

      });
    }
    else {


      res.redirect('/login/')

    }

  })
})




route.get('/add-user', services.add_user)



route.post('/api/users', controller.create);




route.get('/api/users', controller.find);





route.get("/update-user/:id", (req, res) => {
  var id = req.params.id;

  var edit = Userdb.findById(id);
  edit.exec((err, data) => {
    if (err) throw err
    res.render('update_user', { rec: data });
  })
})






route.post('/edited/', function (req, res) {
  var id = req.body.id;

  Userdb.findByIdAndUpdate(id, {
    gender: req.body.gender
  }, (err) => {
    if (err) throw err
    res.redirect('/');
  })

});





route.get('/delete/:id', (req, res) => {

  var id = req.params.id;

  var del = Userdb.findByIdAndDelete(id, (err) => {

    del.exec(function (err) {
      res.redirect('/');
    })


  });
});




route.get('/logout/', (req, res) => {
  localStorage.removeItem('mytoken');
  localStorage.removeItem('email');
  localStorage.removeItem('password');
  res.redirect('/');
})

module.exports = route