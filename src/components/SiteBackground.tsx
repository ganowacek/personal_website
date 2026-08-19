import { useEffect, useRef } from "react";

const dots = Array.from({ length: 52 }, (_, index) => ({
  x: ((index * 53) % 100) / 100,
  y: ((index * 31) % 100) / 100,
  phase: index * 0.7,
}));

const waveUnits = Array.from({ length: 120 }, (_, index) => index / 119);

const handwrittenFont = '"Bradley Hand", "Segoe Print", "Chalkboard SE", "Comic Sans MS", cursive';
const handwrittenSize = 17;
const handwrittenAlpha = 0.105;

const mathNotes = [
  { x: 0.06, y: 0.15, text: "∀ε>0 ∃δ>0", phase: 0.1, rotate: -0.05 },
  { x: 0.28, y: 0.12, text: "lim a_n = L", phase: 0.7, rotate: 0.03 },
  { x: 0.51, y: 0.14, text: "f: X → Y", phase: 1.2, rotate: -0.02 },
  { x: 0.78, y: 0.13, text: "π₁(X,x₀)", phase: 1.8, rotate: 0.04 },
  { x: 0.13, y: 0.29, text: "U ∩ V", phase: 2.3, rotate: 0.02 },
  { x: 0.36, y: 0.31, text: "ker φ ⊲ G", phase: 2.9, rotate: -0.04 },
  { x: 0.63, y: 0.29, text: "A ⊆ X", phase: 3.4, rotate: 0.05 },
  { x: 0.86, y: 0.32, text: "sup S", phase: 4.0, rotate: -0.03 },
  { x: 0.08, y: 0.46, text: "cl(A)", phase: 4.6, rotate: 0.04 },
  { x: 0.47, y: 0.46, text: "∂² = 0", phase: 5.1, rotate: -0.02 },
  { x: 0.72, y: 0.49, text: "H_n(X)", phase: 5.7, rotate: 0.03 },
  { x: 0.19, y: 0.62, text: "compact ⇒ closed", phase: 6.2, rotate: -0.04 },
  { x: 0.56, y: 0.64, text: "∫_γ f dz = 0", phase: 6.8, rotate: 0.02 },
  { x: 0.82, y: 0.66, text: "χ(S²)=2", phase: 7.3, rotate: -0.05 },
  { x: 0.09, y: 0.82, text: "Z/nZ", phase: 7.9, rotate: 0.04 },
  { x: 0.34, y: 0.83, text: "Hom(A,B)", phase: 8.4, rotate: -0.03 },
  { x: 0.63, y: 0.82, text: "rank T", phase: 9.0, rotate: 0.03 },
  { x: 0.87, y: 0.84, text: "∇×∇f=0", phase: 9.5, rotate: -0.02 },
];

const proofFragments = [
  { x: 0.04, y: 0.55, lines: ["Lemma.", "Assume X compact.", "Take {U_i}."], phase: 0.4 },
  { x: 0.66, y: 0.39, lines: ["Claim.", "φ(ab)=φ(a)φ(b)", "ker φ normal."], phase: 2.2 },
  { x: 0.34, y: 0.57, lines: ["Proof.", "Let p ∈ cl(A).", "Every nbhd meets A."], phase: 3.8 },
];

const scribbleBands = Array.from({ length: 11 }, (_, index) => ({
  x: ((index * 29 + 8) % 100) / 100,
  y: ((index * 47 + 14) % 100) / 100,
  width: 0.12 + ((index * 7) % 8) / 100,
  phase: index * 0.85,
}));

