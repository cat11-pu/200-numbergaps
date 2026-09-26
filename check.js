// check.js：查一步，后一个序号必须严格大于前一个
export function checkStep(before, after) {
  return after > before;
}
