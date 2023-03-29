import { Model } from "./model.js"
import { vec3, mat4, vec4, mat3 } from 'https://cdn.skypack.dev/gl-matrix';

export class GameManager {
    constructor(field, playerCount, scene) {
        this.field = field
        // console.log(field.cornerList)
        this.scene = scene
        this.sides = field.sides
        this.gameState = 0

        this.pallete = [
            [255, 182, 193, 1],
            [232, 30, 99, 1],
            [156, 39, 176, 1],
            [103, 58, 183, 1],
            [63, 81, 181, 1],
            [33, 150, 243, 1],
            [3, 169, 244, 1],
            [0, 188, 212, 1],
            [0, 150, 136, 1],
            [76, 175, 80, 1],
            [139, 195, 74, 1],
            [205, 220, 57, 1],
            [255, 235, 59, 1],
            [255, 193, 7, 1],
            [255, 152, 0, 1],
            [255, 87, 34, 1],
            [121, 85, 72, 1],
            [158, 158, 158, 1],
            [96, 125, 139, 1],
            [244, 67, 54, 1]
        ]

        this.catcherColor = [0, 0, 0, 1]

        this.updatePlayers(playerCount)
    }

    updatePlayers(count) {
        for(var i = 0 ; i < this.playerCount; i++) {
            this.scene.deleteModel(this.playersList[i])
        }

        this.playersList = []
        this.playersPos = []
        this.playerCount = count

        this.remainingCorners = this.field.cornerList.slice()
        var colors = this.pallete.slice()

        var t = Math.floor(Math.random() * count)
        for(var i = 0 ; i < count; i++) {
            var k = Math.floor(Math.random() * this.remainingCorners.length)
            var a = Math.floor(Math.random() * colors.length)
            var m = Math.floor(Math.random() * 3)
            if(m == 0) var model = new Model([0, 0, 0], "./models/moai.obj", "Player", [colors[a][0], colors[a][1], colors[a][2], 1])
            else if(m == 1) var model = new Model([0, 0, 0], "./models/fox3.obj", "Player", [colors[a][0], colors[a][1], colors[a][2], 1])
            else if(m == 2) var model = new Model([0, 0, 0], "./models/model.obj", "Player", [colors[a][0], colors[a][1], colors[a][2], 1])
            // model.transform.setScale(0.3,0.3,0.3)
            this.scene.addModel(model)
            this.playersList.push(model)
            this.playersPos.push([this.remainingCorners[k][0], this.remainingCorners[k][1], this.remainingCorners[k][2]])
            model.transform.setPosition(this.remainingCorners[k][0], this.remainingCorners[k][1], this.remainingCorners[k][2])

            var angle = Math.atan2(this.playersList[i].getPosition()[1], this.playersList[i].getPosition()[0]) * 180 / Math.PI
            model.transform.setQuaternionAngles(0, 0, 90+angle)
            
            // console.log([this.remainingCorners[k][0], this.remainingCorners[k][1], this.remainingCorners[k][2]])
            // console.log(model.getScreenPosition(this.scene))
            this.remainingCorners.splice(k, 1)
            colors.splice(a, 1)


        }
    }

