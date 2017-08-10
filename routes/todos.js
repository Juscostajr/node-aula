/**
 * Created by Juscelino Jr on 09/08/2017.
 */
var express = require("express");
var todos = express.Router();
var todoList = [];
var todoIndex = 0;


todos.get('/:todoId', function(req, res, next) {
    var todosFiltered =
    todoList.filter(function(todo, index) {
        return todo.id === parseInt(req.params.todoId);
    });

    if (todosFiltered.length === 0){
        res.status(404).send();
    } else {
        res.status(200).json(todosFiltered[0]);
    }
});

todos.post('/', function(req, res, next) {
    console.log("Requisição get");
    console.log(req.body.title);
    var todo = req.body;
    todo.id = todoIndex++;
    todoList.push(todo);
    res.status(200).send();
});

module.exports = todos;