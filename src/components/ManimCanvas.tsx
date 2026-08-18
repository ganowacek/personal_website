import { useEffect, useRef } from "react";

const points = Array.from({ length: 72 }, (_, index) => {
  const x = ((index * 37) % 100) / 100;
  const wave = Math.sin(index * 1.37) * 0.13 + Math.cos(index * 0.61) * 0.08;
  return { x, y: 0.72 - 0.46 / (1 + Math.exp(-8 * (x - 0.48))) + wave };
});

const walkPoints = (() => {
  let x = 0;
  let y = 0;
  const raw = [{ x, y }];
  for (let index = 1; index <= 60; index += 1) {
    x += Math.sin(index * 12.9898) * 0.5 + Math.sin(index * 0.37) * 0.3;
    y += Math.cos(index * 78.233) * 0.5 + Math.cos(index * 0.53) * 0.3;
    raw.push({ x, y });
  }
  const xs = raw.map((point) => point.x);
  const ys = raw.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return raw.map((point) => ({
    x: (point.x - minX) / (maxX - minX || 1),
    y: (point.y - minY) / (maxY - minY || 1),
  }));
})();

function ease(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function ManimCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;

    const canvas = canvasElement;
    const context = drawingContext;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function drawGrid() {
      context.strokeStyle = "rgba(143, 188, 230, 0.18)";
      context.lineWidth = 1;
      for (let x = 0; x <= width; x += width / 10) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y <= height; y += height / 8) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    }

    function drawAxes(originX: number, originY: number, progress: number) {
      context.strokeStyle = "rgba(247, 245, 239, 0.48)";
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(originX, originY);
      context.lineTo(originX + (width - originX - 28) * progress, originY);
      context.moveTo(originX, originY);
      context.lineTo(originX, 28 + (originY - 28) * (1 - progress));
      context.stroke();
    }

    function drawCurve(originX: number, originY: number, scaleX: number, scaleY: number, progress: number) {
      context.strokeStyle = "#f6c85f";
      context.lineWidth = 3;
      context.beginPath();
      const steps = Math.max(6, Math.floor(90 * progress));
      for (let step = 0; step <= steps; step += 1) {
        const unit = step / 90;
        const x = originX + unit * scaleX;
        const sigmoid = 1 / (1 + Math.exp(-9 * (unit - 0.52)));
        const y = originY - sigmoid * scaleY - Math.sin(unit * Math.PI * 2) * 8;
        if (step === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();
    }

    function drawPoints(originX: number, originY: number, scaleX: number, scaleY: number, time: number) {
      points.forEach((point, index) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0018 + index);
        context.fillStyle = `rgba(143, 188, 230, ${0.2 + pulse * 0.48})`;
        context.beginPath();
        context.arc(originX + point.x * scaleX, originY - point.y * scaleY, 2.2 + pulse * 1.6, 0, Math.PI * 2);
        context.fill();
      });
    }

    function drawGridTransform(centerX: number, centerY: number, extent: number, time: number) {
      const angle = 0.22 * Math.sin(time * 0.00055);
      const shear = 0.22 * Math.sin(time * 0.00035 + 1.1);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const m00 = cos + shear * sin;
      const m01 = -sin + shear * cos;
      const m10 = sin;
      const m11 = cos;

      function transform(x: number, y: number) {
        return { x: m00 * x + m01 * y, y: m10 * x + m11 * y };
      }

      const steps = 4;
      const cell = extent / steps;

      context.save();
      context.translate(centerX, centerY);

      context.strokeStyle = "rgba(247, 245, 239, 0.12)";
      context.lineWidth = 1;
      for (let index = -steps; index <= steps; index += 1) {
        context.beginPath();
        context.moveTo(index * cell, -extent);
        context.lineTo(index * cell, extent);
        context.moveTo(-extent, index * cell);
        context.lineTo(extent, index * cell);
        context.stroke();
      }

      context.strokeStyle = "rgba(143, 188, 230, 0.55)";
      context.lineWidth = 1.3;
      for (let index = -steps; index <= steps; index += 1) {
        const vTop = transform(index * cell, -extent);
        const vBottom = transform(index * cell, extent);
        const hLeft = transform(-extent, index * cell);
        const hRight = transform(extent, index * cell);
        context.beginPath();
        context.moveTo(vTop.x, -vTop.y);
        context.lineTo(vBottom.x, -vBottom.y);
        context.moveTo(hLeft.x, -hLeft.y);
        context.lineTo(hRight.x, -hRight.y);
        context.stroke();
      }

      context.strokeStyle = "#f6c85f";
      context.lineWidth = 2.2;
      const e1 = transform(extent * 0.92, 0);
      const e2 = transform(0, extent * 0.92);
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(e1.x, -e1.y);
      context.stroke();
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(e2.x, -e2.y);
      context.stroke();

      context.restore();

      context.font = "600 13px Inter, sans-serif";
      context.fillStyle = "rgba(143, 188, 230, 0.86)";
      context.fillText("T(v) = Av", centerX - extent, centerY - extent - 10);
    }

    function drawRandomWalk(startX: number, baseY: number, spanX: number, spanY: number, progress: number) {
      const count = Math.max(2, Math.floor(walkPoints.length * progress));
      context.lineWidth = 2;
      for (let index = 1; index < count; index += 1) {
        const prev = walkPoints[index - 1];
        const curr = walkPoints[index];
        const alpha = 0.15 + 0.55 * (index / walkPoints.length);
        context.strokeStyle = `rgba(75, 156, 211, ${alpha})`;
        context.beginPath();
        context.moveTo(startX + prev.x * spanX, baseY - prev.y * spanY);
        context.lineTo(startX + curr.x * spanX, baseY - curr.y * spanY);
        context.stroke();
      }

      const head = walkPoints[count - 1];
      context.fillStyle = "#f6c85f";
      context.beginPath();
      context.arc(startX + head.x * spanX, baseY - head.y * spanY, 3.4, 0, Math.PI * 2);
      context.fill();

      context.font = "600 13px Inter, sans-serif";
      context.fillStyle = "rgba(246, 200, 95, 0.8)";
      context.fillText("X_t", startX, baseY + 16);
    }

    function drawLabels(time: number) {
      context.font = "600 15px Inter, sans-serif";
      context.fillStyle = "rgba(247, 245, 239, 0.8)";
      context.fillText("E[Y | X]", width * 0.09, height * 0.2 + Math.sin(time * 0.002) * 4);
      context.fillStyle = "rgba(246, 200, 95, 0.86)";
      context.fillText("log L(theta)", width * 0.62, height * 0.52);
    }

    function draw(time: number) {
      const loop = motionQuery.matches ? 0.74 : (time % 7600) / 7600;
      const progress = ease(loop < 0.5 ? loop * 2 : 1);

      context.clearRect(0, 0, width, height);
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#071426");
      gradient.addColorStop(0.52, "#0e2d4d");
      gradient.addColorStop(1, "#123a52");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      drawGrid();
      const originX = width * 0.2;
      const originY = height * 0.76;
      const scaleX = width * 0.58;
      const scaleY = height * 0.54;
      drawAxes(originX, originY, progress);
      drawPoints(originX, originY, scaleX, scaleY, time);
      drawCurve(originX, originY, scaleX, scaleY, progress);
      drawGridTransform(width * 0.19, height * 0.7, Math.min(width, height) * 0.11, time);
      drawRandomWalk(width * 0.58, height * 0.84, width * 0.32, 118, progress);
      drawLabels(time);

      if (!motionQuery.matches && !document.hidden) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
      } else if (!motionQuery.matches) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!motionQuery.matches) animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="manim-canvas-wrap" aria-label="Animated mathematical visualization inspired by Manim">
      <canvas ref={canvasRef} />
    </div>
  );
}