    triggerGameStart(color) {

        this.scene.clearArrows()
        this.scene.models.forEach(function(model) {
            model.color[0] = model.colorCheck[0]/255
            model.color[1] = model.colorCheck[1]/255
            model.color[2] = model.colorCheck[2]/255
        })

        //check is selected color has a player
        this.catcherIdx = -1
        for(var i = 0; i < this.playersList.length; i++) {
            if(this.playersList[i].colorCheck[0] == color[0] && this.playersList[i].colorCheck[1] == color[1] && this.playersList[i].colorCheck[2] == color[2]) {
                this.catcherIdx = i
                break;
            }
        }
        //found no matches
        if(this.catcherIdx == -1) return 0;
        
        // catcher assigned
        // assign random corner to catcher
        // check if there is a player on that corner
        // give that player a new corner to move to

        this.playersList[this.catcherIdx].color = [0,0,0,1]
        var validCorners = this.field.cornerList.slice()
        for(var i = 0; i < validCorners.length; i++) {
            if(validCorners[i][0] == this.playersPos[this.catcherIdx][0] && validCorners[i][1] == this.playersPos[this.catcherIdx][1] && validCorners[i][2] == this.playersPos[this.catcherIdx][2]) {
                validCorners.splice(i, 1)
            }
        }
        this.catcherCornerIdx = Math.floor(Math.random() * validCorners.length)
        this.catcherCorner = validCorners[this.catcherCornerIdx]
        // console.log(catcherCorner)

        //catcher arrow
        this.catcherArrow = new Model([0, 0, 0], './models/arrow.obj', "Arrow", this.playersList[this.catcherIdx].colorCheck)
        this.catcherArrow.transform.setScale(1.5,1.5,1.5)
        this.catcherArrow.transform.setPosition(this.playersPos[this.catcherIdx][0], this.playersPos[this.catcherIdx][1], this.playersPos[this.catcherIdx][2])

        this.catcherAngle = Math.atan2(this.playersList[this.catcherIdx].getPosition()[1] - this.catcherCorner[1], this.playersList[this.catcherIdx].getPosition()[0] - this.catcherCorner[0]) * 180 / Math.PI
        // console.log(angle)
        this.catcherArrow.transform.setQuaternionAngles(90, 0, 90 + this.catcherAngle)

        this.scene.addArrow(this.catcherArrow)

        this.playerIdx = -1
        // checking from playerPos list if catcher is moving to a player's position
        for(var i = 0; i < this.playersPos.length; i++) {
            if(i != this.catcherIdx && this.playersPos[i][0] == this.catcherCorner[0] && this.playersPos[i][1] == this.catcherCorner[1] && this.playersPos[i][2] == this.catcherCorner[2]) {
                this.playerIdx = i
                // console.log("yep")
                break;
            } 
        }
        if(this.playerIdx != -1) {
            var playerCornerIdx = Math.floor(Math.random() * this.remainingCorners.length)
            this.playerCorner = this.remainingCorners[playerCornerIdx]

            this.playerArrow = new Model([0, 0, 0], './models/arrow.obj', "Arrow", this.playersList[this.playerIdx].colorCheck)
            this.playerArrow.transform.setScale(1.5,1.5,1.5)
            this.playerArrow.transform.setPosition(this.playersPos[this.playerIdx][0], this.playersPos[this.playerIdx][1], this.playersPos[this.playerIdx][2])

            this.playerAngle = Math.atan2(this.playersList[this.playerIdx].getPosition()[1] - this.playerCorner[1], this.playersList[this.playerIdx].getPosition()[0] - this.playerCorner[0]) * 180 / Math.PI
            this.playerArrow.transform.setQuaternionAngles(90, 0, 90 + this.playerAngle)

            this.scene.addArrow(this.playerArrow)
        }

        this.totalDistCatcherNeedsToCover = Math.sqrt(Math.pow(this.playersPos[this.catcherIdx][0]-this.catcherCorner[0], 2) + Math.pow(this.playersPos[this.catcherIdx][1]-this.catcherCorner[1], 2))
        if(this.playerIdx != -1) this.totalDistPlayerNeedsToCover = Math.sqrt(Math.pow(this.playersPos[this.playerIdx][0]-this.playerCorner[0], 2) + Math.pow(this.playersPos[this.playerIdx][1]-this.playerCorner[1], 2))

        this.gameState = 1
        return 1
    }

    moveCatcherAndPlayer(currentPos) {
        // console.log("dragging")
        if(this.gameState != 2) return 1;
        
        // console.log(this.catcherCorner)
        // console.log(this.playersPos[this.catcherIdx])
        // console.log(currentPos)

        var projection = projectionOfPointOnLine(currentPos, this.playersPos[this.catcherIdx], this.catcherCorner)

        this.playersList[this.catcherIdx].transform.setPosition(projection[0], projection[1], projection[2])
        this.playersList[this.catcherIdx].transform.setQuaternionAngles(0, 0, 90 + this.catcherAngle)
        this.catcherArrow.transform.setPosition(projection[0], projection[1], projection[2])


        // console.log(projection)

        var distCoveredByCatcherNow = Math.sqrt(Math.pow(projection[0]-this.playersPos[this.catcherIdx][0], 2) + Math.pow(projection[1]-this.playersPos[this.catcherIdx][1], 2))
        // console.log(distCoveredByCatcherNow/this.totalDistCatcherNeedsToCover * 100)

        this.ratio = distCoveredByCatcherNow/this.totalDistCatcherNeedsToCover

        if(this.playerIdx != -1) {
            var playerUpdate = [this.playersPos[this.playerIdx][0]*(1-this.ratio) + this.playerCorner[0]*(this.ratio), this.playersPos[this.playerIdx][1]*(1-this.ratio) + this.playerCorner[1]*(this.ratio), projection[2]]
            this.playersList[this.playerIdx].transform.setPosition(playerUpdate[0], playerUpdate[1], playerUpdate[2])
            this.playersList[this.playerIdx].transform.setQuaternionAngles(0, 0, 90+this.playerAngle)
            this.playerArrow.transform.setPosition(playerUpdate[0], playerUpdate[1], playerUpdate[2])
        }
    }

