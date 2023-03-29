export class KeyboardEventManager {
  constructor(scene, gameManager) {
    this.scene = scene;
    this.gameManager = gameManager;
  }

  KeyDownAction(event) {
    if(this.gameManager.gameState == 0) {
      if (event.key == "c") {
        this.scene.camera.switchMode();
      }
      if (event.key == "1") {
        this.scene.clearArrows()
        this.gameManager.field.changeSides(this.gameManager.field.sides - 1);
        this.gameManager.updatePlayers(this.gameManager.playerCount);
      }
      if (event.key == "2") {
        this.scene.clearArrows()
        this.gameManager.field.changeSides(this.gameManager.field.sides + 1);
        this.gameManager.updatePlayers(this.gameManager.playerCount);
      }
      if (event.key == "9") {
        this.scene.clearArrows()
        this.gameManager.updatePlayers(this.gameManager.playerCount - 1);
      }
      if (event.key == "0") {
        this.scene.clearArrows()
        this.gameManager.updatePlayers(this.gameManager.playerCount + 1);
      }
      if(event.key == "-") {
        this.scene.camera.zoomOut()
      }
      if(event.key == "=") {
        this.scene.camera.zoomIn()
      }
    }
    if(this.gameManager.gameState == 1) {
      if (event.key == "z") {
        this.gameManager.rotateCatcherZ()
      }
      if (event.key == "x") {
        this.gameManager.rotateCatcherX()
      }
      if (event.key == "c") {
        this.gameManager.rotateCatcherY()
      }
      if (event.key == "ArrowUp") {
        this.gameManager.scaleCatcherUp()
      }
      if (event.key == "ArrowDown") {
        this.gameManager.scaleCatcherDown()
      }
    }
  }
}
