import { Container, Application, Text, Assets } from "pixi.js";
import { Emitter } from "@barvynkoa/particle-emitter";
import firePath from "../../assets/Fire.png";
import particlePath from "../../assets/particle.png";

export class ParticlesScene extends Container {
  private emitter!: Emitter;

  constructor(private app: Application) {
    super();

    const txt = new Text({ text: "Particles" });
    txt.x = 100;
    txt.y = 100;
    this.addChild(txt);

    Assets.load([firePath, particlePath]).then(() => {
      this.emitter = new Emitter(this, {
        lifetime: {
          min: 0.1,
          max: 0.75,
        },
        frequency: 0.001,
        emitterLifetime: 0,
        maxParticles: 100,
        addAtBack: false,
        pos: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        },
        behaviors: [
          {
            type: "alpha",
            config: {
              alpha: {
                list: [
                  {
                    time: 0,
                    value: 0.8,
                  },
                  {
                    time: 1,
                    value: 0,
                  },
                ],
              },
            },
          },
          {
            type: "moveSpeedStatic",
            config: {
              min: 500,
              max: 500,
            },
          },
          {
            type: "scale",
            config: {
              scale: {
                list: [
                  {
                    time: 0,
                    value: 0.25,
                  },
                  {
                    time: 1,
                    value: 0.75,
                  },
                ],
              },
              minMult: 1,
            },
          },
          {
            type: "color",
            config: {
              color: {
                list: [
                  {
                    time: 0,
                    value: "fff191",
                  },
                  {
                    time: 1,
                    value: "ff622c",
                  },
                ],
              },
            },
          },
          {
            type: "rotation",
            config: {
              accel: 0,
              minSpeed: 50,
              maxSpeed: 50,
              minStart: 265,
              maxStart: 275,
            },
          },
          {
            type: "textureRandom",
            config: {
              textures: [particlePath, firePath],
            },
          },
          {
            type: "spawnShape",
            config: {
              type: "torus",
              data: {
                x: 0,
                y: 0,
                radius: 10,
                innerRadius: 0,
                affectRotation: false,
              },
            },
          },
        ],
      });

      // Calculate the current time
      let elapsed = Date.now();

      // Update function every frame
      const update = () => {
        // Update the next frame
        requestAnimationFrame(update);

        const now = Date.now();

        // The emitter requires the elapsed
        // number of seconds since the last update
        this.emitter.update((now - elapsed) * 0.001);
        elapsed = now;
      };

      // Start emitting
      this.emitter.emit = true;

      // Start the update
      update();

      // Add resize event listener
      window.addEventListener("resize", this.onResize);
    });
  }

  private onResize = () => {
    // Update emitter position to center of the screen
    this.emitter.updateSpawnPos(window.innerWidth / 2, window.innerHeight / 2);
  };

  destroy = () => {
    // Remove resize event listener
    window.removeEventListener("resize", this.onResize);
    this.emitter.destroy();
    super.destroy();
  };
}
