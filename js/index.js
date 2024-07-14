openSide();
let randomly = document.getElementById("cardrandomly");
let searchContainer = document.getElementById("searchContainer");

$(document).ready(() => {
  searchByName("").then(() => {
      $(".loading-screen").fadeOut(500)
      $("body").css("overflow", "visible")

  })
})

function openSide() {
  let outerWidth = $(".menu-items").outerWidth();

  $(".side-nav-menu").animate({ left: -outerWidth }, 500);
  $(".xBottom i").removeClass("fa-x");
  $(".xBottom i").addClass("fa-1x fa-align-justify");
  $(".menu-items li").animate({ top: 300 }, 500);
}
$(".open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    openSide();
  } else {
    closeSide();
  }
});
function closeSide() {
  $(".side-nav-menu").animate({ left: 0 }, 500);
  $(".xBottom i").removeClass("fa-1x fa-align-justify");
  $(".xBottom i").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".menu-items li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
// Randomly Home page section
async function getAPIData(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  displayData(response.meals);
}
function displayData(arr) {
  let htmlHomePage = "";
  for (let i = 0; i < arr.length; i++) {
    htmlHomePage += `
          <div class="col-3 g-2 p-3">
              <div onclick="fetchMealDetails('${arr[i].idMeal}')" class="cursor-pointer imagesPeek">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="meal images">
                  <div class="layer-icon d-flex position-absolute p-2 align-content-center flex-column justify-content-center" id="layer-icon">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
              </div>
          </div>
      `;
  }
  document.getElementById("cardrandomly").innerHTML = htmlHomePage;
}

// Call the function
getAPIData("");

// Randomly category page section
async function categoriesApi() {
  searchContainer.innerHTML = "";
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  response = await response.json();
  console.log(response.categories);
  displayCategories(response.categories);

}
function displayCategories(arr) {
  let categories = "";
  for (let i = 0; i < arr.length; i++) {
    categories += `
          <div  class="col-3 g-2 p-3 ">
              <div onclick="filterByCategory('${
                arr[i].strCategory
              }')" class="cursor-pointer imagesPeek ">
                  <img class="w-100" src="${
                    arr[i].strCategoryThumb
                  }" alt="meal images">
                  <div class="layer-icon text-center position-absolute" id="layer-icon">
                      <h3>${arr[i].strCategory}</h3>
                      <p  class=" fs-6 m-0 p-1" >${arr[i].strCategoryDescription
                        .split(" ")
                        .slice(0, 50)
                        .join(" ")}</p>
                  </div>
              </div>
          </div>
      `;
  }
  document.getElementById("cardrandomly").innerHTML = categories;
}
// Randomly area  page
async function areaApi() {
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayApi(response.meals);

}
function displayApi(arr) {
  let area = "";
  for (let i = 0; i < arr.length; i++) {
    area += `
         <div class="col-md-3">
                <div onclick="filterByArea('${arr[i].strArea}')" class="cursor-pointer rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
`;
  }
  document.getElementById("cardrandomly").innerHTML = area;
}

async function getIngredients() {
  searchContainer.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));

}

function displayIngredients(arr) {
  let ingredients = "";

  for (let i = 0; i < arr.length; i++) {
    ingredients += `
          <div class="col-md-3 py-5">
                <div onclick="filterByIngredients('${
                  arr[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
      `;
  }

  document.getElementById("cardrandomly").innerHTML = ingredients;
}
// filterByIngredients

async function filterByIngredients(ingredient) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  response = await response.json();
  displayData(response.meals);
}

// filterByCategory
async function filterByCategory(ccategory) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ccategory}`
  );
  response = await response.json();
  displayData(response.meals.slice(0, 10));

}
// filterByArea
async function filterByArea(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayData(response.meals.slice(0, 15));

}
// filterByIngredients
async function fetchMealDetails(idMeal) {
  searchContainer.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  response = await response.json();
  dMealDetails(response.meals[0]);
}

function dMealDetails(meal) {
  searchContainer.innerHTML = "";
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",") || [];
  let tagsStr = tags.map(tag => `<li class="alert alert-danger m-2 p-1">${tag}</li>`).join('');

  let cartoona = `
    <div class="col-md-4">
      <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
      <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2>Instructions</h2>
      <p>${meal.strInstructions}</p>
      <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
      <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
      <h3>Recipes :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
      </ul>
      <h3>Tags :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
      </ul>
      <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
      <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;

  document.getElementById("cardrandomly").innerHTML = cartoona;
}

document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.querySelector('.inner-loading-screen');

  function showLoadingScreen() {
      loadingScreen.classList.add('fade-in');
      loadingScreen.classList.remove('fade-out');
      loadingScreen.style.display = 'flex';
  }

  function hideLoadingScreen() {
      loadingScreen.classList.add('fade-out');
      loadingScreen.classList.remove('fade-in');
      setTimeout(() => {
          loadingScreen.style.display = 'none';
      }, 200);
  }

  showLoadingScreen();
  window.addEventListener('load', hideLoadingScreen);

  document.querySelectorAll('li, .cursor-pointer, .open-close-icon').forEach(element => {
      element.addEventListener('click', function() {
          showLoadingScreen();
          setTimeout(hideLoadingScreen, 200); 
      });
  });
});

function displaySearchInputs() {
  searchContainer.innerHTML = `
    <div class="row py-4">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;
  document.getElementById("cardrandomly").innerHTML = "";
}

async function searchByName(term) {
  closeSideNav();
  document.getElementById("cardrandomly").innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  response = await response.json();

  if (response.meals) {
    displayMeals(response.meals);
  } else {
    displayMeals([]);
  }
}

async function searchByFirstLetter(term) {
  closeSideNav();
  document.getElementById("cardrandomly").innerHTML = "";

  if (term === "") {
    term = "a";
  }

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  response = await response.json();

  if (response.meals) {
    displayMeals(response.meals);
  } else {
    displayMeals([]);
  }
}

function showContacts() {
  document.getElementById("cardrandomly").innerHTML=`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `
  submitBtn = document.getElementById("submitBtn")


  document.getElementById("nameInput").addEventListener("focus", () => {
      nameInputTouched = true
  })

  document.getElementById("emailInput").addEventListener("focus", () => {
      emailInputTouched = true
  })

  document.getElementById("phoneInput").addEventListener("focus", () => {
      phoneInputTouched = true
  })

  document.getElementById("ageInput").addEventListener("focus", () => {
      ageInputTouched = true
  })

  document.getElementById("passwordInput").addEventListener("focus", () => {
      passwordInputTouched = true
  })

  document.getElementById("repasswordInput").addEventListener("focus", () => {
      repasswordInputTouched = true
  })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
  if (nameInputTouched) {
      if (nameValidation()) {
          document.getElementById("nameAlert").classList.replace("d-block", "d-none")

      } else {
          document.getElementById("nameAlert").classList.replace("d-none", "d-block")

      }
  }
  if (emailInputTouched) {

      if (emailValidation()) {
          document.getElementById("emailAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("emailAlert").classList.replace("d-none", "d-block")

      }
  }

  if (phoneInputTouched) {
      if (phoneValidation()) {
          document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

      }
  }

  if (ageInputTouched) {
      if (ageValidation()) {
          document.getElementById("ageAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("ageAlert").classList.replace("d-none", "d-block")

      }
  }

  if (passwordInputTouched) {
      if (passwordValidation()) {
          document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

      }
  }
  if (repasswordInputTouched) {
      if (repasswordValidation()) {
          document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

      }
  }


  if (nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()) {
      submitBtn.removeAttribute("disabled")
  } else {
      submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}