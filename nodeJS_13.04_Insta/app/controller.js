//file controller & json controller

// załącz klasę Animal i tablicę zwierząt
const tasks = require('./taskmodel.js');

module.exports = {
    add: (title, description, status) => {
        let newTask = new tasks.Task(title, description, status)
        tasks.tasksArray.push(newTask)
    },
    delete: (id) => {
        delete tasks.tasksArray[id - 1]
    },
    update: (id, title, description, status) => {
        console.log(tasks.tasksArray[id - 1]);
        tasks.tasksArray[id - 1].title = title;
        tasks.tasksArray[id - 1].description = description;
        tasks.tasksArray[id - 1].status = status;
        console.log(tasks.tasksArray[id - 1]);
    },
    getall: () => {
        return tasks.tasksArray
    },
    getone: (id) => {
        return tasks.tasksArray[id - 1]
    }

}