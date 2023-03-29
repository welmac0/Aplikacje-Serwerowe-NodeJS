const Fruit = require('./modulE.js');
const plant1 = new Fruit("banan", "żółty")
const plant2 = new Fruit("jabłko", "czerwone")
console.log(plant1.getPlantInfo(), plant2.getPlantInfo());