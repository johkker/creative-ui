import React, { useMemo, useState } from "react";
import { Box, Text, useApp, useInput } from "ink";
import {
  compositionSchema,
  defaultDesignDNA,
  type DesignAxes,
  type DesignDNA,
  type NoveltyBudget,
} from "@creative-ui/core";
import { recommendVisualReferences, visualReferenceById } from "@creative-ui/lineage";
import { saveDNA } from "./project.js";

const compositions = compositionSchema.options;
const panels = ["axes", "novelty", "lineage"] as const;
type Panel = (typeof panels)[number];

const axisRows: Array<[keyof DesignAxes, string]> = [
  ["density", "Density"], ["experimentation", "Experimentation"], ["rawness", "Rawness"], ["layering", "Layering"], ["asymmetry", "Asymmetry"], ["kinetic", "Motion"], ["physicality", "Physicality"], ["typographicExpression", "Type expression"], ["contrast", "Contrast"], ["texture", "Texture"],
];

const noveltyRows: Array<[keyof NoveltyBudget, string]> = [
  ["overall", "Overall"], ["layout", "Layout"], ["typography", "Typography"], ["motion", "Motion"], ["color", "Color"], ["navigation", "Navigation"], ["interaction", "Interaction"], ["imagery", "Imagery"], ["texture", "Texture"],
];

function meter(value: number, width = 16) {
  const filled = Math.round(value * width);
  return `${"█".repeat(filled)}${"░".repeat(width - filled)} ${Math.round(value * 100)}%`;
}

function cycle<T>(items: readonly T[], current: T, delta = 1): T {
  const index = items.indexOf(current);
  return items[(index + delta + items.length) % items.length];
}

export function InitApp() {
  const { exit } = useApp();
  const [dna, setDna] = useState<DesignDNA>(structuredClone(defaultDesignDNA));
  const [panel, setPanel] = useState<Panel>("axes");
  const [cursor, setCursor] = useState(0);
  const [status, setStatus] = useState("Tab switches panels · arrows edit · Space selects lineage · C cycles composition · Enter saves");

  const recommendations = useMemo(() => recommendVisualReferences(dna, { limit: 10, includeCounterbalances: 2 }), [dna.axes, dna.vibes, dna.visualLineage]);
  const lineageRows = useMemo(() => {
    const selected = dna.visualLineage.map((selection) => visualReferenceById.get(selection.referenceId)).filter((item): item is NonNullable<typeof item> => Boolean(item));
    const recommended = recommendations.map((item) => item.reference);
    return [...selected, ...recommended.filter((reference) => !selected.some((item) => item.id === reference.id))].slice(0, 12);
  }, [dna.visualLineage, recommendations]);

  const rowCount = panel === "axes" ? axisRows.length : panel === "novelty" ? noveltyRows.length : lineageRows.length;

  function switchPanel(direction = 1) {
    setPanel((current) => cycle(panels, current, direction));
    setCursor(0);
  }

  function adjust(delta: number) {
    setDna((current) => {
      if (panel === "axes") {
        const [key] = axisRows[cursor];
        return { ...current, axes: { ...current.axes, [key]: Math.max(0, Math.min(1, current.axes[key] + delta)) } };
      }
      if (panel === "novelty") {
        const [key] = noveltyRows[cursor];
        return { ...current, novelty: { ...current.novelty, [key]: Math.max(0, Math.min(1, current.novelty[key] + delta)) } };
      }
      const reference = lineageRows[cursor];
      if (!reference) return current;
      const selected = current.visualLineage.find((item) => item.referenceId === reference.id);
      if (!selected) return current;
      return { ...current, visualLineage: current.visualLineage.map((item) => item.referenceId === reference.id ? { ...item, weight: Math.max(0.05, Math.min(1, item.weight + delta)) } : item) };
    });
  }

  function toggleLineage() {
    if (panel !== "lineage") return;
    const reference = lineageRows[cursor];
    if (!reference) return;
    setDna((current) => {
      const exists = current.visualLineage.some((item) => item.referenceId === reference.id);
      return { ...current, visualLineage: exists ? current.visualLineage.filter((item) => item.referenceId !== reference.id) : [...current.visualLineage, { referenceId: reference.id, weight: 0.35, borrow: reference.primaryChannels.slice(0, 3) }] };
    });
  }

  async function save() {
    await saveDNA(dna);
    setStatus("Saved .creative-ui/design-dna.json and DESIGN.md");
    setTimeout(exit, 200);
  }

  useInput((input, key) => {
    if (key.tab) switchPanel(key.shift ? -1 : 1);
    if (key.upArrow) setCursor((value) => Math.max(0, value - 1));
    if (key.downArrow) setCursor((value) => Math.min(Math.max(0, rowCount - 1), value + 1));
    if (key.leftArrow) adjust(-0.05);
    if (key.rightArrow) adjust(0.05);
    if (input === " " && panel === "lineage") toggleLineage();
    if (input.toLowerCase() === "c") setDna((current) => ({ ...current, composition: cycle(compositions, current.composition) }));
    if (input.toLowerCase() === "q" || key.escape) exit();
    if (key.return) void save();
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold>CREATIVE UI / DESIGN DIRECTOR</Text>
      <Text dimColor>Framework-agnostic art direction for coding agents.</Text>
      <Box marginTop={1}>{panels.map((item) => <Text key={item} inverse={item === panel}> {item.toUpperCase()} </Text>)}</Box>
      <Box marginTop={1} flexDirection="column">
        <Text>Composition: <Text bold>{dna.composition}</Text> <Text dimColor>[C]</Text></Text>
        {panel === "axes" && axisRows.map(([keyName, label], index) => <Text key={keyName} inverse={cursor === index}>{cursor === index ? "›" : " "} {label.padEnd(19)} {meter(dna.axes[keyName])}</Text>)}
        {panel === "novelty" && noveltyRows.map(([keyName, label], index) => <Text key={keyName} inverse={cursor === index}>{cursor === index ? "›" : " "} {label.padEnd(19)} {meter(dna.novelty[keyName])}</Text>)}
        {panel === "lineage" && lineageRows.map((reference, index) => {
          const selection = dna.visualLineage.find((item) => item.referenceId === reference.id);
          const recommendation = recommendations.find((item) => item.reference.id === reference.id);
          return <Text key={reference.id} inverse={cursor === index}>{cursor === index ? "›" : " "} {selection ? "[x]" : "[ ]"} {reference.name.slice(0, 27).padEnd(28)} {selection ? meter(selection.weight, 8) : recommendation?.role === "counterbalance" ? "counterbalance" : "recommended"}</Text>;
        })}
      </Box>
      <Box marginTop={1}><Text dimColor>{status}</Text></Box>
    </Box>
  );
}
