import { useEffect, useRef } from "react";

const points = Array.from({ length: 72 }, (_, index) => {
  const x = ((index * 37) % 100) / 100;
  const wave = Math.sin(index * 1.37) * 0.13 + Math.cos(index * 0.61) * 0.08;
  return { x, y: 0.72 - 0.46 / (1 + Math.exp(-8 * (x - 0.48))) + wave };
});

const heatCells = Array.from({ length: 56 }, (_, index) => ({
  x: index % 8,
  y: Math.floor(index / 8),
  value: ((index * 19) % 31) / 31,
}));

const bars = [0.18, 0.28, 0.42, 0.62, 0.78, 0.7, 0.54, 0.36, 0.24, 0.16];

function ease(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function drawRoundRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
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

    function drawHistogram(time: number) {
      const startX = width * 0.58;
      const baseY = height * 0.84;
      const barWidth = Math.max(7, width * 0.028);
      bars.forEach((bar, index) => {
        const heightPulse = bar * (0.86 + 0.14 * Math.sin(time * 0.002 + index * 0.65));
        context.fillStyle = index > 5 ? "rgba(246, 200, 95, 0.62)" : "rgba(75, 156, 211, 0.5)";
        drawRoundRect(context, startX + index * (barWidth + 5), baseY - heightPulse * 118, barWidth, heightPulse * 118, 4);
      });
    }

    function drawHeatmap(time: number) {
      const size = Math.min(width, height) * 0.042;
      const startX = width * 0.09;
      const startY = height * 0.58;
      heatCells.forEach((cell) => {
        const opacity = 0.08 + Math.abs(Math.sin(time * 0.0015 + cell.value * 5)) * 0.58;
        context.fillStyle = `rgba(75, 156, 211, ${opacity})`;
        drawRoundRect(context, startX + cell.x * (size + 3), startY + cell.y * (size + 3), size, size, 3);
      });
    }

    function drawLabels(time: number) {
      context.font = "600 15px Inter, sans-serif";
      context.fillStyle = "rgba(247, 245, 239, 0.8)";
      context.fillText("E[Y | X]", width * 0.09, height * 0.2 + Math.sin(time * 0.002) * 4);
      context.fillText("theta -> model -> insight", width * 0.5, height * 0.24 + Math.cos(time * 0.0018) * 4);
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
      drawHeatmap(time);
      drawHistogram(time);
      drawLabels(time);

      if (!motionQuery.matches) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    if (!motionQuery.matches) animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="manim-canvas-wrap" aria-label="Animated mathematical visualization inspired by Manim">
      <canvas ref={canvasRef} />
    </div>
  );
}
