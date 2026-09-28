"use strict";
const params = new URLSearchParams(location.search);
history.replaceState(null, "", location.pathname);
const output = new URLSearchParams();
for (const name of ["state", "code", "device_id", "error"]) {
  const value = params.get(name);
  if (value && value.length <= 4096) output.set(name, value);
}
const status = document.getElementById("status");
if (output.has("state") && (output.has("error") || (output.has("code") && output.has("device_id")))) {
  const target = "http://127.0.0.1:8765/oauth/vk/callback?" + output.toString();
  document.getElementById("return").href = target;
  status.textContent = "Возвращаемся в редакцию. Если переход не произошёл, нажмите ссылку ниже.";
  location.replace(target);
} else {
  status.textContent = "Страница готова. Начните вход через VK ID в настройках локальной редакции.";
}
