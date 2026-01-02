// data link
const htmlCodeLink = "/component/navbar/navbar.html";
const menuDataLink = "/json/menu.json";
const companyInformationDataLink = "/json/company_information.json";

//country
let country = "in";

//data store variable
let menuData = null;
let companyDataForLogo = null;

let fetchMenu = async () =>{
  try{
    let response = await fetch(menuDataLink);
    let data = await response.json();

    if(data)
      menuData = data;
  }
  catch(error){
    console.error("Error during loading the menu data", error);
  }
}

let fetchCompanyInformation = async () =>{
  try{
    let response = await fetch(companyInformationDataLink);
    let data = await response.json();

    if(data)
      companyDataForLogo = data;
  }
  catch(error){
    console.error("Error during loading the menu data", error);
  }
}

//logo
let companyLogoLoad = async () => {
  let navbarLogo = document.querySelector(".navbar-logo");
  
  if (!companyDataForLogo)
    await fetchCompanyInformation();

  navbarLogo.innerHTML = `<img src="${companyDataForLogo.logo}" alt="Company Logo" />`;
}

let menuPart = (data, menuKey) =>{
  let ul = document.createElement("ul");
  ul.className = "submenu";

  data.forEach(m =>{
    let li = document.createElement("li");
    let a = document.createElement("a");

    if(m.route)
      a.href = m.route;
    
    a.dataset.menu = menuKey;
    a.textContent = m.title;
    
    li.append(a);

    if(m.submenu){
      li.className = "dropdown";
      a.className = "nav-link";
      a.innerHTML += '<span class="caret">▾</span>';

      // empty the li tag
      li.innerHTML = "";
      li.append(a);

      let subSubmenu = menuPart(m.submenu, menuKey); 

      li.append(subSubmenu);
    }
    ul.append(li);
  }); 
  return ul;
}

let loadMenuData = async () =>{
  let navMenu = document.getElementsByClassName("nav-menu")[0];
  
  if (!menuData)
    await fetchMenu();

  navMenu.innerHTML = "";

  menuData.forEach (e =>{
    let li = document.createElement("li");
    li.className = "nav-item";

    let parts = e.route.replace("#/", "").split("/");

    if(e.submenu){
      li.classList.add("dropdown");
      
      let subMenuData = e.submenu;
      
      li.innerHTML = `<a href="${e.route ? e.route : ""}" class="nav-link" data-menu="${parts[0]}">${e.title}<span class="caret">▾</span></a>`;
      li.append(menuPart(subMenuData, parts[0]));
    }
    else{
      li.innerHTML = `<a href="${e.route ? e.route : ""}" class="nav-link" data-menu="${parts[0]}" >${e.title}</a>`;
    }
    navMenu.append(li);
  });

  // setupNav();
  // setupSubmenuToggle();
  handleRoute(); 
}

// function setupSubmenuToggle() {
//   document.querySelectorAll(".submenu-toggle").forEach(toggle => {
//     toggle.addEventListener("click", e => {
//       e.stopPropagation();
//       const dropdown = toggle.closest(".dropdown");
//       dropdown.classList.toggle("open");
//     });
//   });
// }

let navbarHtmlCodeLoad = async () =>{
  // Load navbar
  fetch(htmlCodeLink)
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;

      loadMenuData();
      companyLogoLoad();
      setupHamburger();
    });
}

let navigateThePage = (parts) =>{
  let page = `/pages/${parts[0]}/${parts[0]}.html`;

  return page;
}


// Load page content
function loadPage(page, menu) {
  fetch(page)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
      setActive(menu);
      
      if (typeof initHeroSlider === "function") {
        initHeroSlider();
      }
      if(typeof companyInformationForPrivacyPolicy === "function"){
        companyInformationForPrivacyPolicy();
      }
      if(typeof companyInformationForContact == "function"){
        companyInformationForContact();
      }
      if (typeof loadTheProductData == "function"){
        loadTheProductData();
      }
      if(typeof loadTheMoreData == "function"){
        loadTheMoreData();
      }
      if(typeof loadTheProductDetailData == "function"){
        loadTheProductDetailData();
      }
      if(typeof moreDetailInit == "function"){
        moreDetailInit();
      }
      if(typeof distributorMethod == "function"){
        distributorMethod();
        indiaMap();
      }
    });
}

// Hash router
async function handleRoute() {
  console.log("run");
  const hash = location.hash || "#/home";
console.log(hash);
  const parts = hash.replace("#/", "").split("/");
  let page = navigateThePage(parts);
  // const page = parts[0];        // buy / rent / home
  // const subPage = parts[1];     // apartments / villas

  loadPage(page, parts[0]);
}

// Hamburger
function setupHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  navMenu.addEventListener("click", e => {
    // console.log(window.innerWidth);
    const navItem = e.target.closest(".nav-item");
    if (!navItem || window.innerWidth > 768) return;
// console.log("nva");
    const clickedLink = e.target.closest("a");
// console.log(clickedLink);
    // ✅ CLICK ON TEXT → NAVIGATE
    if (clickedLink) {
      closeMobileMenu();
      return;
    }

    // ✅ CLICK ON EMPTY SPACE → TOGGLE SUBMENU
    e.preventDefault();
    navItem.classList.toggle("open");
  });
}


function closeMobileMenu() {
  document.getElementById("hamburger")?.classList.remove("active");
  document.getElementById("navMenu")?.classList.remove("open");
}

// Highlight active menu
function setActive(menu) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.menu === menu);
  });
  document.querySelector(".navbar-logo").classList.remove("active");
}

// document.addEventListener("click", e => {
//   if (
//     window.innerWidth <= 768 &&
//     e.target.matches(".submenu a")
//   ) {
//     console.log(e);
//     closeMobileMenu();
//   }
// });

// document.querySelectorAll(".nav-item.dropdown > .nav-link")
//   .forEach(link => {
//     link.addEventListener("click", e => {
//       if (window.innerWidth <= 768) {
//         e.preventDefault();
//         link.parentElement.classList.toggle("open");
//       }
//     });
//   });



// Handle refresh + back/forward
window.addEventListener("hashchange", handleRoute);
window.addEventListener("DOMContentLoaded", handleRoute);

//navbar data
navbarHtmlCodeLoad();