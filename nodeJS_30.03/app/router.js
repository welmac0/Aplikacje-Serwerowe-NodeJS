const controller = require('./controller.js');
const utils = require('./utils.js');
const tasks = require('./taskmodel.js');
const fs = require('fs')
//{ Animal, animalsArray };

const router = async (req, res) => {

    // /api/tasks   GET   Pobranie wszystkich zadań
    // / api / tasks / 1   GET   Pobranie zadania o id = 1
    // / api / tasks   POST   Dodawanie nowego zadania z losowym id(dane na jego temat są przesyłane w body jsonem)
    // / api / tasks   PATCH   Edycja danych zadania(dane na jego temat są przesyłane w body jsonem)
    // / api / tasks / 1   DELETE   Usunięcie usera o id = 1

    if (req.url == '/api/tasks' && req.method == "GET") {
        // DONE
        let allTasks = await controller.getall()//funkcja 
        allTasks = JSON.stringify(allTasks)
        res.setHeader("Content-Type", "application/json")
        res.end(allTasks)
    } else if (req.url.match(/\/api\/tasks\/([0-9]+)/g) && req.method == "GET") {
        //pobranie jednego wg id DONE
        const matches = req.url.matchAll(/\/api\/tasks\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        let daneTasku = controller.getone(id)
        daneTasku = JSON.stringify(daneTasku)
        res.setHeader("Content-Type", "application/json")
        res.end(daneTasku)
    } else if (req.url == '/api/tasks' && req.method == "POST") {
        //utworzenie nowego taska
        let data = await utils(req)
        data = JSON.parse(data)
        console.log(data);
        controller.add(data.title, data.desription, data.status)
    } else if (req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method == "DELETE") {
        //usuniecie jednego taska wg ig
        const matches = req.url.matchAll(/\/api\/tasks\/([0-9]+)/g);
        let id = Array.from(matches)[0][1] //<-- kradnie
        controller.delete(id)
    } else if (req.url == '/api/tasks' && req.method == 'PATCH') {
        //aktualizacja jednego taska wg id
        let data = await utils(req)
        data = JSON.parse(data)
        console.log(data);
        controller.update(data.id, data.title, data.desription, data.status)
        //controller.update(id, title, desription, status)
    } else {
        res.end(`HTTP/1.1 69 BAD REQUEST
        Date: Thu, 30 Mar 2023 10:49:00 GMT
        Connection: close
        Content-Length: 3`);
    }
}

module.exports = router