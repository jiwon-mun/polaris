class Example extends Phaser.Scene {
  create() {
    const graphics = this.add.graphics();
    const outer_graphics = this.add.graphics();
    const color = 0xffff00;
    const thickness = 2;
    const alpha = 1;

    let xCursor,
      yCursor = 0;

    //  Events

    let draw = false;

    this.input.on("pointerdown", (pointer) => {
      const black = 0xc0c0c0;

      xCursor = pointer.downX;
      yCursor = pointer.downY;

      outer_graphics.fillStyle(black);
      outer_graphics.fillCircle(pointer.downX, pointer.downY, 60);
      outer_graphics.setDepth(-1);

      const gray = 0x808080;
      graphics.fillStyle(gray);
      graphics.fillCircle(pointer.downX, pointer.downY, 30);

      graphics.setDepth(1);

      draw = true;
    });

    this.input.on("pointerup", () => {
      outer_graphics.clear();
      graphics.clear();
      draw = false;
    });

    this.input.on("pointermove", (pointer) => {
      if (draw) {
        const dx = pointer.x - xCursor;
        const dy = pointer.y - yCursor;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance + 30 > 50) {
          // Calculate the angle to the pointer
          const angle = Math.atan2(dy, dx);
          // Position the gray circle within the black circle's radius
          pointer.x = xCursor + (50 - 30) * Math.cos(angle);
          pointer.y = yCursor + (50 - 30) * Math.sin(angle);
        }

        graphics.setDepth(1);
        graphics.clear();
        const gray = 0x808080;
        graphics.fillStyle(gray);
        graphics.fillCircle(pointer.x, pointer.y, 30);
      }
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: Example,
};

const game = new Phaser.Game(config);
