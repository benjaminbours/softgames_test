import { Application, Sprite, Assets, UPDATE_PRIORITY } from "pixi.js";
import { addStats } from "pixi-stats";
import samplePath from "../assets/sample.png";
import { SceneManager } from "./SceneManager";
import { IntroScene } from "./scenes/IntroScene";

export class MainController {
  private sceneManager!: SceneManager;
  private app!: Application;

  constructor() {
    this.init().then(() => {
      this.sceneManager = new SceneManager();
      this.sceneManager.changeScene(
        this.app,
        new IntroScene(this.app, this.sceneManager)
      );
    });
  }

  async init() {
    this.app = new Application();
    await this.app.init({
      background: "#1099bb",
      resizeTo: window,
    });
    const stats = addStats(document, this.app);
    this.app.canvas.style.display = "block";

    document.body.appendChild(this.app.canvas);

    this.app.ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);
  }
}
