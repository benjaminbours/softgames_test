import { Application, Container } from "pixi.js";

type Scene = Container;

export class SceneManager {
  private currentScene: Scene | null = null;

  changeScene(app: Application, newScene: Scene) {
    if (this.currentScene) {
      this.currentScene.destroy({ children: true });
    }
    this.currentScene = newScene;
    app.stage.addChild(this.currentScene);
  }
}
