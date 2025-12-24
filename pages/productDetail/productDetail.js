let loadTheProductDetailData = async () => {
    let dataPageLink = fetchJsonDataLink();
    let list = null;
    
    if (!pageObj[dataPageLink])
        await fetchProductData(dataPageLink);
    
    let data = pageObj[dataPageLink];
    list = data.list;
    
    data = filtersTheData(list);
    renderProduct(data);
  }


    function renderProduct(p) {
        console.log(JSON.stringify(p));

        console.log(p.images);
      document.getElementById("productDetail").innerHTML = `
    <!-- IMAGE SECTION -->
    <div class="product-gallery">
      <img id="mainImage" src="${p.images[0]}" alt="${p.sub_flavour}">
      <div class="thumbnail-row">
        ${p.images.map(img =>
          `<img src="${img}" onclick="document.getElementById('mainImage').src='${img}'">`
        ).join("")}
      </div>
    </div>

    <!-- INFO SECTION -->
    <div class="product-info">
      <h1>${p.sub_flavour}</h1>
      <div class="product-meta">
        Brand: ${p.brand} | Category: ${p.category}
      </div>

      <div class="price">
        ₹${p.price} <del>₹${p.mrp}</del>
      </div>

      <p>${p.description}</p>

      <div class="product-specs">
        <div><strong>Net Weight:</strong> ${p.net_weight}</div>
        <div><strong>Pack Size:</strong> ${p.pack_size}</div>
        <div><strong>Shelf Life:</strong> ${p.shelf_life_months} months</div>
        <div><strong>Country:</strong> ${p.country_of_origin}</div>
        <div><strong>FSSAI:</strong> ${p.fssai_license}</div>
        <div><strong>Stock:</strong> ${p.stock_quantity}</div>
      </div>

      <h4>Ingredients</h4>
      <div class="tags">
        ${p.ingredients.map(i => `<span>${i}</span>`).join("")}
      </div>

      <h4>Allergens</h4>
      <div class="tags">
        ${p.allergens.map(a => `<span>${a}</span>`).join("")}
      </div>

      <h4>Available On</h4>
      <div class="available-on">
        ${p.available.map(a =>
          `<a href="${a.url}" target="_blank">
            <img src="${a.logo}" alt="${a.name}">
          </a>`
        ).join("")}
      </div>
    </div>
  `;
}