const menuForm = document.getElementById("menuForm");
const menuList = document.getElementById("menuList").querySelector("ul");
const itemImageInput = document.getElementById("itemImage");
const imagePreview = document.getElementById("imagePreview");

itemImageInput.addEventListener("change", () => {
  const file = itemImageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Image preview">`;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.innerHTML = "";
  }
});

menuForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = document.getElementById("itemName").value;
  const itemRecipe = document.getElementById("itemRecipe").value;
  const itemRequirements = document.getElementById("itemRequirements").value;

  addItem(itemName, itemRecipe, itemRequirements);

  // Clear the form
  menuForm.reset();
});

function addItem(name, recipe, requirements) {
    const menuItem = document.createElement("li");
  
    let imageHtml = "";
    if (imagePreview.querySelector("img")) {
      imageHtml = `<img src="${imagePreview.querySelector("img").src}" alt="${name}" class="menu-image">`;
    }
  
    menuItem.innerHTML = `
      <h3>${name}</h3>
      ${imageHtml}
      <p><strong>Recipe:</strong> <span class="recipe">${recipe}</span></p>
      <p><strong>Requirements:</strong> <span class="requirements">${requirements}</span></p>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;
  
    menuItem.querySelector(".edit").addEventListener("click", editItem);
    menuItem.querySelector(".delete").addEventListener("click", deleteItem);
  
    menuList.appendChild(menuItem);
  
    // Clear the image preview
    imagePreview.innerHTML = "";
  }
  

function editItem(e) {
  const menuItem = e.target.parentElement;
  const name = menuItem.querySelector("h3").textContent;
  const recipe = menuItem.querySelector(".recipe").textContent;
  const requirements = menuItem.querySelector(".requirements").textContent;

  document.getElementById("itemName").value = name;
  document.getElementById("itemRecipe").value = recipe;
  document.getElementById("itemRequirements").value = requirements;

  menuForm.removeEventListener("submit", addItem);
  menuForm.addEventListener("submit", updateItem);

  function updateItem(e) {
    e.preventDefault();
    menuItem.querySelector("h3").textContent = document.getElementById("itemName").value;
    menuItem.querySelector(".recipe").textContent = document.getElementById("itemRecipe").value;
    menuItem.querySelector(".requirements").textContent = document.getElementById("itemRequirements").value;

    menuForm.removeEventListener("submit", updateItem);
    menuForm.addEventListener("submit", addItem);
    menuForm.reset();
  }
}

function deleteItem(e) {
  const menuItem = e.target.parentElement;
  menuList.removeChild(menuItem);
}
