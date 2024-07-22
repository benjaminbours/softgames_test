import { Application, Container, Text } from "pixi.js";

export class ParticlesScene extends Container {
  constructor(private app: Application) {
    super();

    const txt = new Text({ text: "Particles" });
    txt.x = 100;
    txt.y = 100;
    this.addChild(txt);
  }
}
