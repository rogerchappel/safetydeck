import { loadProfile } from './profile.js';
import { loadTemplate } from './template.js';
import { generatePlan } from './planner.js';
import { renderMarkdown } from './markdown.js';
import { writeTextFile } from './io.js';
import type { GenerateOptions, SafetyPlan } from './types.js';

export async function generateMarkdownPlan(options: GenerateOptions): Promise<{ plan: SafetyPlan; markdown: string }> {
  const [profile, template] = await Promise.all([loadProfile(options.profilePath), loadTemplate(options.templatePath)]);
  const plan = generatePlan(profile, template, options.now);
  const markdown = renderMarkdown(plan);
  if (options.outputPath) await writeTextFile(options.outputPath, markdown);
  return { plan, markdown };
}
