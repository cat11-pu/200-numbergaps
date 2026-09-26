// gaps.js：一次扫描找缺口，相等或倒序抛 E_NOT_INCREASING
import { checkStep } from "./check.js";

export function findGaps(serials) {
  const list = serials || [];
  const missing = [];
  let widest = 0;

  if (list.length === 0) {
    return { missing, widest, low: 0, high: 0 };
  }

  const low = list[0];
  let high = list[0];

  for (let spot = 1; spot < list.length; spot += 1) {
    const before = list[spot - 1];
    const after = list[spot];
    if (!checkStep(before, after)) {
      const error = new Error("序号必须严格递增：" + before + " 后面不能是 " + after);
      error.code = "E_NOT_INCREASING";
      throw error;
    }
    high = after;
    const width = after - before - 1;
    if (width > widest) widest = width;
    for (let value = before + 1; value < after; value += 1) {
      missing.push(value);
    }
  }

  return { missing, widest, low, high };
}
