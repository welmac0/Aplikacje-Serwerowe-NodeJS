const objectData = require("./modulD.js")
objectData.makeThings()

doit = async () => {
    await objectData.makeThingsAsync()
}
doit()

console.log(objectData.makeOtherThingsAndReturnWithPromise())

doit2 = async () => {
    let result = await objectData.makeOtherThingsAndReturnWithPromise()
    console.log(result);
}
doit2()