/**
 * Created by Juscelino Jr on 09/08/2017.
 */
var express = require("express");
var todos = express.Router();
var todoList = [];
var todoIndex = 0;


todos.get('/:todoId', function(req, res, next) {
    
    var todo = findTodoById(req.params.todoId);

    if(todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).send();
    }
});

todos.post('/', function(req, res, next) {

    var todo = req.body;
    todo.id = todoIndex++;
    todo.completed = false;
    todoList.push(todo);

    res.status(201).send();

});

todos.put('/:todoId', function(req,res,next){
    var todo = findTodoById(req.params.todoId);

    if(todo){
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.completed = req.body.completed;

        res.status(200).json(todo);

    } else {
        res.status(404).send();
    }
});

todos.delete('/:todoID', function(req,res,next){
    var index = todoList.findIndex(function(todo, index){
        return todo.id === parseInt(req.params.todoId);
    });
    todoList.splice(index,1);

    res.status(200).send();
});

function findTodoById(todoId){
    var todosFiltered =
        todoList.filter(function(todo, index) {
            return todo.id === parseInt(todoId);
        });
    if(todosFiltered.length > 0){
        return todosFiltered[0];
    }
    return null;
}

module.exports = todos;