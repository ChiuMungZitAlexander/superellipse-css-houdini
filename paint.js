registerPaint(
  "superEllipse",
  class {
    // custom properties
    static get inputProperties() {
      // n - the exponent of Lame curve
      return ["--n"];
    }

    paint(ctx, geom, props) {
      const { height, width } = geom;
      const exp = props.get("--n")?.[0] || 3;

      const calcY = (x) => ((width / 2) ** exp - x ** exp) ** (1 / exp);

      ctx.setTransform(1, 0, 0, 1, width / 2, height / 2);
      ctx.beginPath();

      for (let i = -width / 2; i <= width / 2; i++) {
        const j = calcY(Math.abs(i));
        ctx.bezierCurveTo(i, j, i, j, i, j);
      }

      for (let i = width / 2; i >= -width / 2; i--) {
        const j = -calcY(Math.abs(i));
        ctx.bezierCurveTo(i, j, i, j, i, j);
      }

      ctx.closePath();
      ctx.fillStyle = "#ff6700";
      ctx.fill();
    }
  }
);
