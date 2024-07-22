import { Application, Container, Text } from "pixi.js";

export class TextScene extends Container {
  constructor(private app: Application) {
    super();

    const txt = new Text({ text: "Text" });
    txt.x = 100;
    txt.y = 100;
    this.addChild(txt);
  }
}
