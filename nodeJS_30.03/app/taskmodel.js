class Task {
    constructor(title, description, status) {
        this.id = tasksArray.length + 1
        this.title = title.toString()
        this.description = description
        this.completed = status
    }

    update(title, description, status) {
        this.title = title.toString()
        this.description = description
        this.completed = status
    }
}

let tasksArray = [
    {
        id: 1,
        title: "zadanie 1",
        description: "łatwe",
        completed: false,
    },
    {
        id: 2,
        title: "zadanie 2",
        description: "trudne",
        completed: false,
    },
    {
        id: 3,
        title: "zadanie 3",
        description: "średnie",
        completed: false,
    },

];

module.exports = { Task, tasksArray };