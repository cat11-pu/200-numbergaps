// gaps.js：找缺口（基线：一律给空表）
import { checkStep } from "./check.js";

export function findGaps(serials) {
  return { missing: [], widest: 0, low: 0, high: 0 };
}
