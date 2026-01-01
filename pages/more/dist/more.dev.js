"use strict";

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
  data.forEach(function (e) {
    var card = "<div class=\"award-card\">\n            <div class=\"award-image\">\n                <img src=\"".concat(e.image, "\" alt=\"").concat(e.title, "\">\n            </div>\n\n            <h3 class=\"more-title\">").concat(e.title, "</h3>\n            <p class=\"more-description\">\n                ").concat(e.description, "\n            </p>\n        </div>");
    awardContainer.innerHTML += card;
  });
};

var loadTheMoreData = function loadTheMoreData() {
  var dataPageLink, bannerImage, list, title, flag, data, productHash, productMenu;
  return regeneratorRuntime.async(function loadTheMoreData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dataPageLink = fetchJsonDataLink();
          bannerImage = null;
          list = null;
          title = null;
          flag = true;

          if (!dataPageLink) {
            _context.next = 15;
            break;
          }

          if (pageObj[dataPageLink]) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(fetchProductData(dataPageLink));

        case 9:
          data = pageObj[dataPageLink];
          bannerImage = data.bannerImage;
          list = data.list;
          title = data.page_title;
          _context.next = 23;
          break;

        case 15:
          if (menuData) {
            _context.next = 18;
            break;
          }

          _context.next = 18;
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

          if (flag) {
            pageTitleArrange(title);
            moreDataArrange(list);
          } else {
            loadSubmenuForMore(list);
          }

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
}; // loadTheProductData();