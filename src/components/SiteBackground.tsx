import { useEffect, useRef } from "react";

const dots = Array.from({ length: 52 }, (_, index) => ({
  x: ((index * 53) % 100) / 100,
  y: ((index * 31) % 100) / 100,
  phase: index * 0.7,
}));

const waveUnits = Array.from({ length: 120 }, (_, index) => index / 119);

type SiteBackgroundProps = {
  dark: boolean;
};

export function SiteBackground({ dark }: SiteBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(dark);
  darkRef.current = dark;

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
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function drawGraphPaper(time: number, lineColor: string, accentColor: string) {
      const minor = 36;
      const major = minor * 4;
      const driftX = (time * 0.006) % minor;
      const driftY = (time * 0.003) % minor;

      context.lineWidth = 1;
      context.strokeStyle = lineColor;
      for (let x = -minor + driftX; x <= width + minor; x += minor) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = -minor + driftY; y <= height + minor; y += minor) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.lineWidth = 1.25;
      context.strokeStyle = accentColor;
      for (let x = -major + driftX; x <= width + major; x += major) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = -major + driftY; y <= height + major; y += major) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    }

    function drawTransformMotif(centerX: number, centerY: number, extent: number, time: number, strokeColor: string) {
      const angle = 0.2 * Math.sin(time * 0.00025);
      const shear = 0.2 * Math.sin(time * 0.00018 + 0.6);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const m00 = cos + shear * sin;
      const m01 = -sin + shear * cos;
      const m10 = sin;
      const m11 = cos;

      function transform(x: number, y: number) {
        return { x: m00 * x + m01 * y, y: m10 * x + m11 * y };
      }

      const corners = [
        transform(-extent, -extent),
        transform(extent, -extent),
        transform(extent, extent),
        transform(-extent, extent),
      ];

      context.strokeStyle = strokeColor;
      context.lineWidth = 1.1;
      context.beginPath();
      corners.forEach((corner, index) => {
        const x = centerX + corner.x;
        const y = centerY - corner.y;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.closePath();
      context.stroke();
    }

    function drawParametricTrace(time: number, strokeColor: string, pointColor: string) {
      const centerX = width * 0.22;
      const centerY = height * 0.72;
      const radius = Math.min(width, height) * 0.11;
      const phase = time * 0.0005;

      context.strokeStyle = strokeColor;
      context.lineWidth = 1.6;
      context.beginPath();
      for (let step = 0; step <= 160; step += 1) {
        const angle = (step / 160) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius * (1 + 0.18 * Math.sin(3 * angle + phase));
        const y = centerY + Math.sin(angle) * radius * 0.58;
        if (step === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
      context.stroke();

      const moving = phase * 4;
      context.fillStyle = pointColor;
      context.beginPath();
      context.arc(centerX + Math.cos(moving) * radius, centerY + Math.sin(moving) * radius * 0.58, 3, 0, Math.PI * 2);
      context.fill();
    }

    function draw(time: number) {
      const light = !darkRef.current;
      const line = light ? "7, 20, 38" : "143, 188, 230";
      const accent = light ? "75, 156, 211" : "246, 200, 95";
      const graphLine = light ? "rgba(75, 156, 211, 0.115)" : "rgba(143, 188, 230, 0.09)";
      const graphAccent = light ? "rgba(1, 33, 105, 0.085)" : "rgba(246, 200, 95, 0.08)";

      context.clearRect(0, 0, width, height);
      drawGraphPaper(time, graphLine, graphAccent);

      dots.forEach((dot) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0006 + dot.phase);
        context.fillStyle = `rgba(${line}, ${0.035 + pulse * 0.06})`;
        context.beginPath();
        context.arc(dot.x * width, dot.y * height, 1.4, 0, Math.PI * 2);
        context.fill();
      });

      const waveY = height * 0.82;
      context.strokeStyle = `rgba(${accent}, 0.16)`;
      context.lineWidth = 1.4;
      context.beginPath();
      waveUnits.forEach((unit, index) => {
        const x = unit * width;
        const y = waveY + Math.sin(unit * Math.PI * 3 + time * 0.0003) * height * 0.03;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.stroke();

      drawParametricTrace(time, `rgba(${accent}, 0.13)`, `rgba(${accent}, 0.32)`);
      drawTransformMotif(width * 0.86, height * 0.18, Math.min(width, height) * 0.09, time, `rgba(${line}, 0.14)`);

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
    <div className="site-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
