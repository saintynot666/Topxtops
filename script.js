const input = document.getElementById("item");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");
const STORAGE_KEY = "topxtops-items";

function getStoredItems() {
  try {
    const rawItems = localStorage.getItem(STORAGE_KEY);
    if (!rawItems) return [];

    const items = JSON.parse(rawItems);
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function syncListIndexes() {
  Array.from(list.children).forEach((li, index) => {
    li.dataset.index = index;
  });
}

function removeItem(index) {
  const items = getStoredItems();
  items.splice(index, 1);
  saveItems(items);
}

function addItem(text, index) {
  const li = document.createElement("li");
  li.dataset.index = index;

  const itemText = document.createElement("span");
  itemText.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-item";
  deleteBtn.setAttribute("aria-label", `Eliminar ${text}`);
  deleteBtn.textContent = "✕";

  deleteBtn.addEventListener("click", () => {
    const itemIndex = Number(li.dataset.index);
    removeItem(itemIndex);
    li.remove();
    syncListIndexes();
  });

  li.append(itemText, deleteBtn);
  list.appendChild(li);
}

function loadItems() {
  const items = getStoredItems();
  items.forEach((item, index) => addItem(item, index));
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

addBtn.addEventListener("click", () => {
  const v = input.value.trim();
  if (!v) return;

  const items = getStoredItems();
  items.push(v);
  saveItems(items);
  addItem(v, items.length - 1);

  input.value = "";
  input.focus();
});

loadItems();
