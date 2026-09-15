export type SlopSeverity = "info" | "warning" | "high";

export type SlopFinding = {
  id: string;
  category: "composition" | "geometry" | "color" | "effects" | "typography" | "interaction" | "structure";
  severity: SlopSeverity;
  message: string;
  suggestion: string;
  evidence?: string;
};

export type SlopReport = {
  score: number;
  findings: SlopFinding[];
  summary: string;
};

const occurrences = (source: string, pattern: RegExp) => source.match(pattern)?.length ?? 0;

function push(findings: SlopFinding[], finding: SlopFinding) {
  findings.push(finding);
}

export function analyzeSourceForSlop(source: string): SlopReport {
  const findings: SlopFinding[] = [];
  let score = 0;

  const rounded = occurrences(source, /rounded-(?:xl|2xl|3xl|full)|border-radius\s*:\s*(?:1[6-9]|[2-9]\d)px/g);
  if (rounded >= 6) {
    score += Math.min(18, Math.round(rounded * 0.9));
    push(findings, {
      id: "rounded-container-repetition",
      category: "geometry",
      severity: "warning",
      message: "Large-radius container geometry is repeated heavily.",
      suggestion: "Create hierarchy with alignment, cropping, rules, spacing and scale before adding another rounded container.",
      evidence: `${rounded} large/full radius declarations detected`,
    });
  }

  const gradients = occurrences(source, /(?:bg-gradient|linear-gradient|radial-gradient|conic-gradient)/g);
  if (gradients >= 3) {
    score += Math.min(14, gradients * 2);
    push(findings, {
      id: "gradient-overuse",
      category: "effects",
      severity: "warning",
      message: "Gradients appear frequently enough to risk becoming a default decoration.",
      suggestion: "Keep gradients only where they carry depth, hierarchy, lighting or brand meaning.",
      evidence: `${gradients} gradient declarations detected`,
    });
  }

  const cards = occurrences(source, /\b(?:Card|card)(?:s|Grid|List|Item|Content|Header)?\b/g);
  if (cards >= 12) {
    score += 18;
    push(findings, {
      id: "card-dependence",
      category: "structure",
      severity: "high",
      message: "The source relies heavily on card vocabulary.",
      suggestion: "Replace at least one card cluster with editorial grouping, spatial hierarchy, a timeline, table, specimen layout, freeform composition or direct content-on-canvas.",
      evidence: `${cards} card-like identifiers detected`,
    });
  }

  const centered = occurrences(source, /text-center|items-center|justify-center|place-items-center/g);
  if (centered >= 10) {
    score += 14;
    push(findings, {
      id: "centered-default",
      category: "composition",
      severity: "warning",
      message: "Centering dominates the composition.",
      suggestion: "Introduce directional hierarchy with asymmetric anchors, edge alignment, cropping, offset columns or changing text axes.",
      evidence: `${centered} centering utilities detected`,
    });
  }

  if ((source.includes("from-purple") && source.includes("to-blue")) || /#[78][0-9a-f]{5}.*#[0-6][0-9a-f]{5}/is.test(source)) {
    score += 18;
    push(findings, {
      id: "purple-blue-gradient",
      category: "color",
      severity: "high",
      message: "A familiar purple/blue generated-UI gradient pattern is present.",
      suggestion: "Keep it only when the project concept or lineage actually calls for it; otherwise derive color from the content and art direction.",
    });
  }

  const glass = occurrences(source, /backdrop-blur|backdrop-filter|bg-(?:white|black)\/[0-9]+/g);
  if (glass >= 6) {
    score += 12;
    push(findings, {
      id: "glassmorphism-default",
      category: "effects",
      severity: "warning",
      message: "Translucent blur surfaces are becoming a recurring material without evidence of purpose.",
      suggestion: "Choose one material logic for the interface and use blur only when depth or translucency is conceptually meaningful.",
      evidence: `${glass} glass-like declarations detected`,
    });
  }

  const pills = occurrences(source, /rounded-full/g);
  if (pills >= 8) {
    score += 10;
    push(findings, {
      id: "pill-overuse",
      category: "geometry",
      severity: "warning",
      message: "Pill geometry is repeated across many elements.",
      suggestion: "Reserve pills for controls whose shape communicates state, compactness or grouping.",
      evidence: `${pills} rounded-full utilities detected`,
    });
  }

  const hugeHeadings = occurrences(source, /text-(?:7xl|8xl|9xl)|font-size\s*:\s*(?:[7-9]\d|1\d\d)px/g);
  const gradientText = occurrences(source, /bg-clip-text|text-transparent/g);
  if (hugeHeadings >= 2 && gradientText >= 1) {
    score += 10;
    push(findings, {
      id: "gradient-mega-heading",
      category: "typography",
      severity: "warning",
      message: "Mega-heading plus gradient-text trope detected.",
      suggestion: "Use typographic composition, line breaks, width, rhythm, variable axes or spatial relationships before decorative gradient text.",
    });
  }

  const maxWidth = occurrences(source, /max-w-(?:5xl|6xl|7xl|screen-xl|screen-2xl)|max-width\s*:\s*(?:1200|1280|1440)px/g);
  if (maxWidth >= 8) {
    score += 8;
    push(findings, {
      id: "container-monotony",
      category: "composition",
      severity: "info",
      message: "Many sections appear to share the same centered maximum-width container.",
      suggestion: "Vary the spatial field intentionally: full-bleed media, narrow reading columns, offset modules, marginalia or edge-anchored elements.",
      evidence: `${maxWidth} common max-width patterns detected`,
    });
  }

  const finalScore = Math.min(100, score);
  const summary = finalScore >= 65
    ? "High template/slop risk. Revisit the composition before polishing."
    : finalScore >= 35
      ? "Moderate template/slop risk. Several defaults deserve a deliberate pass."
      : "Low static slop signal. Visual review is still required.";

  return { score: finalScore, findings, summary };
}

export function generateUnslopPlan(report: SlopReport): string {
  const ordered = [...report.findings].sort((a, b) => {
    const rank = { high: 3, warning: 2, info: 1 } as const;
    return rank[b.severity] - rank[a.severity];
  });

  return `# Creative UI — Unslop Plan\n\n**Slop score:** ${report.score}/100\n\n${report.summary}\n\n${ordered.length ? ordered.map((finding, index) => `## ${index + 1}. ${finding.message}\n\n- Category: ${finding.category}\n- Severity: ${finding.severity}\n${finding.evidence ? `- Evidence: ${finding.evidence}\n` : ""}- Intervention: ${finding.suggestion}`).join("\n\n") : "No strong static anti-slop findings. Perform a visual critique before declaring victory."}\n`;
}
