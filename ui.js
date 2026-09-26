// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "序号 " + (spec.serials || []).length + " 个，点补全看缺口。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.missing.forEach(function (value) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "缺口";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip bad";
      mark.textContent = "缺 " + value;
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    const line = document.createElement("div");
    line.className = "row";
    line.textContent = "缺口 " + view.count + " 个，范围 " + view.low + " 到 " + view.high;
    parts.stage.appendChild(line);
    parts.legend.textContent = "序号个数 " + view.value_count + "，最宽缺口 " + view.widest;
    parts.log.textContent = "是否升序 " + view.increasing;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "找缺口";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "补上最小缺口";
  addButton.addEventListener("click", function () {
    const view = render(spec);
    if (view.missing.length > 0) {
      const value = view.missing[0];
      const next = (spec.serials || []).slice();
      const spot = next.findIndex((existing) => existing > value);
      next.splice(spot === -1 ? next.length : spot, 0, value);
      spec.serials = next;
    }
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.serials = (spec.serials || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个序号";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "9";
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) {
      try {
        const view = render(Object.assign({}, spec, { serials: (spec.serials || []).concat([parsed]) }));
        parts.out.textContent = "加入 " + parsed + " 后缺口 " + view.count + " 个";
      } catch (error) {
        parts.out.textContent = String(error && error.code ? error.code : String(error));
      }
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看缺口个数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "缺口 " + view.count + " 个，最宽 " + view.widest;
  });
  parts.controls.appendChild(readButton);

  draw();
}
