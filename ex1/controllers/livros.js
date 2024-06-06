const mongoose = require('mongoose');
var Livro = require('../models/livros');

//GET /books: devolve uma lista com todos os registos;
module.exports.list = () => {
    return Livro.find().exec();
}

//GET /books/:id: devolve o registo com identificador id;
module.exports.findById = (id) => {
    return Livro.findOne({ _id: id }).exec();
}

//GET /books?charater=EEEE: devolve a lista dos livros em que EEEE faz parte do nome de um dos personagens;
module.exports.listByCharacter = (charater) => {
    return Livro.find({ characters: { $in: [charater] } }).exec();
}

//GET /books?genre=AAA: devolve a lista dos livros associados ao género (genre) AAA;
module.exports.listByGenre = (genre) => {
    return Livro.find({ genres: { $in: [genre] } }).exec();
}

//GET /books/genres: devolve a lista de géneros ordenada alfabeticamente e sem repetições;
module.exports.listGenres = () => {
    return Livro.distinct("genres").sort().exec();
}

//GET /books/characters: devolve a lista dos personagens ordenada alfabeticamente e sem repetições;
module.exports.listCharacters = () => {
    return Livro.distinct("characters").sort().exec();
}

//POST /books: acrescenta um registo novo à BD;
module.exports.insert = (livro) => {
    if (Livro.find({ _id: livro._id }).exec().length != 1) {
        var newLivro = new Livro(livro);
        return newLivro.save();
    }
    
    return Promise.reject(new Error('Livro já existe'));
}

//DELETE /books/:id: elimina da BD o registo com o identificador id;
module.exports.remove = (id) => {
    return Livro.find({ _id: id }).deleteOne().exec();
}

//PUT /books/:id: altera o registo com o identificador id.
module.exports.update = (id, livro) => {
    return Livro.findByIdAndUpdate(id, livro, { new: true }).exec();
}