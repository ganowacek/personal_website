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
  { x: 0.16, y: 0.08, text: "T: V → W", phase: 0.35, rotate: 0.04 },
  { x: 0.28, y: 0.12, text: "lim a_n = L", phase: 0.7, rotate: 0.03 },
  { x: 0.39, y: 0.08, text: "N ⊲ G", phase: 0.95, rotate: -0.03 },
  { x: 0.51, y: 0.14, text: "f: X → Y", phase: 1.2, rotate: -0.02 },
  { x: 0.61, y: 0.08, text: "∀x∈X", phase: 1.45, rotate: 0.05 },
  { x: 0.78, y: 0.13, text: "π₁(X,x₀)", phase: 1.8, rotate: 0.04 },
  { x: 0.91, y: 0.09, text: "im f", phase: 2.05, rotate: -0.04 },
  { x: 0.13, y: 0.29, text: "U ∩ V", phase: 2.3, rotate: 0.02 },
  { x: 0.24, y: 0.25, text: "A ∪ B", phase: 2.55, rotate: -0.05 },
  { x: 0.36, y: 0.31, text: "ker φ ⊲ G", phase: 2.9, rotate: -0.04 },
  { x: 0.48, y: 0.26, text: "dim V = n", phase: 3.15, rotate: 0.03 },
  { x: 0.63, y: 0.29, text: "A ⊆ X", phase: 3.4, rotate: 0.05 },
  { x: 0.74, y: 0.24, text: "∀g∈G", phase: 3.65, rotate: -0.02 },
  { x: 0.86, y: 0.32, text: "sup S", phase: 4.0, rotate: -0.03 },
  { x: 0.95, y: 0.27, text: "id_X", phase: 4.25, rotate: 0.04 },
  { x: 0.08, y: 0.46, text: "cl(A)", phase: 4.6, rotate: 0.04 },
  { x: 0.21, y: 0.42, text: "open cover", phase: 4.85, rotate: -0.04 },
  { x: 0.34, y: 0.43, text: "a | b", phase: 4.95, rotate: 0.02 },
  { x: 0.47, y: 0.46, text: "∂² = 0", phase: 5.1, rotate: -0.02 },
  { x: 0.58, y: 0.41, text: "x ≡ y mod n", phase: 5.45, rotate: 0.04 },
  { x: 0.72, y: 0.49, text: "H_n(X)", phase: 5.7, rotate: 0.03 },
  { x: 0.84, y: 0.46, text: "φ∘ψ", phase: 5.95, rotate: -0.05 },
  { x: 0.19, y: 0.62, text: "compact ⇒ closed", phase: 6.2, rotate: -0.04 },
  { x: 0.39, y: 0.64, text: "∀U∋p", phase: 6.45, rotate: 0.03 },
  { x: 0.56, y: 0.64, text: "∫_γ f dz = 0", phase: 6.8, rotate: 0.02 },
  { x: 0.69, y: 0.61, text: "Spec R", phase: 7.05, rotate: -0.02 },
  { x: 0.82, y: 0.66, text: "χ(S²)=2", phase: 7.3, rotate: -0.05 },
  { x: 0.94, y: 0.61, text: "Aut(G)", phase: 7.55, rotate: 0.05 },
  { x: 0.09, y: 0.82, text: "Z/nZ", phase: 7.9, rotate: 0.04 },
  { x: 0.2, y: 0.77, text: "Cauchy", phase: 8.15, rotate: -0.03 },
  { x: 0.34, y: 0.83, text: "Hom(A,B)", phase: 8.4, rotate: -0.03 },
  { x: 0.48, y: 0.78, text: "∀α∈I", phase: 8.65, rotate: 0.04 },
  { x: 0.63, y: 0.82, text: "rank T", phase: 9.0, rotate: 0.03 },
  { x: 0.75, y: 0.78, text: "Gal(L/K)", phase: 9.25, rotate: -0.05 },
  { x: 0.87, y: 0.84, text: "∇×∇f=0", phase: 9.5, rotate: -0.02 },
  { x: 0.96, y: 0.79, text: "QED", phase: 9.75, rotate: 0.04 },
  { x: 0.04, y: 0.06, text: "P(A∩B)=P(A)P(B|A)", phase: 10.1, rotate: -0.03 },
  { x: 0.22, y: 0.18, text: "E[X], Var(X)", phase: 10.45, rotate: 0.04 },
  { x: 0.44, y: 0.18, text: "Σ p_i = 1", phase: 10.8, rotate: -0.05 },
  { x: 0.68, y: 0.18, text: "P(θ|x) ∝ P(x|θ)P(θ)", phase: 11.15, rotate: 0.02 },
  { x: 0.88, y: 0.18, text: "x̄_n → N(μ,σ²/n)", phase: 11.5, rotate: -0.04 },
  { x: 0.03, y: 0.23, text: "argmax_θ L(θ|x)", phase: 11.85, rotate: 0.05 },
  { x: 0.31, y: 0.23, text: "iid ✓✓✓", phase: 12.2, rotate: -0.02 },
  { x: 0.55, y: 0.23, text: "lim sup", phase: 12.55, rotate: 0.03 },
  { x: 0.57, y: 0.26, text: "lim inf", phase: 12.75, rotate: 0.03 },
  { x: 0.72, y: 0.35, text: "is this compact??", phase: 13.1, rotate: -0.05 },
  { x: 0.91, y: 0.38, text: "B(x,r)", phase: 13.45, rotate: 0.04 },
  { x: 0.03, y: 0.69, text: "⊂  vs  ⊆", phase: 13.8, rotate: -0.02 },
  { x: 0.41, y: 0.7, text: "Ax = λx", phase: 14.15, rotate: 0.05 },
  { x: 0.51, y: 0.72, text: "det(A)=0", phase: 14.5, rotate: -0.04 },
  { x: 0.63, y: 0.71, text: "singular!", phase: 14.85, rotate: 0.04 },
  { x: 0.78, y: 0.71, text: "A^T, A^-1", phase: 15.2, rotate: -0.03 },
  { x: 0.09, y: 0.91, text: "rank(A)+nullity(A)=n", phase: 15.55, rotate: 0.03 },
  { x: 0.32, y: 0.91, text: "∂f/∂x, ∂f/∂y", phase: 15.9, rotate: -0.04 },
  { x: 0.54, y: 0.91, text: "dy/dx = ky", phase: 16.25, rotate: 0.05 },
  { x: 0.76, y: 0.91, text: "x_{n+1}=x_n-f/f'", phase: 16.6, rotate: -0.02 },
  { x: 0.92, y: 0.91, text: "Δx → 0", phase: 16.95, rotate: 0.04 },
  { x: 0.05, y: 0.33, text: "∇f(x)=0", phase: 17.3, rotate: -0.05 },
  { x: 0.25, y: 0.34, text: "θ ← θ - α∇L(θ)", phase: 17.65, rotate: 0.03 },
  { x: 0.42, y: 0.36, text: "L1  vs  L2", phase: 18.0, rotate: -0.02 },
  { x: 0.57, y: 0.36, text: "λ||w||²", phase: 18.35, rotate: 0.04 },
  { x: 0.8, y: 0.56, text: "n!/(n-k)!", phase: 18.7, rotate: -0.04 },
  { x: 0.14, y: 0.74, text: "( n )", phase: 19.05, rotate: 0.02 },
  { x: 0.145, y: 0.775, text: "( k )", phase: 19.1, rotate: 0.02 },
  { x: 0.27, y: 0.86, text: "∃ ∀ ¬ ∧ ∨", phase: 19.4, rotate: -0.03 },
  { x: 0.44, y: 0.87, text: "O(n log n)", phase: 19.75, rotate: 0.05 },
  { x: 0.58, y: 0.86, text: "{} [] ()", phase: 20.1, rotate: -0.04 },
  { x: 0.73, y: 0.86, text: "base case?", phase: 20.45, rotate: 0.03 },
  { x: 0.86, y: 0.88, text: "SELECT * FROM sanity", phase: 20.8, rotate: -0.02 },
  { x: 0.04, y: 0.96, text: "F = ma", phase: 21.15, rotate: 0.04 },
  { x: 0.2, y: 0.96, text: "PV = nRT", phase: 21.5, rotate: -0.04 },
  { x: 0.38, y: 0.96, text: "office hours???", phase: 21.85, rotate: 0.02 },
  { x: 0.6, y: 0.96, text: "check this later", phase: 22.2, rotate: -0.03 },
  { x: 0.82, y: 0.96, text: "Σ  ∏  ∞", phase: 22.55, rotate: 0.04 },
];

