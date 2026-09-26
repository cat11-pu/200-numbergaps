// app.js：渲染结果
import { checkStep } from "./check.js";
import { findGaps } from "./gaps.js";

export function render(spec) {
  const serials = spec.serials || [];
  const view = findGaps(serials);
  const missing = view.missing || [];
  let increasing = true;
  for (let spot = 1; spot < serials.length; spot += 1) {
    if (!checkStep(serials[spot - 1], serials[spot])) increasing = false;
  }
  return { missing: missing, count: missing.length, widest: view.widest || 0,
           low: view.low || 0, high: view.high || 0, value_count: serials.length,
           increasing: increasing };
}
