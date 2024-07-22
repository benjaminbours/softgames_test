import { Application, Sprite, Assets, UPDATE_PRIORITY } from "pixi.js";
import { addStats } from "pixi-stats";
import samplePath from "../assets/sample.png";

async function main() {
  const app = new Application();
  await app.init({
    resizeTo: window,
  });
  const stats = addStats(document, app);

  app.canvas.style.display = "block";

  document.body.appendChild(app.canvas);

  // load the PNG asynchronously
  await Assets.load(samplePath);
  let sprite = Sprite.from(samplePath);
  app.stage.addChild(sprite);

  // Add a variable to count up the seconds our demo has been running
  let elapsed = 0.0;
  // Tell our application's ticker to run a new callback every frame, passing
  // in the amount of time that has passed since the last tick
  app.ticker.add((ticker) => {
    // Add the time to our total elapsed time
    elapsed += ticker.deltaTime;
    // Update the sprite's X position based on the cosine of our elapsed time.  We divide
    // by 50 to slow the animation down a bit...
    sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
  });

  app.ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);
}

main();
