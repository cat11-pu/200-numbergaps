// gaps.js：找缺口，一次扫描，缺口按区间逐个展开
import { checkStep } from "./check.js";

export function findGaps(serials) {
  const list = serials || [];
  if (list.length === 0) return { missing: [], widest: 0, low: 0, high: 0 };
  const missing = [];
  let widest = 0;
  for (let spot = 1; spot < list.length; spot += 1) {
    const before = list[spot - 1];
    const after = list[spot];
    checkStep(before, after);
    const span = after - before - 1;
    if (span > widest) widest = span;
    for (let value = before + 1; value < after; value += 1) missing.push(value);
  }
  return { missing: missing, widest: widest, low: list[0], high: list[list.length - 1] };
}
