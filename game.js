import { Model } from "./model.js"

export class GameManager {
    constructor(field, playerCount, scene) {
        this.field = field
        this.scene = scene
        this.sides = field.sides

        this.updatePlayers(playerCount)
    }

    updatePlayers(count) {
        for(var i = 0 ; i < this.playerCount; i++) {
            this.scene.deleteModel(this.playersList[i])
        }

        this.playersList = []
        this.playerCount = count

        var temp = this.field.cornerList

        var t = Math.floor(Math.random() * count)
        for(var i = 0 ; i < count; i++) {
            var k = Math.floor(Math.random() * temp.length)
            if(i == t) {
                var model = new Model([0, 0, 0], "./models/char.obj", "Catcher", [0.0, 1.0, 0.0, 1])
                this.scene.addModel(model)
                this.catcher = model
                this.playersList.push(model)

                model.transform.setPosition(temp[k][0], temp[k][1], temp[k][2])
            }
            else {
                var model = new Model([0, 0, 0], "./models/Cube.obj", "Player", [Math.random(), Math.random(), Math.random(), 1])
                this.scene.addModel(model)
                this.playersList.push(model)
                // console.log(this.field.cornerList[i])
                model.transform.setPosition(temp[k][0], temp[k][1], temp[k][2])
            }
            temp.splice(k, 1)
        }
    }
}