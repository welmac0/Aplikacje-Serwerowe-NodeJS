class Animal {
    constructor(name, color) {

        name ? this.name = name : this.name = 'default name'
        color ? this.color = color : this.color = 'default colour'
        this.id = animalsArray.length + 1
    }
    
    update() {
        this.color = 'POMARANCZOWO-CZARNA'
        this.name = 'ZYRAFA'
    }
    //... inne potrzebne funkcje

}

let animalsArray = []

module.exports = { Animal, animalsArray };