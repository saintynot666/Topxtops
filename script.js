const input = document.getElementById("item");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");

function addItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
}

addBtn.addEventListener("click", () => {
  const v = input.value.trim();
  if (!v) return;
  addItem(v);
  input.value = "";
  input.focus();
});
