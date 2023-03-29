// załącz klasę Animal i tablicę zwierząt
const animals = require('./model.js');

module.exports = {
    add: (name, color) => {
        // utwórz obiekt klasy Animal
        // dodaj do animalsArray
        let animal = new animals.Animal(name, color)
        animals.animalsArray.push(animal)
    },
    delete: (id) => {
      delete animals.animalsArray[id - 1]
    },
    update: (id) => {
        animals.animalsArray[id-1].update()
    },
    getall: () => {
        //console.log(animals.animalsArray)
        return animals.animalsArray
        
    }

}