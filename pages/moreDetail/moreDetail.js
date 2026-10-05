let moreDetailPageImagesArrange = (images) => {
    return images.map(img => `<div class="more-slide"><img src="${img}"></div>`).join("");
}

let moreDetailPageVideosArrange = (videos) => {
    return videos.map(vid => `<div class="more-slide"><video controls><source src="${vid.video}" type="${vid.type}"></video></div>`).join("");
}

let moreDetailPageThumbImagesArrange = (images) => {
    return images.map(img => `<div class="more-thumb"><img src="${img}"></div>`).join("");
}

let moreDetailPageThumbVideosArrange = (videos) => {
    return videos.map(vid => `<div class="more-thumb"><video muted><source src="${vid.video}"></video></div>`).join("");
}

let moreDetailDataArrange = (data) =>{
    let moreHero = document.querySelector(".more-hero");
    let moreContainer = document.querySelector(".more-container");

    moreHero.innerHTML = "";
    moreContainer.innerHTML = "";

    data.forEach(e => {
        let moreImages = moreDetailPageImagesArrange(e.images);
        let moreVideos = moreDetailPageVideosArrange(e.videos);
        let thumbImages = moreDetailPageThumbImagesArrange(e.images);
        let thumbVideos = moreDetailPageThumbVideosArrange(e.videos);

        moreHero.innerHTML = `
            <h1>${e.title}</h1>

            ${e.sub_title ? `<p>${e.sub_title}</p>` : ""}
        `
        moreContainer.innerHTML = `
            <!-- ===== SLIDER ===== -->
            <div class="more-slider-wrapper">
                <div class="more-slider">
                    <button class="more-nav-btn more-prev">❮</button>
                    <button class="more-nav-btn more-next">❯</button>

                    <div class="more-slides" id="more-slides">
                        <!-- Images -->
                        ${moreImages ? moreImages : ""}

                        <!-- Videos -->
                        
                        ${moreVideos ? moreVideos : ""}
                    </div>
                </div>

                <!-- Thumbnails -->
                <div class="more-thumbs" id="more-thumbs">
                    ${thumbImages ? thumbImages : ""}
                    ${thumbVideos ? thumbVideos : ""}
                </div>
            </div>

            <!-- ===== TEXT CONTENT ===== -->
            <div class="more-content">
                <h2>${e.title}</h2>
                <p>
                    ${e.detail_description}
                </p>
            </div>
        `
    })
}

let loadMoreDetailPage = async () => {
    let dataPageLink = fetchJsonDataLink();
    let list = null;

    if (!pageObj[dataPageLink])
        await fetchProductData(dataPageLink);

    let data = pageObj[dataPageLink];
    list = data.list;

    let filteredData = filtersTheData(list);

    moreDetailDataArrange(filteredData);
}
let moreDetailInit = async () =>{
    await loadMoreDetailPage();

    let index = 0;
    const slides = document.getElementById("more-slides");
    const thumbs = document.querySelectorAll(".more-thumb");
    const total = slides.children.length;

    function updateSlider() {
        slides.style.transform = `translateX(-${index * 100}%)`;
        thumbs.forEach((t, i) => t.classList.toggle("active", i === index));

        // Pause all videos except active
        document.querySelectorAll("video").forEach(v => v.pause());
    }

    function nextSlide() {
        index = (index + 1) % total;
        updateSlider();
    }

    function prevSlide() {
        index = (index - 1 + total) % total;
        updateSlider();
    }

    thumbs.forEach((thumb, i) => {
        thumb.addEventListener("click", () => {
            index = i;
            updateSlider();
        });
    });

    document.querySelector(".more-next").addEventListener("click", () =>{
        nextSlide();
    });
    document.querySelector(".more-prev").addEventListener("click", () =>{
        prevSlide();
    });

    updateSlider();
}