const groceryForm = document.querySelector(".grocery-form");
const groceryInput = document.querySelector("input");
const submitBtn = document.querySelector(".submit-btn");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");
const alertMessage = document.querySelector(".alert");
const listClearBtn = document.querySelector(".clear-btn");

let editElement;
let editflag = false;

// add item to the list
function createItem(title) {
  const article = document.createElement("article");
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

  return article;
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

  if (editflag) {
    const editedValue = groceryInput.value;
    editElement.children[0].innerHTML = editedValue;

    submitBtn.innerHTML = "submit";
    groceryInput.value = "";
    editflag = false;

    showAlert("List updated", "success");
    return;
  }

  const groceryInputValue = groceryInput.value;

  if (!groceryInputValue) {
    showAlert("Enter Some Value", "danger");
    return;
  } else {
    showAlert("Item added to the list", "success");
  }

  groceryContainer.classList.add("show-container");

  const newItem = createItem(groceryInputValue);

  groceryList.append(newItem);

  groceryInput.value = "";
}

groceryForm.addEventListener("submit", addItem);

// remove all items from the list

listClearBtn.addEventListener("click", clearList);

function clearList() {
  groceryList.innerHTML = "";

  groceryContainer.classList.remove("show-container");

  showAlert("List is Empty", "danger");
}

// delete or edit item in the list
// use event delegation to access the edit and delete button

groceryList.addEventListener("click", updateList);

function updateList(e) {
  if (e.target.parentElement.tagName == "BUTTON") {
    const currentBtn = e.target.parentElement;
    const currentItem = currentBtn.parentElement.parentElement;

    if (currentBtn.classList.contains("delete-btn")) {
      groceryList.removeChild(currentItem);

      if (groceryList.children.length == 0) {
        groceryContainer.classList.remove("show-container");
      }

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
