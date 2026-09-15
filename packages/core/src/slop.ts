export type SlopFinding = {
  id: string;
  severity: "info" | "warning" | "high";
  message: string;
};

export type SlopReport = {
  score: number;
  findings: SlopFinding[];
};

const occurrences = (source: string, pattern: RegExp) => source.match(pattern)?.length ?? 0;

export function analyzeSourceForSlop(source: string): SlopReport {
  const findings: SlopFinding[] = [];
  let score = 0;

  const rounded = occurrences(source, /rounded-(?:2xl|3xl|full)/g);
  if (rounded >= 6) {
    score += Math.min(20, rounded);
    findings.push({
      id: "rounded-container-repetition",
      severity: "warning",
      message: `${rounded} large/full radius utilities detected. Check whether container geometry is becoming monotonous.`
    });
  }

  const gradients = occurrences(source, /(?:bg-gradient|linear-gradient|radial-gradient)/g);
  if (gradients >= 3) {
    score += Math.min(16, gradients * 2);
    findings.push({
      id: "gradient-overuse",
      severity: "warning",
      message: `${gradients} gradient declarations detected. Make sure they have a deliberate visual role.`
    });
  }

  const cards = occurrences(source, /(?:Card|card)/g);
  if (cards >= 12) {
    score += 18;
    findings.push({
      id: "card-dependence",
      severity: "high",
      message: "Heavy card vocabulary detected. Consider hierarchy through composition instead of wrapping every idea in a container."
    });
  }

  const centered = occurrences(source, /text-center|items-center|justify-center/g);
  if (centered >= 10) {
    score += 16;
    findings.push({
      id: "centered-default",
      severity: "warning",
      message: "Centering is dominant across the source. Check whether the page has intentional directional hierarchy."
    });
  }

  if (source.includes("from-purple") && source.includes("to-blue")) {
    score += 20;
    findings.push({
      id: "purple-blue-gradient",
      severity: "high",
      message: "Purple-to-blue gradient trope detected. Keep it only if it is genuinely part of the art direction."
    });
  }

  return { score: Math.min(100, score), findings };
}
