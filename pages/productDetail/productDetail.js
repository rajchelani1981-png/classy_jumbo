let loadTheProductDetailData = async () => {
    let dataPageLink = fetchJsonDataLink();
    let list = null;
    
    if (!pageObj[dataPageLink])
        await fetchProductData(dataPageLink);
    
    let data = pageObj[dataPageLink];
    list = data.list;
    package = data.packaging;
    data = filtersTheData(list);
    let otherProduct = filtersOtherRelatedData(list);

    renderProduct(data[0], package);

    // contact form submission
    const form = document.querySelector("#enquiryForm");
    const statusText = document.getElementById("form-status");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        statusText.textContent = "Sending message...";
        statusText.className = "form-status";

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            });

            if (response.ok) {
              statusText.textContent = "✅ Enquiry submit successfully!";
              statusText.classList.add("success");
              form.reset();
              overlay.style.display = "none";

              Swal.fire({
                title: "✅ Enquiry submit successfully!",
                icon: "success",
                draggable: true
              });

            } else {
              overlay.style.display = "none";

              Swal.fire({
                title: "Something went wrong",
                icon: "error",
                draggable: true
              });
              throw new Error("Something went wrong");
            }
        } catch (error) {
          statusText.textContent = "❌ Failed to submit the form. Please try again.";
          statusText.classList.add("error");
          form.reset();

          Swal.fire({
            title: "❌ Failed to submit the form. Please try again.",
            icon: "error",
            draggable: true
          });
        }

        // Fade out message after 4 seconds
        setTimeout(() => {
            statusText.textContent = "";
            statusText.className = "form-status";
        }, 4000);
    });


        //zoom logic
    const box = document.getElementById("imageBox");
    const img = document.getElementById("mainImg");
    const lens = document.getElementById("zoomLens");
    const result = document.getElementById("zoomResult");
    const thumbs = document.querySelectorAll(".thumbs img");

    let zoomData = null;

    /* ---------- INIT ---------- */
    img.onload = () => {
      zoomData = calculateImageArea();
      setupZoom();
    };

    /* ---------- THUMB SWITCH ---------- */
    thumbs.forEach(thumb => {
      thumb.addEventListener("mouseenter", () => {
        thumbs.forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");

        img.src = thumb.dataset.full || thumb.src;
      });
    });

    /* ---------- CALCULATE REAL IMAGE AREA ---------- */
    function calculateImageArea() {
      const boxRect = box.getBoundingClientRect();
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = boxRect.width / boxRect.height;

      let imgWidth, imgHeight, imgLeft, imgTop;

      if (imgRatio > boxRatio) {
        imgWidth = boxRect.width;
        imgHeight = boxRect.width / imgRatio;
        imgLeft = 0;
        imgTop = (boxRect.height - imgHeight) / 2;
      } else {
        imgHeight = boxRect.height;
        imgWidth = boxRect.height * imgRatio;
        imgTop = 0;
        imgLeft = (boxRect.width - imgWidth) / 2;
      }

      return { imgWidth, imgHeight, imgLeft, imgTop };
    }

    /* ---------- SETUP ZOOM ---------- */
    function setupZoom() {
      const cx = result.offsetWidth / lens.offsetWidth;
      const cy = result.offsetHeight / lens.offsetHeight;

      result.style.backgroundImage = `url('${img.src}')`;
      result.style.backgroundSize =
        `${img.naturalWidth * cx}px ${img.naturalHeight * cy}px`;

      box.onmousemove = e => moveLens(e, cx, cy);
    }

    /* ---------- MOVE LENS ---------- */
    function moveLens(e) {
      const rect = box.getBoundingClientRect();
      let x = e.clientX - rect.left - lens.offsetWidth / 2;
      let y = e.clientY - rect.top - lens.offsetHeight / 2;

      x = Math.max(0, Math.min(x, box.offsetWidth - lens.offsetWidth));
      y = Math.max(0, Math.min(y, box.offsetHeight - lens.offsetHeight));

      lens.style.left = x + "px";
      lens.style.top = y + "px";

      result.style.backgroundPosition =
        `-${x * (result.offsetWidth / lens.offsetWidth)}px
        -${y * (result.offsetHeight / lens.offsetHeight)}px`;
    }


    //form hide and visible
    const openBtn = document.getElementById("openEnquiry");
    const closeBtn = document.getElementById("closeEnquiry");
    const overlay = document.getElementById("enquiryOverlay");

    openBtn.addEventListener("click", () => {
      overlay.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
    });

    overlay.addEventListener("click", e => {
      if (e.target === overlay) overlay.style.display = "none";
    });

    //slider in product detail
    const slider = document.getElementById("relatedSlider");
    const wrapper = document.querySelector(".slider-wrapper");

    /* DUPLICATE FOR LOOP */
    const loopData = [...otherProduct, ...otherProduct];
    let hash = location.hash;
    const parts = hash.replace("#/", "").split("/");
    
    /* RENDER */
    slider.innerHTML = loopData.map(p => `
      <div class="related-card" onclick="location.href='#/productDetail/${parts[1]}/id-${p.id}'">
        <img src="${p.thumbnail}">
        <h4>${p.sub_flavour}</h4>
        <span>${p.brand}</span>
      </div>
    `).join("");

    /* CONFIG */
    const cardWidth = 280;
    const totalWidth = otherProduct.length * cardWidth;
    const speed = 0.4;

    /* STATE */
    let position = 0;
    let currentIndex = 0;
    let isDragging = false;
    let isPaused = false;
    let startX = 0;
    let startPos = 0;

    /* AUTO SLIDE */
    function autoSlide() {
      if (!isPaused && !isDragging) {
        position += speed;

        if (position >= totalWidth) {
          position = 0;
        }

        updateIndex();
        slider.style.transform = `translateX(-${position}px)`;
      }
      requestAnimationFrame(autoSlide);
    }

    /* UPDATE INDEX */
    function updateIndex() {
      currentIndex = Math.round(position / cardWidth) % otherProduct.length;
      if (currentIndex < 0) currentIndex += otherProduct.length;

      // OPTIONAL: highlight active card
      highlightActive();
    }

    /* ACTIVE CARD (OPTIONAL UX) */
    function highlightActive() {
      document.querySelectorAll(".related-card").forEach((card, i) => {
        card.classList.toggle("active", i % otherProduct.length === currentIndex);
      });
    }

    /* DRAG START */
    function dragStart(x) {
      isDragging = true;
      isPaused = true;
      startX = x;
      startPos = position;
    }

    /* DRAG MOVE */
    function dragMove(x) {
      if (!isDragging) return;
      position = startPos - (x - startX);
      slider.style.transform = `translateX(-${position}px)`;
    }

    /* DRAG END */
    function dragEnd() {
      if (!isDragging) return;

      isDragging = false;
      isPaused = false;

      /* SNAP TO NEAREST CARD */
      position = Math.round(position / cardWidth) * cardWidth;
      position = position % totalWidth;

      updateIndex();
      slider.style.transform = `translateX(-${position}px)`;
    }

    /* EVENTS */
    wrapper.addEventListener("mouseenter", () => isPaused = true);
    wrapper.addEventListener("mouseleave", () => isPaused = false);

    /* START */
    autoSlide();


    document.getElementById("nextBtn").onclick = () => {
      if (currentIndex < otherProduct.length - 1) {
        currentIndex++;
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    };

    document.getElementById("prevBtn").onclick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    };
  }  

  let productImages = (productImg) =>{
    return productImg.map( (e, i) =>`<img src="${e}"
          data-full="${e}"
          class="${i == 0 ? "active" : ""}"
          >`).join("");
  }

  let productTags = (prTags) =>{
    return prTags.map( e =>`<span>${e}</span>`).join("");
  }

  let productPackaging = (product, package) =>{
    return package.map(e => `
        <div>
          <h3>Packaging Details</h3>
          <ul>
            <li><strong>Contains:</strong> ${e.item_package_material} of ${product.flavour} ${product.category == product.flavour ? "" : product.category}</li>
            <li><strong>Packaging:</strong> ${e.item_package_material} with outer ${e.box_material}</li>
            <li><strong>Carton Packaging:</strong> ${e.box_contains} ${e.item_count_type} × ${product.net_weight ? product.net_weight : e.product_weight} ${e.product_mrp ? `(${e.product_mrp} ₹ / ${e.item_count_type})` : "" }</li>
            <li><strong>Per Piece Weight:</strong> ${product.net_weight ? product.net_weight : e.product_weight}</li>
          </ul>
        </div>
      `).join("");
  }

  let renderProduct = (product, package) =>{
    document.getElementsByName("product")[0].value = `${product.brand} - ${product.flavour}`;

    let images = productImages(product.images);
    let metaData = `${product.category} | ${product.sub_flavour}`;
    let tags = productTags(product.tags);
    let packaging = productPackaging(product, package);

    document.getElementsByClassName("product")[0].innerHTML = `
      <!-- IMAGE SECTION -->
      <div class="image-area">
        <div class="image-box" id="imageBox">
          <img id="mainImg"
              src="${product.images[0]}"
              alt="Product Image">
          <div class="zoom-lens" id="zoomLens"></div>
        </div>

        <div class="zoom-result" id="zoomResult"></div>

        <div class="thumbs">
          ${images}
        </div>
      </div>

      <!-- PRODUCT INFO -->
      <div class="info">
        <h1>${product.brand == "Classy" ? `${product.brand} - ${product.sub_flavour}` : `${product.brand} - ${product.flavour}`}</h1>
        <div class="meta">${metaData}</div>

        <p class="desc">
          ${product.description}
        </p>

        <div class="tags">
          ${tags}
        </div>

        <div class="specs">
          <div><span>Shelf Life</span><span>${product.shelf_life_months} Months</span></div>
          <div><span>Country</span><span>${product.country_of_origin}</span></div>
        </div>

        <div class="packaging">
          ${packaging}
        </div>

        <button class="enquiry-btn" id="openEnquiry">
          Enquiry Now
        </button>
      </div>
    `;
  }
