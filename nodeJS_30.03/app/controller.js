// załącz klasę Animal i tablicę zwierząt
const tasks = require('./taskmodel.js');

module.exports = {
    add: (title, description, status) => {
        let newTask = new tasks.Task(title, description, status)
        tasks.tasksArray.push(newTask)
    },
    delete: (id) => {
      delete tasks.tasksArray[id-1]  
    },
    update: (id, title, description, status) => {
        tasks.tasksArray[id-1].update(title, description, status)
    },
    getall: () => {
        return tasks.tasksArray
    },
    getone: (id) => {
        return tasks.tasksArray[id-1]
    }

}