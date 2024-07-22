import { Application, Container, Text } from "pixi.js";

export class CardsScene extends Container {
  constructor(private app: Application) {
    super();

    const txt = new Text({ text: "Cards" });
    txt.x = 100;
    txt.y = 100;
    this.addChild(txt);
  }
}
