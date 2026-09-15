#!/usr/bin/env node
import React from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Command } from "commander";
import { render } from "ink";
import { designDNASchema } from "@creative-ui/core";
import { InitApp } from "./App.js";

const program = new Command()
  .name("creative-ui")
  .description("Design-direction tooling for AI-generated frontends")
  .version("0.0.1");

program
  .command("init")
  .description("Open the interactive design director and create project DNA")
  .action(async () => {
    const instance = render(<InitApp />);
    await instance.waitUntilExit();
  });

program
  .command("inspect")
  .description("Print the current project design DNA")
  .action(async () => {
    const path = join(process.cwd(), ".creative-ui", "design-dna.json");
    const raw = await readFile(path, "utf8");
    const dna = designDNASchema.parse(JSON.parse(raw));

    console.log(`\nCreative UI — ${dna.concept}`);
    console.log(`Composition: ${dna.composition}`);
    console.log(`Experimentation: ${Math.round(dna.axes.experimentation * 100)}%`);
    console.log(`Asymmetry: ${Math.round(dna.axes.asymmetry * 100)}%`);
    console.log(`Novelty: ${Math.round(dna.novelty.overall * 100)}%\n`);
  });

await program.parseAsync(process.argv);
