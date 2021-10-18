const groceryForm = document.querySelector(".grocery-form");
const groceryInput = document.querySelector("input");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");
const alertMessage = document.querySelector(".alert");

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

  const groceryInputValue = groceryInput.value;

  if (!groceryInputValue) {
    showAlert("Enter Some Value", "danger");
  } else {
    if (groceryList.children.length >= 0) {
      groceryContainer.classList.add("show-container");
    }

    const newItem = createItem(groceryInputValue);

    groceryList.append(newItem);

    groceryInput.value = "";
    groceryInput.focus();
  }
}

groceryForm.addEventListener("submit", addItem);
