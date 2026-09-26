// check.js：查一步，后一个必须严格大于前一个
export function checkStep(before, after) {
  if (!(after > before)) {
    const error = new Error("serial not increasing: " + before + " -> " + after);
    error.code = "E_NOT_INCREASING";
    throw error;
  }
  return true;
}
