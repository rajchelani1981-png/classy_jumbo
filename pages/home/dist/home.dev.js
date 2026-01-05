"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//data file link
var landingPageSildingFileLink = "/json/landing_sliding.json"; //data store variable

var landingPageSlidingData = null;

function animateCharacters(container) {
  var elements = container.querySelectorAll(".char-animate");
  elements.forEach(function (el) {
    var text = el.dataset.text || el.textContent;
    el.dataset.text = text; // store original text

    el.innerHTML = ""; // clear previous chars

    _toConsumableArray(text).forEach(function (_char, i) {
      var span = document.createElement("span");
      span.className = "char";
      span.textContent = _char === " " ? "\xA0" : _char; // 🔥 RevSlider-style stagger

      span.style.animationDelay = "".concat(i * 0.06, "s");
      el.appendChild(span);
    });
  });
}

var fetchSlidingImageForLandingPage = function fetchSlidingImageForLandingPage() {
  var response, data;
  return regeneratorRuntime.async(function fetchSlidingImageForLandingPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(landingPageSildingFileLink));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          if (data) landingPageSlidingData = data;
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error("error during fetching the sliding page data", _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var loadSlidingHtmlData = function loadSlidingHtmlData(data) {
  //selector
  var landingSlidingSelector = document.querySelector(".hero-slider");
  landingSlidingSelector.innerHTML = "\n  <!-- Splash overlay -->\n  <div class=\"slider-splash\"></div>\n  ";
  data.forEach(function (e) {
    landingSlidingSelector.innerHTML += "\n      <div class=\"slide\">\n        ".concat(e.video_desktop ? "<video autoplay muted loop playsinline>\n            <source src=\"".concat(e.video_desktop, "\" type=\"").concat(e.type, "\">\n          </video>") : "\n          <picture>\n            ".concat(e.mobile_webp ? "<source media=\"(max-width: 768px)\" type=\"image/webp\" srcset=\"".concat(e.mobile_webp, "\">") : "", "\n            ").concat(e.mobile_img ? "<source media=\"(max-width: 768px)\" srcset=\"".concat(e.mobile_img, "\">") : "", "\n            ").concat(e.tablet_webp ? "<source media=\"(max-width: 1024px)\" type=\"image/webp\" srcset=\"".concat(e.tablet_webp, "\">") : "", "\n            ").concat(e.tablet_img ? "<source media=\"(max-width: 1024px)\" srcset=\"".concat(e.tablet_img, "\">") : "", "\n            <source type=\"image/webp\" srcset=\"").concat(e.img_webp, "\">\n            <img src=\"").concat(e.img, "\" loading=\"lazy\">\n          </picture>\n\n          <div class=\"slide-content\">\n            ").concat(e.heading ? "<h1 class=\"char-animate\">".concat(e.heading, "</h1>") : "", "\n            ").concat(e.subheading ? "<p class=\"char-animate delay-1\">".concat(e.subheading, "</p>") : "", "\n          </div>\n          "), "\n        \n      </div>\n    ");
  });
};

var marqueeTrackStyle = function marqueeTrackStyle() {
  var track = document.getElementById("marqueeTrack"); // duplicate content ONCE

  track.innerHTML += track.innerHTML;
  var position = 0;
  var speed = 0.5; // adjust speed here

  function animate() {
    position -= speed;
    var halfWidth = track.scrollWidth / 2;

    if (Math.abs(position) >= halfWidth) {
      position = 0;
    }

    track.style.transform = "translateX(".concat(position, "px)");
    requestAnimationFrame(animate);
  }

  animate();
};

function initHeroSlider() {
  var current, slides, activateSlide;
  return regeneratorRuntime.async(function initHeroSlider$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          activateSlide = function _ref(index) {
            slides.forEach(function (slide) {
              return slide.classList.remove("active");
            });
            var activeSlide = slides[index];
            activeSlide.classList.add("active"); // 🔥 Restart character animation every time

            animateCharacters(activeSlide);
          };

          if (landingPageSlidingData) {
            _context2.next = 4;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(fetchSlidingImageForLandingPage());

        case 4:
          loadSlidingHtmlData(landingPageSlidingData);
          current = 0;
          slides = document.querySelectorAll(".hero-slider .slide");

          if (slides.length) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return");

        case 9:
          activateSlide(current);
          setInterval(function () {
            current = (current + 1) % slides.length;
            activateSlide(current);
          }, 4500);
          videoFunctionInit();
          loadHomeActionAndHeroImage();
          document.querySelectorAll(".slide video").forEach(function (v) {
            return v.pause();
          });
          marqueeTrackStyle();

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/* ===============================
   VIDEO PLAYLISTS (PER BLOCK)
================================ */


var videoPlaylists = null;
var videoLink = "/json/landing_page_video_trending_data.json";

var fetchVideo = function fetchVideo() {
  var response, data;
  return regeneratorRuntime.async(function fetchVideo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch(videoLink));

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context3.sent;
          if (data) videoPlaylists = data;
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error("error fetching the video", _context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/* ===============================
   INITIALIZE PLAYLIST PLAYBACK
================================ */


var videoFunctionInit = function videoFunctionInit() {
  var observer;
  return regeneratorRuntime.async(function videoFunctionInit$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (videoPlaylists) {
            _context4.next = 3;
            break;
          }

          _context4.next = 3;
          return regeneratorRuntime.awrap(fetchVideo());

        case 3:
          document.querySelectorAll(".cj2-video-box").forEach(function (videoBox) {
            var video = videoBox.querySelector("video");
            var playlistKey = videoBox.dataset.playlist;
            var playlist = videoPlaylists[playlistKey];
            if (!playlist || playlist.length === 0) return;
            var currentIndex = 0; // Load & play video

            function playVideo(index) {
              video.pause();
              video.removeAttribute("src");
              video.load();
              video.src = playlist[index];
              video.preload = "none";
              video.load();
              video.play()["catch"](function () {});
            } // When video ends → play next


            video.addEventListener("ended", function () {
              currentIndex++;

              if (currentIndex >= playlist.length) {
                currentIndex = 0; // loop back
              }

              playVideo(currentIndex);
            }); // Start first video

            playVideo(currentIndex);
          });
          console.log("hey");
          observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              var video = entry.target.querySelector("video");

              if (entry.isIntersecting) {
                video.play()["catch"](function () {});
              } else {
                video.pause();
              }
            });
          }, {
            threshold: 0.3
          });
          document.querySelectorAll(".cj2-video-box").forEach(function (box) {
            return observer.observe(box);
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var loadHomeActionAndHeroImage = function loadHomeActionAndHeroImage() {
  var productMenu, contactMenu;
  return regeneratorRuntime.async(function loadHomeActionAndHeroImage$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (menuData) {
            _context5.next = 3;
            break;
          }

          _context5.next = 3;
          return regeneratorRuntime.awrap(fetchMenu());

        case 3:
          if (companyDataForLogo) {
            _context5.next = 6;
            break;
          }

          _context5.next = 6;
          return regeneratorRuntime.awrap(fetchCompanyInformation());

        case 6:
          productMenu = menuData.find(function (pr) {
            return pr.type == "product";
          });
          contactMenu = menuData.find(function (co) {
            return co.type == "contact";
          });
          document.querySelectorAll(".product-link").forEach(function (e) {
            e.href = productMenu.route;
          });
          document.querySelectorAll(".contact-link").forEach(function (e) {
            e.href = contactMenu.route;
          });
          document.querySelectorAll(".hero-image").forEach(function (e) {
            e.src = companyDataForLogo.hero_image;
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  });
};