"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// first - folder same for html file, second-file (json), ...filter with filter key
var pageObj = {};
var filterSequenceWithKey = ["category", "flavour"];

var fetchJsonDataLink = function fetchJsonDataLink() {
  var hash = location.hash;
  var jsonDataPageLink = "/json";
  var parts = hash.replace("#/", "").split("/"); //if json file name not found then

  if (!parts[1]) return null;
  jsonDataPageLink += "/".concat(parts[1], ".json");
  return jsonDataPageLink;
};

var fetchProductData = function fetchProductData(dataPageLink) {
  var response, _data;

  return regeneratorRuntime.async(function fetchProductData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(dataPageLink));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          _data = _context.sent;
          if (_data) pageObj[dataPageLink] = _data;
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log("error", _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var filteredData = function filteredData(key, value, data) {
  return data.filter(function (e) {
    return e[key].toUpperCase() == value.toUpperCase();
  });
};

var filteredRelatedData = function filteredRelatedData(key, value, data) {
  return data.filter(function (e) {
    return e[key].toUpperCase() != value.toUpperCase();
  });
};

var filtersTheData = function filtersTheData(data) {
  var hash = location.hash;
  var parts = hash.replace("#/", "").split("/");

  for (var i = 2; i < parts.length; i++) {
    var filter = parts[i].split("-");
    var key = filter[0];
    var value = filter[1];
    if (key && value && data) data = filteredData(key, value, data);
  }

  return data;
};

var filtersOtherRelatedData = function filtersOtherRelatedData(data) {
  var hash = location.hash;
  var parts = hash.replace("#/", "").split("/");

  for (var i = 2; i < parts.length; i++) {
    var filter = parts[i].split("-");
    var key = filter[0];
    var value = filter[1];
    if (key && value && data) data = filteredRelatedData(key, value, data);
  }

  return data;
};

var loadBannerImage = function loadBannerImage(imageLink) {
  document.querySelector(".page-banner").innerHTML = "\n    <picture>\n      ".concat(imageLink.mobile_img ? "<source media=\"(max-width: 768px)\" srcset=\"".concat(imageLink.mobile_img, "\">") : "", "\n      ").concat(imageLink.tablet_img ? "<source media=\"(max-width: 1024px)\" srcset=\"".concat(imageLink.tablet_img, "\">") : "", "\n      <img src=\"").concat(imageLink.img, "\">\n    </picture>");
};

var productDataArrange = function productDataArrange(data) {
  var hash = location.hash;
  var parts = hash.replace("#/", "").split("/");
  var grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  data.forEach(function (p) {
    grid.innerHTML += "\n          <div class=\"product-card\" onclick=\"location.href='#/productDetail/".concat(parts[1], "/id-").concat(p.id, "'\">\n            <img src=\"").concat(p.thumbnail, "\" alt=\"").concat(p.sub_flavour, "\">\n            <h3>").concat(p.flavour, "</h3>\n            <span>").concat(p.brand, "</span>\n          </div>\n        ");
  });
}; //fetch category list


var fetchCategory = function fetchCategory(data, filterKey) {
  var list = new Set();

  for (var i = 0; i < data.length; i++) {
    list.add(data[i][filterKey]);
  }

  return list;
};

function syncTabs(currentCategory) {
  var tabs = document.querySelectorAll(".category-tabs button");
  tabs.forEach(function (b) {
    b.classList.toggle("active", b.dataset.category === currentCategory);
  });
}

var filterOptionLoad = function filterOptionLoad(data, filterKey) {
  var categoryTabs = document.querySelector(".category-tabs");
  categoryTabs.innerHTML = "";
  data.forEach(function (e) {
    var button = document.createElement("button");
    button.dataset.category = "".concat(filterKey, "-").concat(e);
    button.textContent = e.toUpperCase();
    button.addEventListener("click", function () {
      updateTheHashWithPreviousData("".concat(filterKey, "-").concat(e));
      loadTheProductData();
      syncTabs("".concat(filterKey, "-").concat(e));
    });
    categoryTabs.append(button);
  });
};

var loadSubmenu = function loadSubmenu(list) {
  var categoryTabs = document.querySelector(".category-tabs");
  categoryTabs.innerHTML = "";
  list.forEach(function (e) {
    var button = document.createElement("button");
    button.dataset.category = "".concat(e.route);
    button.textContent = e.title;
    button.addEventListener("click", function () {
      location.hash = e.route;
      loadTheProductData();
      syncTabs(e.route);
    });
    categoryTabs.append(button);
  });
};

var loadTheProductData = function loadTheProductData() {
  var dataPageLink, bannerImage, list, flag, _data2, productHash, productMenu, categories, keyIndex, i;

  return regeneratorRuntime.async(function loadTheProductData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dataPageLink = fetchJsonDataLink();
          bannerImage = null;
          list = null;
          flag = true;

          if (!dataPageLink) {
            _context2.next = 13;
            break;
          }

          if (pageObj[dataPageLink]) {
            _context2.next = 8;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(fetchProductData(dataPageLink));

        case 8:
          _data2 = pageObj[dataPageLink];
          bannerImage = _data2.bannerImage;
          list = _data2.list;
          _context2.next = 21;
          break;

        case 13:
          if (menuData) {
            _context2.next = 16;
            break;
          }

          _context2.next = 16;
          return regeneratorRuntime.awrap(fetchMenu());

        case 16:
          productHash = location.hash;
          productMenu = menuData.find(function (e) {
            return e.route == productHash;
          });
          bannerImage = productMenu.bannerImage;
          list = productMenu.submenu;
          flag = false;

        case 21:
          loadBannerImage(bannerImage);

          if (!flag) {
            _context2.next = 39;
            break;
          }

          data = filtersTheData(list);
          productDataArrange(data); // arrange for filter

          categories = new Set();
          keyIndex = 0;
          i = 0;

        case 28:
          if (!(i < filterSequenceWithKey.length)) {
            _context2.next = 36;
            break;
          }

          categories = fetchCategory(data, filterSequenceWithKey[i]);
          keyIndex = i;

          if (!(categories.size > 1)) {
            _context2.next = 33;
            break;
          }

          return _context2.abrupt("break", 36);

        case 33:
          i++;
          _context2.next = 28;
          break;

        case 36:
          filterOptionLoad(categories, filterSequenceWithKey[keyIndex]);
          _context2.next = 40;
          break;

        case 39:
          loadSubmenu(list);

        case 40:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //expected changeFilter = "/key-value/key-value"
//for isolate filter


function updateTheHashWithIsolateData(changeFilter) {
  var hash = location.hash;
  var parts = hash.replace("#/", "").split("/");
  location.hash = "#/".concat(parts[0], "/").concat(parts[1]).concat(changeFilter);
} //with previous filter


function updateTheHashWithPreviousData(changeFilter) {
  var hash = location.hash.replace(/^#\/?/, ""); // remove # or #/

  var parts = hash.split("/").filter(Boolean);
  var changeParts = changeFilter.replace("/", "");
  var segmentSet = new Set(parts);
  segmentSet.add(changeFilter);
  location.hash = "#/" + _toConsumableArray(segmentSet).join("/");
} // loadTheProductData();