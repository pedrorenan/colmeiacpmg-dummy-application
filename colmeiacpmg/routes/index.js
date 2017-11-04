var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// JavaScript

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
   var db = require("../db");
   var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
   Users.find({}).lean().exec(
      function (e, docs) {
         res.render('userlist', { "userlist": docs });
   });
});
/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
  });

  /* GET Emprestimos page. */
router.get('/emprestimo', function(req, res) {
  res.render('emprestimo', { title: 'Equipamentos' });
  });

  /* POST to Add User Service */
router.post('/addemprestimo', function (req, res) {
  
      var db = require("../db");
      var policial = req.body.policial;
      var equipamento = req.body.equipamento;
      var quantidade = req.body.quantidade;
  
      var Users = db.Mongoose.model('emprestimocolection', db.emprestimoSchema, 'emprestimocolection');
      var user = new Users({ policial: policial, equipamento: equipamento, quantidade: quantidade });
      user.save(function (err) {
          if (err) {
              console.log("Error! " + err.message);
              return err;
          }
          else {
              console.log("Post saved");
              const http = require('http');
              var querystring = require('querystring');
              
              var postData = querystring.stringify({
                $class:"br.com.colmeiacpmg.PollenTransaction",
                asset:"1",
                newValue:"emprestimo"+policial+equipamento+quantidade
              });
             
              var options = {
                host: '192.168.159.128',
                port: 3000,
                path: '/api/br.com.colmeiacpmg.PollenTransaction',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': postData.length
                }
              };
              
              var post_req = http.request(options, function(res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                  console.log('BODY: ' + chunk);
                });
              });
              post_req.write(postData);
              post_req.end();
              res.redirect("emprestimo");
          }
      });
  });


   /* POST to Emprestar Service */
router.post('/adddevolucao', function (req, res) {

    var db = require("../db");
    var policial = req.body.policial;
    var equipamento = req.body.equipamento;
    var quantidade = req.body.quantidade;

    var Users = db.Mongoose.model('devolucaocolection', db.devolucaoSchema, 'devolucaocolection');
    var user = new Users({ policial: policial, equipamento: equipamento, quantidade: quantidade });
    user.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            var options = {
                host: '192.168.159.128',
                port: 3000,
                path: '/api/br.com.colmeiacpmg.Bee',
                method: 'GET'
              };
              
              http.request(options, function(res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                  console.log('BODY: ' + chunk);
                });
              }).end();
            res.redirect("emprestimo");
        }
    });
});
module.exports = router;
