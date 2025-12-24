"use strict";

var loadTheProductDetailData = function loadTheProductDetailData() {
  var dataPageLink, list, data;
  return regeneratorRuntime.async(function loadTheProductDetailData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dataPageLink = fetchJsonDataLink();
          list = null;

          if (pageObj[dataPageLink]) {
            _context.next = 5;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(fetchProductData(dataPageLink));

        case 5:
          data = pageObj[dataPageLink];
          list = data.list;
          data = filtersTheData(list);
          renderProduct(data);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

function renderProduct(p) {
  console.log(JSON.stringify(p));
  console.log(p.images);
  document.getElementById("productDetail").innerHTML = "\n    <!-- IMAGE SECTION -->\n    <div class=\"product-gallery\">\n      <img id=\"mainImage\" src=\"".concat(p.images[0], "\" alt=\"").concat(p.sub_flavour, "\">\n      <div class=\"thumbnail-row\">\n        ").concat(p.images.map(function (img) {
    return "<img src=\"".concat(img, "\" onclick=\"document.getElementById('mainImage').src='").concat(img, "'\">");
  }).join(""), "\n      </div>\n    </div>\n\n    <!-- INFO SECTION -->\n    <div class=\"product-info\">\n      <h1>").concat(p.sub_flavour, "</h1>\n      <div class=\"product-meta\">\n        Brand: ").concat(p.brand, " | Category: ").concat(p.category, "\n      </div>\n\n      <div class=\"price\">\n        \u20B9").concat(p.price, " <del>\u20B9").concat(p.mrp, "</del>\n      </div>\n\n      <p>").concat(p.description, "</p>\n\n      <div class=\"product-specs\">\n        <div><strong>Net Weight:</strong> ").concat(p.net_weight, "</div>\n        <div><strong>Pack Size:</strong> ").concat(p.pack_size, "</div>\n        <div><strong>Shelf Life:</strong> ").concat(p.shelf_life_months, " months</div>\n        <div><strong>Country:</strong> ").concat(p.country_of_origin, "</div>\n        <div><strong>FSSAI:</strong> ").concat(p.fssai_license, "</div>\n        <div><strong>Stock:</strong> ").concat(p.stock_quantity, "</div>\n      </div>\n\n      <h4>Ingredients</h4>\n      <div class=\"tags\">\n        ").concat(p.ingredients.map(function (i) {
    return "<span>".concat(i, "</span>");
  }).join(""), "\n      </div>\n\n      <h4>Allergens</h4>\n      <div class=\"tags\">\n        ").concat(p.allergens.map(function (a) {
    return "<span>".concat(a, "</span>");
  }).join(""), "\n      </div>\n\n      <h4>Available On</h4>\n      <div class=\"available-on\">\n        ").concat(p.available.map(function (a) {
    return "<a href=\"".concat(a.url, "\" target=\"_blank\">\n            <img src=\"").concat(a.logo, "\" alt=\"").concat(a.name, "\">\n          </a>");
  }).join(""), "\n      </div>\n    </div>\n  ");
}