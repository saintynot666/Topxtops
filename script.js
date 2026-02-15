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

function addItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
}

function loadItems() {
  const items = getStoredItems();
  items.forEach(addItem);
}


input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

addBtn.addEventListener("click", () => {
  const v = input.value.trim();
  if (!v) return;

  addItem(v);
  const items = getStoredItems();
  items.push(v);
  saveItems(items);

  input.value = "";
  input.focus();
});

loadItems();
