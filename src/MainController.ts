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

    // // load the PNG asynchronously
    // await Assets.load(samplePath);
    // let sprite = Sprite.from(samplePath);
    // this.app.stage.addChild(sprite);

    // // Add a variable to count up the seconds our demo has been running
    // let elapsed = 0.0;
    // // Tell our application's ticker to run a new callback every frame, passing
    // // in the amount of time that has passed since the last tick
    // this.app.ticker.add((ticker) => {
    //   // Add the time to our total elapsed time
    //   elapsed += ticker.deltaTime;
    //   // Update the sprite's X position based on the cosine of our elapsed time.  We divide
    //   // by 50 to slow the animation down a bit...
    //   sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
    // });

    this.app.ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);
  }
}
