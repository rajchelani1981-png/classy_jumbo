// first - folder same for html file, second-file (json), ...filter with filter key
  let pageObj = {};
  let filterSequenceWithKey = ["category", "flavour"];

  let fetchJsonDataLink = () => {
    const hash = location.hash;
    let jsonDataPageLink = "/json";
    const parts = hash.replace("#/", "").split("/");

    //if json file name not found then
    if(!parts[1])
      return null;

    jsonDataPageLink += `/${parts[1]}.json`;
    return jsonDataPageLink;
  }

  let fetchProductData = async (dataPageLink) =>{
    try{
      let response = await fetch(dataPageLink);
      let data = await response.json();

      if(data)
        pageObj[dataPageLink] = data;
    }
    catch (error){
      console.log("error", error);
    }
  }

  let filteredData = (key, value, data) => {
    return data.filter( e => e[key].toUpperCase() == value.toUpperCase());
  }

  let filtersTheData = (data) => {
    const hash = location.hash;
    const parts = hash.replace("#/", "").split("/");
    
    for(let i = 2; i < parts.length; i++){
      let filter = parts[i].split("-");

      let key = filter[0];
      let value = filter[1];

      if(key && value && data)
        data = filteredData(key, value, data);
    }
    return data;
  }

  let loadBannerImage = (imageLink) => {
    document.querySelector(".page-banner").innerHTML = `<img src="${imageLink}" alt="image">`;
  }

  let productDataArrange = (data) => {
    const hash = location.hash;
    const parts = hash.replace("#/", "").split("/");

    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";
    data.forEach(p => {
        grid.innerHTML += `
          <div class="product-card" onclick="location.href='#/productDetail/${parts[1]}/id-${p.id}'">
            <img src="${p.thumbnail}" alt="${p.sub_flavour}">
            <h3>${p.brand}</h3>
            <span>${p.category}</span>
          </div>
        `;
      });
  }

  //fetch category list
  let fetchCategory = (data, filterKey) =>{
    let list = new Set();

    for(let i=0; i < data.length; i++){
      list.add(data[i][filterKey]);
    }
    return list;
  }

  function syncTabs(currentCategory) {
    let tabs = document.querySelectorAll(".category-tabs button");
    tabs.forEach(b => {
      b.classList.toggle("active", b.dataset.category === currentCategory);
    });
  }

  let filterOptionLoad = (data, filterKey) => {
    let categoryTabs = document.querySelector(".category-tabs");
    categoryTabs.innerHTML = "";

    data.forEach(e => {
      let button = document.createElement("button");

      button.dataset.category = `${filterKey}-${e}`;
      button.textContent = e.toUpperCase();
      button.addEventListener("click", () => {
        updateTheHashWithPreviousData(`${filterKey}-${e}`);
        loadTheProductData();
        syncTabs(`${filterKey}-${e}`);
      });

      categoryTabs.append(button);
    });
  }

  let loadSubmenu = (list) =>{
    let categoryTabs = document.querySelector(".category-tabs");
    categoryTabs.innerHTML = "";

    list.forEach(e => {
      let button = document.createElement("button");

      button.dataset.category = `${e.route}`;
      button.textContent = e.title;
      button.addEventListener("click", () => {
        location.hash = e.route;
        loadTheProductData();
        syncTabs(e.route);
      });

      categoryTabs.append(button);
    });
  }

  let loadTheProductData = async () => {
    let dataPageLink = fetchJsonDataLink();
    let bannerImage = null;
    let list = null;
    let flag = true;
    
    if(dataPageLink){
      if (!pageObj[dataPageLink]){
        await fetchProductData(dataPageLink);
      }
      let data = pageObj[dataPageLink];
      
      bannerImage = data.bannerImage;
      list = data.list;
    }
    else{
      if(!menuData)
        await fetchMenu();

      let productHash = location.hash;
      let productMenu = menuData.find( e => e.route == productHash);

      bannerImage = productMenu.bannerImage;
      list = productMenu.submenu;
      flag = false;
    }

    loadBannerImage(bannerImage)

    if(flag){
      data = filtersTheData(list);
      productDataArrange(data);

      // arrange for filter
      let categories = new Set();
      let keyIndex = 0;
      
      for(let i=0; i < filterSequenceWithKey.length; i++){
        categories = fetchCategory(data, filterSequenceWithKey[i]);
        keyIndex = i;

        if(categories.size > 1){
          break;
        }
      }

      filterOptionLoad(categories, filterSequenceWithKey[keyIndex]);
    }
    else{
      loadSubmenu(list);
    }
  }

  
  //expected changeFilter = "/key-value/key-value"
  //for isolate filter
  function updateTheHashWithIsolateData(changeFilter) {
    let hash = location.hash;
    let parts = hash.replace("#/", "").split("/");
    location.hash = `#/${parts[0]}/${parts[1]}${changeFilter}`;
  }

  //with previous filter
  function updateTheHashWithPreviousData(changeFilter) {
    const hash = location.hash.replace(/^#\/?/, ""); // remove # or #/
    const parts = hash.split("/").filter(Boolean);
    const changeParts = changeFilter.replace("/", "")

    const segmentSet = new Set(parts);
    segmentSet.add(changeFilter);

    location.hash = "#/" + [...segmentSet].join("/");
  }

// loadTheProductData();