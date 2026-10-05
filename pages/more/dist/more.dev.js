"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// first - folder same for html file, second-file (json), ...filter with filter key
var loadSubmenuForMore = function loadSubmenuForMore(list) {
  var pageTitle = document.querySelector(".page-title");
  pageTitle.innerHTML = "";
  var subTree = document.createElement("div");
  subTree.className = "tree-sub";
  list.forEach(function (e) {
    var a = "<a href=\"".concat(e.route, "\">").concat(e.title, "</a>");
    subTree.innerHTML += a;
  });
  pageTitle.append(subTree);
};

var pageTitleArrange = function pageTitleArrange(title) {
  document.querySelector(".page-title").innerHTML = "<h1>".concat(title, "</h1>");
};

var moreDataArrange = function moreDataArrange(data) {
  var awardContainer = document.querySelector(".award-container");
  awardContainer.innerHTML = "";
  var hash = location.hash;
  var parts = hash.replace("#/", "").split("/");
  data.forEach(function (e) {
    var pageLink = e.pageLink;

    if (pageLink) {
      pageLink = pageLink.replace(/^.*\/json\/|\.json$/g, "");
    }

    var card = "<div class=\"award-card\" onclick=\"location.href='#/moreDetail/".concat(pageLink ? pageLink : parts[1], "/id-").concat(e.id, "'\">\n            <div class=\"award-image\">\n                <img src=\"").concat(e.thumb_img, "\" alt=\"").concat(e.title, "\">\n            </div>\n\n            <h3 class=\"more-title\">").concat(e.title, "</h3>\n            <p class=\"more-description\">\n                ").concat(e.description, "\n            </p>\n        </div>");
    awardContainer.innerHTML += card;
  });
};

var loadTheMoreData = function loadTheMoreData() {
  var dataPageLink, bannerImage, list, title, flag, data, productHash, productMenu, productDataList, _loop, i;

  return regeneratorRuntime.async(function loadTheMoreData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dataPageLink = fetchJsonDataLink();
          bannerImage = null;
          list = null;
          title = null;
          flag = true;

          if (!dataPageLink) {
            _context2.next = 15;
            break;
          }

          if (pageObj[dataPageLink]) {
            _context2.next = 9;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(fetchProductData(dataPageLink));

        case 9:
          data = pageObj[dataPageLink];
          bannerImage = data.bannerImage;
          list = data.list;
          title = data.page_title;
          _context2.next = 23;
          break;

        case 15:
          if (menuData) {
            _context2.next = 18;
            break;
          }

          _context2.next = 18;
          return regeneratorRuntime.awrap(fetchMenu());

        case 18:
          productHash = location.hash;
          productMenu = menuData.find(function (e) {
            return e.route == productHash;
          });
          bannerImage = productMenu.bannerImage;
          list = productMenu.submenu;
          flag = false;

        case 23:
          loadBannerImage(bannerImage);

          if (!flag) {
            _context2.next = 29;
            break;
          }

          pageTitleArrange(title);
          moreDataArrange(list);
          _context2.next = 40;
          break;

        case 29:
          loadSubmenuForMore(list);
          productDataList = []; //data collect

          _loop = function _loop(i) {
            var pageLink, allProductListWithPageLink;
            return regeneratorRuntime.async(function _loop$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    pageLink = fetchJsonDataLinkByLink(list[i].route);

                    if (pageObj[pageLink]) {
                      _context.next = 4;
                      break;
                    }

                    _context.next = 4;
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
                    return _context.stop();
                }
              }
            });
          };

          i = 0;

        case 33:
          if (!(i < list.length)) {
            _context2.next = 39;
            break;
          }

          _context2.next = 36;
          return regeneratorRuntime.awrap(_loop(i));

        case 36:
          i++;
          _context2.next = 33;
          break;

        case 39:
          moreDataArrange(productDataList);

        case 40:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // loadTheProductData();