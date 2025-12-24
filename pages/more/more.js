// first - folder same for html file, second-file (json), ...filter with filter key

let loadSubmenuForMore = (list) => {
    let pageTitle = document.querySelector(".page-title");
    pageTitle.innerHTML = "";

    let subTree = document.createElement("div");
    subTree.className = "tree-sub";

    list.forEach (e => {
        let a = `<a href="${e.route}">${e.title}</a>`;
        subTree.innerHTML += a;
    });
    pageTitle.append(subTree);
}

let pageTitleArrange = (title) => {
    document.querySelector(".page-title").innerHTML = `<h1>${title}</h1>`;
}

let moreDataArrange = (data) =>{
    let awardContainer = document.querySelector(".award-container");
    awardContainer.innerHTML = "";

    data.forEach( e => {
        let card = `<div class="award-card">
            <div class="award-image">
                <img src="${e.image}" alt="${e.title}">
            </div>

            <h3 class="more-title">${e.title}</h3>
            <p class="award-year">${e.year}</p>
            <p class="more-description">
                ${e.description}
            </p>
        </div>`;
        awardContainer.innerHTML += card;
    });
}

let loadTheMoreData = async () => {
    let dataPageLink = fetchJsonDataLink();
    let bannerImage = null;
    let list = null;
    let title = null;
    let flag = true;

    if(dataPageLink){
        if (!pageObj[dataPageLink])
        await fetchProductData(dataPageLink);
        
        let data = pageObj[dataPageLink];
        
        bannerImage = data.bannerImage;
        list = data.list;
        title = data.page_title;
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
        pageTitleArrange(title);
        moreDataArrange(list);
    }
    else{
        loadSubmenuForMore(list);
    }
}

// loadTheProductData();