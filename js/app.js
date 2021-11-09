const groceryForm = document.querySelector(".grocery-form");
const groceryInput = document.querySelector("input");
const submitBtn = document.querySelector(".submit-btn");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");
const alertMessage = document.querySelector(".alert");
const listClearBtn = document.querySelector(".clear-btn");
const localStorage = window.localStorage;
let editElement;
let editflag = false;

// keep item on refresh
window.addEventListener("DOMContentLoaded", setupItems);

// add item to the list
groceryForm.addEventListener("submit", addItem);

// remove all items from the list
listClearBtn.addEventListener("click", clearList);

// delete or edit item in the list
groceryList.addEventListener("click", updateList);

// *****************************
function createItem(id, title) {
  const article = document.createElement("article");

  const attribute = document.createAttribute("data-id");
  attribute.value = id;
  article.setAttributeNode(attribute);

  article.classList.add("grocery-item");

  article.innerHTML = `<p class="title">${title}</p>
    <div class="btn-container">
      <button class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;

  groceryList.append(article);
}

function showAlert(text, action) {
  alertMessage.textContent = text;
  alertMessage.classList.add(`alert-${action}`);

  setTimeout(() => {
    alertMessage.textContent = "";
    alertMessage.classList.remove(`alert-${action}`);
  }, 1500);
}

function addItem(e) {
  e.preventDefault();
  const groceryInputValue = groceryInput.value;

  if (editflag && groceryInputValue) {
    const editedValue = groceryInput.value;
    editElement.children[0].innerHTML = editedValue;

    let itemId = editElement.dataset.id;
    updateLocalStorage(itemId, editedValue);

    submitBtn.innerHTML = "submit";
    setBackToDefault();

    showAlert("List updated", "success");
    return;
  }

  if (!groceryInputValue) {
    showAlert("Enter Some Value", "danger");
    return;
  } else {
    showAlert("Item added to the list", "success");
  }

  groceryContainer.classList.add("show-container");

  const id = new Date().getTime().toString();
  createItem(id, groceryInputValue);

  addItemToLocalStorage(id, groceryInputValue);

  setBackToDefault();
}

function clearList() {
  groceryList.innerHTML = "";

  groceryContainer.classList.remove("show-container");

  localStorage.removeItem("list");
  showAlert("List is Empty", "danger");
}

function updateList(e) {
  if (e.target.parentElement.tagName == "BUTTON") {
    const currentBtn = e.target.parentElement;
    const currentItem = currentBtn.parentElement.parentElement;

    if (currentBtn.classList.contains("delete-btn")) {
      let id = currentItem.dataset.id;
      removeFromLocalStorage(id);

      groceryList.removeChild(currentItem);

      if (groceryList.children.length == 0) {
        groceryContainer.classList.remove("show-container");
      }

      setBackToDefault();
      showAlert("item removed", "danger");
    }

    if (currentBtn.classList.contains("edit-btn")) {
      let currentValue = currentItem.childNodes[0].textContent;

      groceryInput.value = currentValue;

      submitBtn.innerHTML = "edit";

      editElement = currentItem;
      editflag = true;
    }
  }
}

function setBackToDefault() {
  groceryInput.value = "";
  editflag = false;
  submitBtn.innerHTML = "submit";
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("list")) ?? [];
}

function addItemToLocalStorage(id, value) {
  let obj = { id, value };

  let list = getLocalStorage();

  list.push(obj);

  localStorage.setItem("list", JSON.stringify(list));
}

function removeFromLocalStorage(id) {
  let list = getLocalStorage();

  let updatedList = list.filter(function removeItem(item) {
    return item.id != id;
  });

  localStorage.setItem("list", JSON.stringify(updatedList));
}

function updateLocalStorage(id, value) {
  let list = getLocalStorage();

  let updatedList = list.map(function updateItem(item) {
    if (item.id == id) {
      item.value = value;
    }

    return item;
  });

  localStorage.setItem("list", JSON.stringify(updatedList));
}

function setupItems() {
  let list = getLocalStorage();

  if (list.length > 0) {
    groceryContainer.classList.add("show-container");
    list.forEach((item) => {
      createItem(item.id, item.value);
    });
  }
}
