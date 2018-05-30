var ToDo = require('../models/todo.model')

_this = this

exports.getTodos = async function(query, page, limit){
	var options = {
		page,
		limit
	}

	try {
		var todos = await ToDo.paginate(query, options)

		return todos;
	}
	catch (e){
		throw Error('Error while paginating todos')
	}
}

exports.createToDo = async function(todo){
	var newTodo = new ToDo({
		title: todo.title,
		description: todo.description,
		date: new Date(),
		status: todo.status
	})

	try{
		var savedTodo = await newTodo.save()
		return savedTodo;
	}
	catch(e){
		throw Error('Error while creating todo')
	}
}

exports.updateTodo = async function(todo){
	var id = todo.id
	try{
		var oldTodo = await ToDo.findById(id);
	} 
	catch(e){
		throw Error('Error while finding todo')
	}
	if(!oldTodo){
		return false;
	}

	oldTodo.title = todo.title
	oldTodo.description = todo.description
	oldTodo.status = todo.status

	try{
		var savedTodo = await oldTodo.save()
		return savedTodo;
	}
	catch(e){
		throw Error('And error occured while updating todo')
	}
}

exports.deleteTodo = async function(id){
	try{
		var deleted = await ToDo.remove({_id: id})
		if(deleted.result.n === 0){
			throw Error('Todo could not be deleted')
		}
		return deleted
	}
	catch(e){
		throw Error('Error occured while deleting todo')
	}
}