"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  var response, data;
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
          data = _context.sent;
          if (data) pageObj[dataPageLink] = data;
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
    var key = decodeURIComponent(filter[0]);
    var value = decodeURIComponent(filter[1]);
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
  document.querySelector(".page-banner").innerHTML = "\n    <picture>\n      ".concat(imageLink.mobile_webp ? "<source media=\"(max-width: 768px)\" type=\"image/webp\" srcset=\"".concat(imageLink.mobile_webp, "\">") : "", "\n      ").concat(imageLink.mobile_img ? "<source media=\"(max-width: 768px)\" srcset=\"".concat(imageLink.mobile_img, "\">") : "", "\n      ").concat(imageLink.tablet_webp ? "<source media=\"(max-width: 1024px)\" type=\"image/webp\" srcset=\"".concat(imageLink.tablet_webp, "\">") : "", "\n      ").concat(imageLink.tablet_img ? "<source media=\"(max-width: 1024px)\" srcset=\"".concat(imageLink.tablet_img, "\">") : "", "\n      <source type=\"image/webp\" srcset=\"").concat(imageLink.img_webp, "\">\n      <img src=\"").concat(imageLink.img, "\" loading=\"lazy\">\n    </picture>");
};

var appendProducts = function appendProducts(data, grid) {
  var hash = location.hash;
  var parts = hash.replace("#/", "").split("/");
  var fragment = document.createDocumentFragment();
  data.forEach(function (p) {
    var pageLink = p.pageLink ? p.pageLink.replace(/^.*\/json\/|\.json$/g, "") : parts[1];
    var card = document.createElement("div");
    card.className = "product-card";
    card.dataset.link = "#/productDetail/".concat(pageLink, "/id-").concat(p.id);
    card.innerHTML = "\n        <img\n          data-src=\"".concat(p.thumbnail, "\"\n          class=\"lazy-img\"\n          alt=\"").concat(p.sub_flavour, "\" >\n        <h3>").concat(p.flavour, "</h3>\n        <span>").concat(p.brand, "</span>\n      ");
    fragment.appendChild(card);
  });
  grid.appendChild(fragment); // Observe newly added images

  grid.querySelectorAll(".lazy-img").forEach(function (img) {
    return imgObserver.observe(img);
  });
};

var idle = window.requestIdleCallback || function (cb) {
  return setTimeout(cb, 1);
};

var imgObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var img = entry.target;
      img.src = img.dataset.src;
      imgObserver.unobserve(img);
    }
  });
});

var productDataArrange = function productDataArrange(data) {
  var grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  if (data.length > 12) {
    appendProducts(data.slice(0, 12), grid);
    idle(function () {
      appendProducts(data.slice(12), grid);
    });
  } else {
    appendProducts(data, grid);
  }
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

var fetchJsonDataLinkByLink = function fetchJsonDataLinkByLink(link) {
  var parts = link.replace("#/", "").split("/");
  return "/json/".concat(parts[1], ".json");
};

var loadTheProductData = function loadTheProductData() {
  var dataPageLink, bannerImage, list, flag, data, productHash, productMenu, _filteredData, categories, keyIndex, i, productDataList, _loop, _i;

  return regeneratorRuntime.async(function loadTheProductData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          dataPageLink = fetchJsonDataLink();
          bannerImage = null;
          list = null;
          flag = true;

          if (!dataPageLink) {
            _context3.next = 13;
            break;
          }

          if (pageObj[dataPageLink]) {
            _context3.next = 8;
            break;
          }

          _context3.next = 8;
          return regeneratorRuntime.awrap(fetchProductData(dataPageLink));

        case 8:
          data = pageObj[dataPageLink];
          bannerImage = data.bannerImage;
          list = data.list;
          _context3.next = 21;
          break;

        case 13:
          if (menuData) {
            _context3.next = 16;
            break;
          }

          _context3.next = 16;
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
            _context3.next = 39;
            break;
          }

          _filteredData = filtersTheData(list);
          productDataArrange(_filteredData); // arrange for filter

          categories = new Set();
          keyIndex = 0;
          i = 0;

        case 28:
          if (!(i < filterSequenceWithKey.length)) {
            _context3.next = 36;
            break;
          }

          categories = fetchCategory(_filteredData, filterSequenceWithKey[i]);
          keyIndex = i;

          if (!(categories.size > 1)) {
            _context3.next = 33;
            break;
          }

          return _context3.abrupt("break", 36);

        case 33:
          i++;
          _context3.next = 28;
          break;

        case 36:
          filterOptionLoad(categories, filterSequenceWithKey[keyIndex]);
          _context3.next = 50;
          break;

        case 39:
          loadSubmenu(list); //data stroage

          productDataList = []; //data collect

          _loop = function _loop(_i) {
            var pageLink, allProductListWithPageLink;
            return regeneratorRuntime.async(function _loop$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    pageLink = fetchJsonDataLinkByLink(list[_i].route);

                    if (pageObj[pageLink]) {
                      _context2.next = 4;
                      break;
                    }

                    _context2.next = 4;
                    return regeneratorRuntime.awrap(fetchProductData(pageLink));

                  case 4:
                    allProductListWithPageLink = pageObj[pageLink].list.map(function (item) {
                      return _objectSpread({}, item, {
                        "pageLink": pageLink
                      });
                    });
                    productDataList.push.apply(productDataList, _toConsumableArray(allProductListWithPageLink));

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          };

          _i = 0;

        case 43:
          if (!(_i < list.length)) {
            _context3.next = 49;
            break;
          }

          _context3.next = 46;
          return regeneratorRuntime.awrap(_loop(_i));

        case 46:
          _i++;
          _context3.next = 43;
          break;

        case 49:
          productDataArrange(productDataList);

        case 50:
          document.getElementById("productGrid").addEventListener("click", function (e) {
            var card = e.target.closest(".product-card");
            if (!card) return;
            location.hash = card.dataset.link;
          });

        case 51:
        case "end":
          return _context3.stop();
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