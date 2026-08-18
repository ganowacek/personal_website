import { useEffect, useRef } from "react";

const dots = Array.from({ length: 52 }, (_, index) => ({
  x: ((index * 53) % 100) / 100,
  y: ((index * 31) % 100) / 100,
  phase: index * 0.7,
}));

const waveUnits = Array.from({ length: 120 }, (_, index) => index / 119);

const mathNotes = [
  { x: 0.08, y: 0.16, text: "∀ ε > 0  ∃ δ > 0", size: 18, phase: 0.1 },
  { x: 0.64, y: 0.13, text: "f: X → Y", size: 17, phase: 0.9 },
  { x: 0.78, y: 0.27, text: "π₁(X, x₀)", size: 18, phase: 1.8 },
  { x: 0.18, y: 0.38, text: "ker φ ⊂ G", size: 16, phase: 2.6 },
  { x: 0.53, y: 0.46, text: "sup S", size: 20, phase: 3.2 },
  { x: 0.87, y: 0.55, text: "Hₙ(X)", size: 17, phase: 4.1 },
  { x: 0.1, y: 0.66, text: "compact ⇒ closed", size: 15, phase: 4.9 },
  { x: 0.42, y: 0.75, text: "A ⊆ X", size: 18, phase: 5.7 },
  { x: 0.72, y: 0.84, text: "∂² = 0", size: 19, phase: 6.4 },
  { x: 0.31, y: 0.21, text: "lim aₙ = L", size: 16, phase: 7.3 },
  { x: 0.9, y: 0.18, text: "U ∩ V", size: 17, phase: 8.1 },
  { x: 0.58, y: 0.68, text: "∫γ f dz = 0", size: 16, phase: 8.9 },
];

const proofFragments = [
  { x: 0.04, y: 0.48, lines: ["Lemma.", "Assume X is compact.", "Take an open cover {Uᵢ}."], phase: 0.4 },
  { x: 0.69, y: 0.37, lines: ["Claim.", "φ(ab)=φ(a)φ(b)", "hence ker φ is normal."], phase: 2.2 },
  { x: 0.34, y: 0.57, lines: ["Proof.", "Let p ∈ cl(A).", "Every nbhd meets A."], phase: 3.8 },
];

const scribbleBands = Array.from({ length: 9 }, (_, index) => ({
  x: ((index * 29 + 8) % 100) / 100,
  y: ((index * 47 + 14) % 100) / 100,
  width: 0.12 + ((index * 7) % 8) / 100,
  phase: index * 0.85,
}));

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

    function drawNotebookScribbles(time: number, lineColor: string, accentColor: string, inkColor: string) {
      context.save();
      context.lineCap = "round";
      context.lineJoin = "round";

      scribbleBands.forEach((band, bandIndex) => {
        const originX = band.x * width;
        const originY = band.y * height;
        const bandWidth = band.width * width;
        const amplitude = 5 + (bandIndex % 3) * 3;
        const drift = Math.sin(time * 0.00022 + band.phase) * 10;

        context.strokeStyle = lineColor;
        context.lineWidth = 1.05;
        context.beginPath();
        for (let step = 0; step <= 44; step += 1) {
          const t = step / 44;
          const x = originX + t * bandWidth + drift;
          const y = originY + Math.sin(t * Math.PI * 5 + band.phase + time * 0.00036) * amplitude;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
      });

      mathNotes.forEach((note) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.00028 + note.phase);
        context.save();
        context.translate(note.x * width, note.y * height);
        context.rotate(Math.sin(note.phase) * 0.035);
        context.font = `${note.size}px Fraunces, Georgia, serif`;
        context.fillStyle = `rgba(${inkColor}, ${0.055 + pulse * 0.035})`;
        context.fillText(note.text, 0, 0);
        context.restore();
      });

      proofFragments.forEach((fragment) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.0002 + fragment.phase);
        const x = fragment.x * width;
        const y = fragment.y * height;
        context.font = "13px Fraunces, Georgia, serif";
        context.fillStyle = `rgba(${inkColor}, ${0.045 + pulse * 0.025})`;
        fragment.lines.forEach((lineText, lineIndex) => {
          context.fillText(lineText, x, y + lineIndex * 18);
        });
      });

      const diagramX = width * 0.76;
      const diagramY = height * 0.68;
      const wobble = Math.sin(time * 0.0003) * 4;
      context.strokeStyle = accentColor;
      context.fillStyle = accentColor;
      context.lineWidth = 1.2;
      [
        [diagramX, diagramY],
        [diagramX + 78, diagramY + wobble],
        [diagramX + 36, diagramY + 64],
        [diagramX + 116, diagramY + 62 - wobble],
      ].forEach(([x, y], index, nodes) => {
        if (index < nodes.length - 1) {
          const [nextX, nextY] = nodes[index + 1];
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(nextX, nextY);
          context.stroke();
        }
        context.beginPath();
        context.arc(x, y, 2.4, 0, Math.PI * 2);
        context.fill();
      });

      const topologyX = width * 0.2;
      const topologyY = height * 0.52;
      context.strokeStyle = lineColor;
      context.lineWidth = 1.1;
      for (let loop = 0; loop < 3; loop += 1) {
        context.beginPath();
        for (let step = 0; step <= 120; step += 1) {
          const t = (step / 120) * Math.PI * 2;
          const x = topologyX + Math.cos(t) * (46 + loop * 18) + Math.sin(t * 3 + time * 0.00025) * 5;
          const y = topologyY + Math.sin(t) * (28 + loop * 12) + Math.cos(t * 2 + loop) * 4;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.stroke();
      }

      context.restore();
    }

    function draw(time: number) {
      const light = !darkRef.current;
      const line = light ? "7, 20, 38" : "143, 188, 230";
      const accent = light ? "75, 156, 211" : "246, 200, 95";
      const graphLine = light ? "rgba(75, 156, 211, 0.115)" : "rgba(143, 188, 230, 0.09)";
      const graphAccent = light ? "rgba(1, 33, 105, 0.085)" : "rgba(246, 200, 95, 0.08)";
      const notation = light ? "1, 33, 105" : "247, 245, 239";
      const scribbleLine = light ? `rgba(${line}, 0.075)` : `rgba(${line}, 0.065)`;
      const scribbleAccent = light ? `rgba(${accent}, 0.13)` : `rgba(${accent}, 0.11)`;

      context.clearRect(0, 0, width, height);
      drawGraphPaper(time, graphLine, graphAccent);
      drawNotebookScribbles(time, scribbleLine, scribbleAccent, notation);

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