    checkRatioToEndGame() {
        if(this.ratio < 0.8) return 2;

        // update catcher to new corner
        // reset catcher color
        // update player to new corner
        // remove arrows
        // reset game state back to normal

        this.playersPos[this.catcherIdx] = this.catcherCorner
        this.playersList[this.catcherIdx].transform.setPosition(this.catcherCorner[0], this.catcherCorner[1], this.catcherCorner[2])
        var angle = Math.atan2(this.playersList[this.catcherIdx].getPosition()[1], this.playersList[this.catcherIdx].getPosition()[0]) * 180 / Math.PI
        this.playersList[this.catcherIdx].transform.setQuaternionAngles(0, 0, 90+angle)
        this.playersList[this.catcherIdx].color = [this.playersList[this.catcherIdx].colorCheck[0]/255, this.playersList[this.catcherIdx].colorCheck[1]/255, this.playersList[this.catcherIdx].colorCheck[2]/255, 1]
      
        for(var i = 0; i < this.remainingCorners.length; i++) {
            if(this.remainingCorners[i][0] == this.catcherCorner[0] && this.remainingCorners[i][1] == this.catcherCorner[1] && this.remainingCorners[i][2] == this.catcherCorner[2]) {
                this.remainingCorners.splice(i, 1)
            }
        }
        this.remainingCorners.push(this.playersPos[this.catcherIdx])

        if(this.playerIdx != -1) {
            this.playersPos[this.playerIdx] = this.playerCorner
            this.playersList[this.playerIdx].transform.setPosition(this.playerCorner[0], this.playerCorner[1], this.playerCorner[2])
            var angle = Math.atan2(this.playersList[this.playerIdx].getPosition()[1], this.playersList[this.playerIdx].getPosition()[0]) * 180 / Math.PI
            this.playersList[this.playerIdx].transform.setQuaternionAngles(0, 0, 90+angle)

            for(var i = 0; i < this.remainingCorners.length; i++) {
                if(this.remainingCorners[i][0] == this.playerCorner[0] && this.remainingCorners[i][1] == this.playerCorner[1] && this.remainingCorners[i][2] == this.playerCorner[2]) {
                    this.remainingCorners.splice(i, 1)
                }
            }
        }

        this.scene.clearArrows()

        this.gameState = 0
        return 0
    }

    rotateCatcherZ() {
        this.playersList[this.catcherIdx].transform.quaternionRotation(0, 0, 5)
    }

    rotateCatcherX() {
        this.playersList[this.catcherIdx].transform.quaternionRotation(5, 0, 0)
    }

    rotateCatcherY() {
        this.playersList[this.catcherIdx].transform.quaternionRotation(0, 5, 0)
    }

    scaleCatcherUp() {
        this.playersList[this.catcherIdx].transform.scaling(0.1, 0.1, 0.1)
    }

    scaleCatcherDown() {
        this.playersList[this.catcherIdx].transform.scaling(-0.1, -0.1, -0.1)
    }
}


function truncateDecimals (num, digits) {
    var numS = num.toString(),
        decPos = numS.indexOf('.'),
        substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
        trimmedResult = numS.substr(0, substrLength),
        finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

    return parseFloat(finalResult);
}

function projectionOfPointOnLine(p, l1, l2) {
    // find equation of the line
    // l1 and l2 and point = [x,y,z]

    var vec_l1 = vec3.create()
    var p_l1 = vec3.create()
    var l2_l1 = vec3.create()

    vec3.set(vec_l1, l1[0], l1[1], l1[2])
    vec3.set(p_l1, p[0]-l1[0], p[1]-l1[1], p[2]-l1[2])
    vec3.set(l2_l1, l2[0]-l1[0], l2[1]-l1[1], l2[2]-l1[2])

    var temp1 = vec3.dot(p_l1, l2_l1)
    var temp2 = vec3.dot(l2_l1, l2_l1)

    var scalar = temp1/temp2
    var res = vec3.create()

    vec3.scale(res, l2_l1, scalar)
    vec3.add(res, vec_l1, res)

    // lastly, clamp this to between l1 and l2
    if(res[0] > l1[0] && res[0] > l2[0]) {
        if(l1[0] > l2[0]) res = l1
        else res = l2
    }
    else if(res[0] < l1[0] && res[0] < l2[0]) {
        if(l1[0] < l2[0]) res = l1
        else res = l2
    }

    return res
}