const proofFragments = [
  { x: 0.05, y: 0.37, lines: ["Given ε.", "Choose δ.", "|x-a|<δ."], phase: 0.15 },
  { x: 0.04, y: 0.55, lines: ["Lemma.", "Assume X compact.", "Take {U_i}."], phase: 0.4 },
  { x: 0.24, y: 0.72, lines: ["Suppose.", "U,V open.", "Then U∩V open."], phase: 1.3 },
  { x: 0.49, y: 0.33, lines: ["Let G act on X.", "stab(x) ≤ G."], phase: 1.7 },
  { x: 0.66, y: 0.39, lines: ["Claim.", "φ(ab)=φ(a)φ(b)", "ker φ normal."], phase: 2.2 },
  { x: 0.34, y: 0.57, lines: ["Proof.", "Let p ∈ cl(A).", "Every nbhd meets A."], phase: 3.8 },
  { x: 0.73, y: 0.74, lines: ["If f continuous,", "preimage(open)", "is open."], phase: 4.6 },
  { x: 0.88, y: 0.52, lines: ["Basis β.", "span β = V.", "β independent."], phase: 5.4 },
  { x: 0.11, y: 0.5, lines: ["Taylor:", "f(a)+f'(a)(x-a)", "+ ..."], phase: 6.1 },
  { x: 0.29, y: 0.49, lines: ["95% CI:", "x̄ ± 1.96 σ/√n"], phase: 6.9 },
  { x: 0.53, y: 0.53, lines: ["local min?", "or just tired?"], phase: 7.7 },
  { x: 0.69, y: 0.12, lines: ["reject H0?", "p < 0.05", "cross out."], phase: 8.5 },
  { x: 0.87, y: 0.24, lines: ["span{v1,v2}", "draw box"], phase: 9.3 },
];

