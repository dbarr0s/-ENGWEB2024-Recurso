var express = require('express');
var router = express.Router();
var axios = require('axios');

const api_url = 'http://localhost:17000';

router.get('/', function(req, res, next) {
  axios.get(api_url + '/livros')
    .then(response => {
      res.render('index', { livros: response.data });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

router.get('/:id', function(req, res, next) {
  axios.get(api_url + '/livros/' + req.params.id)
    .then(response => {
      res.render('livro', { livro: response.data });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

router.get('/entidades/:idAutor', function (req, res, next) {
  axios.get(api_url + '/autores/' + req.params.idAutor)
    .then(response => {
      let autor = response.data;
      axios.get(api_url + '/livros?autor=' + autor.id)
        .then(responseLivros => {
          let livros = responseLivros.data;
          let totalLivros = livros.length;

          res.render('autor', { autor: autor, livros: livros, totalLivros: totalLivros });
        })
        .catch(errorLivros => {
          res.render('error', { error: errorLivros });
        });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});


module.exports = router;