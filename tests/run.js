import assert from "node:assert";
import { checkStep } from "../check.js";
import { findGaps } from "../gaps.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("checkStep returns a boolean", () => {
  assert.strictEqual(typeof checkStep(1, 2), "boolean");
});

check("findGaps returns missing list", () => {
  assert.ok(Array.isArray(findGaps([1, 3]).missing));
});

check("findGaps returns widest", () => {
  assert.strictEqual(typeof findGaps([1, 3]).widest, "number");
});

check("render counts gaps", () => {
  assert.strictEqual(typeof render({ serials: [1, 3] }).count, "number");
});

check("render exposes increasing flag", () => {
  assert.strictEqual(typeof render({ serials: [1, 3] }).increasing, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