const scribbleBands = Array.from({ length: 20 }, (_, index) => ({
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
  { type: "triangle", x: 0.08, y: 0.72, scale: 0.7, phase: 11.1 },
  { type: "venn", x: 0.53, y: 0.55, scale: 0.66, phase: 12.4 },
  { type: "square", x: 0.92, y: 0.75, scale: 0.7, phase: 13.7 },
  { type: "cover", x: 0.31, y: 0.36, scale: 0.68, phase: 14.6 },
  { type: "lattice", x: 0.11, y: 0.88, scale: 0.72, phase: 15.8 },
  { type: "numberLine", x: 0.69, y: 0.9, scale: 0.72, phase: 16.9 },
  { type: "bellCurve", x: 0.18, y: 0.39, scale: 0.82, phase: 17.8 },
  { type: "neighborhood", x: 0.39, y: 0.39, scale: 0.74, phase: 18.7 },
  { type: "zigzag", x: 0.61, y: 0.34, scale: 0.76, phase: 19.6 },
  { type: "eigenvectors", x: 0.77, y: 0.36, scale: 0.72, phase: 20.5 },
  { type: "matrix", x: 0.13, y: 0.61, scale: 0.72, phase: 21.4 },
  { type: "lossBowl", x: 0.45, y: 0.61, scale: 0.76, phase: 22.3 },
  { type: "pascal", x: 0.61, y: 0.59, scale: 0.72, phase: 23.2 },
  { type: "graph", x: 0.91, y: 0.63, scale: 0.74, phase: 24.1 },
  { type: "binaryTree", x: 0.22, y: 0.9, scale: 0.7, phase: 25.0 },
  { type: "poissonDots", x: 0.5, y: 0.82, scale: 0.7, phase: 25.9 },
  { type: "bracket", x: 0.82, y: 0.82, scale: 0.72, phase: 26.8 },
  { type: "spiral", x: 0.95, y: 0.9, scale: 0.7, phase: 27.7 },
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

    function drawGraphPaper(lineColor: string, accentColor: string) {
      const minor = 36;
      const major = minor * 4;
      const driftX = 0;
      const driftY = 0;

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

      function drawBellCurve(cx: number, cy: number, size: number) {
        context.beginPath();
        for (let step = 0; step <= 80; step += 1) {
          const t = -2.8 + (step / 80) * 5.6;
          const x = cx + (t / 2.8) * size * 0.5;
          const y = cy - Math.exp(-(t * t) / 2) * size * 0.38;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
        context.beginPath();
        context.moveTo(cx + size * 0.2, cy);
        for (let step = 0; step <= 24; step += 1) {
          const t = 0.9 + (step / 24) * 1.6;
          context.lineTo(cx + (t / 2.8) * size * 0.5, cy - Math.exp(-(t * t) / 2) * size * 0.38);
        }
        context.lineTo(cx + size * 0.5, cy);
        context.stroke();
      }

      function drawNeighborhood(cx: number, cy: number, size: number) {
        context.beginPath();
        context.arc(cx, cy, size * 0.34, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.arc(cx, cy, size * 0.18, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.arc(cx + size * 0.05, cy - size * 0.04, 2.4 * scale, 0, Math.PI * 2);
        context.fill();
        context.fillText("ε", cx + size * 0.22, cy - size * 0.2);
        context.fillText("δ", cx + size * 0.09, cy - size * 0.08);
      }

      function drawZigzag(cx: number, cy: number, size: number) {
        context.beginPath();
        for (let step = 0; step <= 10; step += 1) {
          const x = cx - size * 0.5 + step * size * 0.1;
          const y = cy + (step % 2 === 0 ? -size * 0.18 : size * 0.18);
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
      }

      function drawEigenvectors(cx: number, cy: number, size: number) {
        for (let ray = 0; ray < 5; ray += 1) {
          const angle = -Math.PI * 0.85 + ray * Math.PI * 0.42;
          drawArrow(cx, cy, cx + Math.cos(angle) * size * 0.42, cy + Math.sin(angle) * size * 0.42);
        }
        context.beginPath();
        context.arc(cx, cy, 2.5 * scale, 0, Math.PI * 2);
        context.fill();
      }

      function drawMatrix(cx: number, cy: number, size: number) {
        const left = cx - size * 0.34;
        const right = cx + size * 0.34;
        const top = cy - size * 0.28;
        const bottom = cy + size * 0.28;
        context.beginPath();
        context.moveTo(left + size * 0.08, top);
        context.lineTo(left, top);
        context.lineTo(left, bottom);
        context.lineTo(left + size * 0.08, bottom);
        context.moveTo(right - size * 0.08, top);
        context.lineTo(right, top);
        context.lineTo(right, bottom);
        context.lineTo(right - size * 0.08, bottom);
        context.stroke();
        [["1", "0", "a"], ["0", "λ", "b"], ["0", "0", "1"]].forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            context.fillText(value, left + size * 0.18 + colIndex * size * 0.2, top + size * 0.18 + rowIndex * size * 0.18);
          });
        });
      }

      function drawLossBowl(cx: number, cy: number, size: number) {
        context.beginPath();
        for (let step = 0; step <= 80; step += 1) {
          const t = -1 + (step / 80) * 2;
          const x = cx + t * size * 0.45;
          const y = cy + (t * t - 0.4) * size * 0.38;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
        const dotX = cx + Math.sin(time * 0.0005) * size * 0.18;
        const dotY = cy + ((dotX - cx) / (size * 0.45)) ** 2 * size * 0.38 - size * 0.15;
        context.beginPath();
        context.arc(dotX, dotY, 2.8 * scale, 0, Math.PI * 2);
        context.fill();
      }

      function drawPascal(cx: number, cy: number, size: number) {
        const rows = [["1"], ["1", "1"], ["1", "2", "1"], ["1", "3", "3", "1"]];
        rows.forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            const x = cx + (colIndex - (row.length - 1) / 2) * size * 0.18;
            const y = cy + rowIndex * size * 0.15;
            context.fillText(value, x, y);
          });
        });
      }

      function drawGraph(cx: number, cy: number, size: number) {
        const nodes = [
          [-0.35, -0.1],
          [-0.12, -0.34],
          [0.18, -0.22],
          [0.35, 0.08],
          [0.04, 0.28],
          [-0.28, 0.22],
        ];
        const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 4]];
        edges.forEach(([from, to], edgeIndex) => {
          if (edgeIndex === 2) return;
          const [fromX, fromY] = nodes[from];
          const [toX, toY] = nodes[to];
          context.beginPath();
          context.moveTo(cx + fromX * size, cy + fromY * size);
          context.lineTo(cx + toX * size, cy + toY * size);
          context.stroke();
        });
        nodes.forEach(([x, y]) => {
          context.beginPath();
          context.arc(cx + x * size, cy + y * size, 2.7 * scale, 0, Math.PI * 2);
          context.fill();
        });
        context.beginPath();
        context.moveTo(cx + nodes[2][0] * size, cy + nodes[2][1] * size);
        context.lineTo(cx + nodes[3][0] * size, cy + nodes[3][1] * size);
        context.moveTo(cx + nodes[2][0] * size + 8 * scale, cy + nodes[2][1] * size - 8 * scale);
        context.lineTo(cx + nodes[3][0] * size - 8 * scale, cy + nodes[3][1] * size + 8 * scale);
        context.stroke();
      }

      function drawBinaryTree(cx: number, cy: number, size: number) {
        const levels = [
          [[0, -0.38]],
          [[-0.24, -0.08], [0.24, -0.08]],
          [[-0.36, 0.24], [-0.12, 0.24], [0.12, 0.24], [0.36, 0.24]],
        ];
        for (let level = 0; level < levels.length - 1; level += 1) {
          levels[level].forEach(([x, y], index) => {
            [index * 2, index * 2 + 1].forEach((child) => {
              const [childX, childY] = levels[level + 1][child];
              context.beginPath();
              context.moveTo(cx + x * size, cy + y * size);
              context.lineTo(cx + childX * size, cy + childY * size);
              context.stroke();
            });
          });
        }
        levels.flat().forEach(([x, y]) => {
          context.beginPath();
          context.arc(cx + x * size, cy + y * size, 2.4 * scale, 0, Math.PI * 2);
          context.fill();
        });
      }

      function drawPoissonDots(cx: number, cy: number, size: number) {
        for (let index = 0; index < 18; index += 1) {
          const x = cx + ((((index * 37) % 100) / 100) - 0.5) * size;
          const y = cy + ((((index * 61) % 100) / 100) - 0.5) * size * 0.7;
          context.beginPath();
          context.arc(x, y, (1.6 + (index % 3) * 0.5) * scale, 0, Math.PI * 2);
          context.fill();
        }
        context.fillText("λ", cx + size * 0.34, cy - size * 0.28);
      }

      function drawBracketDoodle(cx: number, cy: number, size: number) {
        const marks = ["{", "}", "[", "]", "(", ")"];
        marks.forEach((mark, index) => {
          const angle = (index / marks.length) * Math.PI * 2;
          context.fillText(mark, cx + Math.cos(angle) * size * 0.34, cy + Math.sin(angle) * size * 0.26);
        });
      }

      function drawSpiral(cx: number, cy: number, size: number) {
        context.beginPath();
        for (let step = 0; step <= 90; step += 1) {
          const t = step / 90;
          const angle = t * Math.PI * 6 + time * 0.00022;
          const radius = size * 0.42 * (1 - t);
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
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
          case "bellCurve":
            drawBellCurve(x, y, size);
            break;
          case "neighborhood":
            drawNeighborhood(x, y, size);
            break;
          case "zigzag":
            drawZigzag(x, y, size);
            break;
          case "eigenvectors":
            drawEigenvectors(x, y, size);
            break;
          case "matrix":
            drawMatrix(x, y, size);
            break;
          case "lossBowl":
            drawLossBowl(x, y, size);
            break;
          case "pascal":
            drawPascal(x, y, size);
            break;
          case "graph":
            drawGraph(x, y, size);
            break;
          case "binaryTree":
            drawBinaryTree(x, y, size);
            break;
          case "poissonDots":
            drawPoissonDots(x, y, size);
            break;
          case "bracket":
            drawBracketDoodle(x, y, size);
            break;
          case "spiral":
            drawSpiral(x, y, size);
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
      drawGraphPaper(graphLine, graphAccent);
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