const notebookDiagrams = [
  { type: "triangle", x: 0.18, y: 0.2, scale: 0.8, phase: 1.1 },
  { type: "venn", x: 0.42, y: 0.2, scale: 0.72, phase: 2.5 },
  { type: "square", x: 0.68, y: 0.2, scale: 0.78, phase: 3.9 },
  { type: "cover", x: 0.9, y: 0.43, scale: 0.82, phase: 5.2 },
  { type: "topology", x: 0.23, y: 0.51, scale: 0.86, phase: 6.1 },
  { type: "lattice", x: 0.77, y: 0.63, scale: 0.84, phase: 7.4 },
  { type: "numberLine", x: 0.32, y: 0.72, scale: 0.78, phase: 8.8 },
  { type: "torus", x: 0.58, y: 0.76, scale: 0.76, phase: 10.2 },
];

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

    function drawNotebookScribbles(time: number, inkColor: string) {
      const scale = Math.max(0.7, Math.min(1, width / 1280));

      function floatX(phase: number) {
        return Math.sin(time * 0.00016 + phase) * 5 * scale;
      }

      function floatY(phase: number) {
        return Math.cos(time * 0.00013 + phase) * 4 * scale;
      }

      function drawArrow(fromX: number, fromY: number, toX: number, toY: number) {
        const angle = Math.atan2(toY - fromY, toX - fromX);
        const head = 6 * scale;

        context.beginPath();
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();

        context.beginPath();
        context.moveTo(toX, toY);
        context.lineTo(toX - Math.cos(angle - 0.45) * head, toY - Math.sin(angle - 0.45) * head);
        context.moveTo(toX, toY);
        context.lineTo(toX - Math.cos(angle + 0.45) * head, toY - Math.sin(angle + 0.45) * head);
        context.stroke();
      }

      function drawTriangle(cx: number, cy: number, size: number) {
        const half = size * 0.5;
        context.beginPath();
        context.moveTo(cx, cy - half);
        context.lineTo(cx - half, cy + half);
        context.lineTo(cx + half, cy + half);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.moveTo(cx, cy - half);
        context.lineTo(cx, cy + half);
        context.moveTo(cx - half * 0.55, cy + half);
        context.lineTo(cx + half * 0.42, cy - half * 0.08);
        context.stroke();
      }

      function drawVenn(cx: number, cy: number, size: number) {
        context.beginPath();
        context.ellipse(cx - size * 0.22, cy, size * 0.38, size * 0.28, -0.18, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.ellipse(cx + size * 0.22, cy, size * 0.38, size * 0.28, 0.18, 0, Math.PI * 2);
        context.stroke();
      }

      function drawCommutativeSquare(cx: number, cy: number, size: number) {
        const half = size * 0.42;
        drawArrow(cx - half, cy - half, cx + half, cy - half);
        drawArrow(cx - half, cy + half, cx + half, cy + half);
        drawArrow(cx - half, cy - half, cx - half, cy + half);
        drawArrow(cx + half, cy - half, cx + half, cy + half);
        context.fillText("A", cx - half - 13, cy - half - 6);
        context.fillText("B", cx + half + 5, cy - half - 6);
        context.fillText("C", cx - half - 13, cy + half + 18);
        context.fillText("D", cx + half + 5, cy + half + 18);
      }

      function drawOpenCover(cx: number, cy: number, size: number) {
        for (let index = 0; index < 4; index += 1) {
          context.beginPath();
          context.ellipse(
            cx + Math.cos(index * 1.7) * size * 0.2,
            cy + Math.sin(index * 1.2) * size * 0.12,
            size * 0.24,
            size * 0.16,
            index * 0.45,
            0,
            Math.PI * 2,
          );
          context.stroke();
        }
      }

      function drawTopologyLoops(cx: number, cy: number, size: number) {
        for (let loop = 0; loop < 3; loop += 1) {
          context.beginPath();
          for (let step = 0; step <= 120; step += 1) {
            const t = (step / 120) * Math.PI * 2;
            const x = cx + Math.cos(t) * (size * 0.3 + loop * size * 0.11) + Math.sin(t * 3 + time * 0.00018) * 4;
            const y = cy + Math.sin(t) * (size * 0.18 + loop * size * 0.08) + Math.cos(t * 2 + loop) * 3;
            if (step === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }
          context.closePath();
          context.stroke();
        }
      }

      function drawLattice(cx: number, cy: number, size: number) {
        const points = [
          [0, -0.45],
          [-0.38, -0.08],
          [0.38, -0.08],
          [-0.22, 0.34],
          [0.22, 0.34],
        ];
        const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 3], [2, 4]];
        edges.forEach(([from, to]) => {
          const [fromX, fromY] = points[from];
          const [toX, toY] = points[to];
          context.beginPath();
          context.moveTo(cx + fromX * size, cy + fromY * size);
          context.lineTo(cx + toX * size, cy + toY * size);
          context.stroke();
        });
        points.forEach(([x, y]) => {
          context.beginPath();
          context.arc(cx + x * size, cy + y * size, 2.4 * scale, 0, Math.PI * 2);
          context.fill();
        });
      }

      function drawNumberLine(cx: number, cy: number, size: number) {
        context.beginPath();
        context.moveTo(cx - size * 0.5, cy);
        context.lineTo(cx + size * 0.5, cy);
        context.stroke();
        for (let tick = -2; tick <= 2; tick += 1) {
          const x = cx + tick * size * 0.18;
          context.beginPath();
          context.moveTo(x, cy - 5 * scale);
          context.lineTo(x, cy + 5 * scale);
          context.stroke();
          context.fillText(`${tick}`, x - 4 * scale, cy + 22 * scale);
        }
      }

      function drawTorus(cx: number, cy: number, size: number) {
        context.beginPath();
        context.ellipse(cx, cy, size * 0.42, size * 0.24, 0, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.ellipse(cx, cy, size * 0.18, size * 0.1, 0, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.ellipse(cx, cy, size * 0.42, size * 0.13, 0, 0, Math.PI);
        context.stroke();
      }

      context.save();
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = inkColor;
      context.fillStyle = inkColor;
      context.lineWidth = 1.15 * scale;
      context.font = `${handwrittenSize * scale}px ${handwrittenFont}`;
      context.textBaseline = "alphabetic";

      scribbleBands.forEach((band, bandIndex) => {
        const originX = band.x * width + floatX(band.phase);
        const originY = band.y * height + floatY(band.phase);
        const bandWidth = band.width * width;
        const amplitude = 5 + (bandIndex % 3) * 3;

        context.beginPath();
        for (let step = 0; step <= 44; step += 1) {
          const t = step / 44;
          const x = originX + t * bandWidth;
          const y = originY + Math.sin(t * Math.PI * 5 + band.phase + time * 0.00036) * amplitude;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
      });

      mathNotes.forEach((note) => {
        context.save();
        context.translate(note.x * width + floatX(note.phase), note.y * height + floatY(note.phase));
        context.rotate(note.rotate + Math.sin(time * 0.00012 + note.phase) * 0.012);
        context.fillText(note.text, 0, 0);
        context.restore();
      });

      proofFragments.forEach((fragment) => {
        const x = fragment.x * width + floatX(fragment.phase);
        const y = fragment.y * height + floatY(fragment.phase);
        fragment.lines.forEach((lineText, lineIndex) => {
          context.fillText(lineText, x, y + lineIndex * handwrittenSize * 1.12 * scale);
        });
      });

      notebookDiagrams.forEach((diagram) => {
        const x = diagram.x * width + floatX(diagram.phase);
        const y = diagram.y * height + floatY(diagram.phase);
        const size = Math.min(width, height) * 0.12 * diagram.scale;

        context.save();
        context.translate(x, y);
        context.rotate(Math.sin(diagram.phase) * 0.04);
        context.translate(-x, -y);
        switch (diagram.type) {
          case "triangle":
            drawTriangle(x, y, size);
            break;
          case "venn":
            drawVenn(x, y, size);
            break;
          case "square":
            drawCommutativeSquare(x, y, size);
            break;
          case "cover":
            drawOpenCover(x, y, size);
            break;
          case "topology":
            drawTopologyLoops(x, y, size);
            break;
          case "lattice":
            drawLattice(x, y, size);
            break;
          case "numberLine":
            drawNumberLine(x, y, size);
            break;
          case "torus":
            drawTorus(x, y, size);
            break;
          default:
            break;
        }
        context.restore();
      });

      context.restore();
    }

    function draw(time: number) {
      const light = !darkRef.current;
      const graphLine = light ? "rgba(75, 156, 211, 0.115)" : "rgba(143, 188, 230, 0.09)";
      const graphAccent = light ? "rgba(1, 33, 105, 0.085)" : "rgba(246, 200, 95, 0.08)";
      const notebookInk = light
        ? `rgba(1, 33, 105, ${handwrittenAlpha})`
        : `rgba(247, 245, 239, ${handwrittenAlpha})`;

      context.clearRect(0, 0, width, height);
      drawGraphPaper(time, graphLine, graphAccent);
      drawNotebookScribbles(time, notebookInk);

      dots.forEach((dot) => {
        const drift = Math.sin(time * 0.00022 + dot.phase) * 3;
        context.fillStyle = notebookInk;
        context.beginPath();
        context.arc(dot.x * width + drift, dot.y * height - drift, 1.35, 0, Math.PI * 2);
        context.fill();
      });

      const waveY = height * 0.82;
      context.strokeStyle = notebookInk;
      context.lineWidth = 1.4;
      context.beginPath();
      waveUnits.forEach((unit, index) => {
        const x = unit * width;
        const y = waveY + Math.sin(unit * Math.PI * 3 + time * 0.0003) * height * 0.03;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.stroke();

      drawParametricTrace(time, notebookInk, notebookInk);
      drawTransformMotif(width * 0.86, height * 0.18, Math.min(width, height) * 0.09, time, notebookInk);

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
