import { Application, Container, Sprite, Text, Assets } from "pixi.js";
import { gsap } from "gsap";
import texturePath from "../../assets/card_back.jpg";

export class CardsScene extends Container {
  private cards: Sprite[] = [];
  private initialStackCoordinates = { x: 100, y: 200 };
  private finalStackCoordinates = { x: 600, y: 200 };

  constructor(private app: Application) {
    super();

    const txt = new Text({ text: "Cards" });
    txt.x = 100;
    txt.y = 100;
    this.addChild(txt);

    this.sortableChildren = true;
    Assets.load(texturePath).then(() => {
      for (let i = 0; i < 144; i++) {
        const card = Sprite.from(texturePath);
        card.x = this.initialStackCoordinates.x;
        card.y = this.initialStackCoordinates.y - i * 0.2; // Adjust y position slightly for each card
        this.cards.push(card);
        this.addChild(card);
      }
      this.moveCardsToFinalPosition();
    });
  }

  private moveCardsToFinalPosition() {
    this.cards.reverse().forEach((card, i) => {
      // Your code here
      gsap.to(card, {
        x: this.finalStackCoordinates.x,
        y: this.finalStackCoordinates.y - i * 0.2,
        delay: i,
        duration: 2,
        ease: "power1.inOut",
        onStart: () => {
          card.zIndex = i;
          this.sortChildren();
        },
      });
    });
  }
}
