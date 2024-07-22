import { Application, Container, Text } from "pixi.js";
import { SceneID } from "../constants";
import { SceneManager } from "../SceneManager";
import { CardsScene } from "./CardsScene";
import { ParticlesScene } from "./ParticlesScene";
import { TextScene } from "./TextScene";

export class IntroScene extends Container {
  private menuItems = [
    {
      text: new Text({ text: "Cards" }),
      sceneID: SceneID.Cards,
    },
    {
      text: new Text({ text: "Particles" }),
      sceneID: SceneID.Particles,
    },
    {
      text: new Text({ text: "Text" }),
      sceneID: SceneID.Text,
    },
  ];

  constructor(private app: Application, private sceneManager: SceneManager) {
    super();

    this.menuItems.forEach(({ text, sceneID }) => {
      text.anchor.set(0.5);
      text.on("pointerdown", () => {
        const nextScene = (() => {
          switch (sceneID) {
            case SceneID.Cards:
              return new CardsScene(app);
            case SceneID.Particles:
              return new ParticlesScene(app);
            case SceneID.Text:
              return new TextScene(app);
          }
        })();
        sceneManager.changeScene(app, nextScene!);
      });
      text.eventMode = "static";
      this.addChild(text);
    });
    this.positionMenuItems();

    // Handle resize
    window.addEventListener("resize", this.positionMenuItems);
  }

  private positionMenuItems = () => {
    const { width, height } = this.app.screen;
    const spacing = 50; // Space between menu items

    this.menuItems.forEach(({ text }, index) => {
      text.x = width / 2;
      text.y = height / 2 + (index - 1) * spacing;
    });
  };

  // clean up
  destroy = () => {
    super.destroy();
    window.removeEventListener("resize", this.positionMenuItems);
  };
}
