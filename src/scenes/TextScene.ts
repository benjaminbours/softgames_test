import { Application, Container, Sprite, Text, Assets } from "pixi.js";
import texturePath from "../../assets/card_back.jpg";
import samplePath from "../../assets/sample.png";

export class TextScene extends Container {
  private texts: string[] = ["Hello World", "Hello Softgames", "😊😊😊😊😊😊"];
  private images: string[] = [texturePath, samplePath];
  private intervalId!: number;

  constructor(private app: Application) {
    super();

    Assets.load([texturePath, samplePath]).then(() => {
      this.updateDisplay();
      this.intervalId = setInterval(() => this.updateDisplay(), 2000);
    });
  }

  private updateDisplay() {
    this.removeChildren();

    const title = new Text({ text: "Text" });
    title.x = 100;
    title.y = 100;
    this.addChild(title);

    const randomText =
      this.texts[Math.floor(Math.random() * this.texts.length)];
    const randomImage =
      this.images[Math.floor(Math.random() * this.images.length)];
    const randomFontSize = Math.floor(Math.random() * 30) + 20;

    const img = Sprite.from(randomImage);
    const imgWidth = img.width;
    const imgHeight = img.height;
    img.x = Math.random() * (this.app.screen.width - imgWidth);
    img.y = Math.random() * (this.app.screen.height - imgHeight);
    this.addChild(img);

    const txt = new Text({
      text: randomText,
      style: {
        fontSize: randomFontSize,
      },
    });
    const txtWidth = txt.width;
    const txtHeight = txt.height;
    txt.x = Math.random() * (this.app.screen.width - txtWidth);
    txt.y = Math.random() * (this.app.screen.height - txtHeight);
    this.addChild(txt);
  }

  destroy() {
    clearInterval(this.intervalId);
    super.destroy();
  }
}
