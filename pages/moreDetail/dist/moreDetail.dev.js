"use strict";

var moreDetailInit = function moreDetailInit() {
  console.log("test");
  var index = 0;
  var slides = document.getElementById("more-slides");
  var thumbs = document.querySelectorAll(".more-thumb");
  var total = slides.children.length;

  function updateSlider() {
    slides.style.transform = "translateX(-".concat(index * 100, "%)");
    thumbs.forEach(function (t, i) {
      return t.classList.toggle("active", i === index);
    }); // Pause all videos except active

    document.querySelectorAll("video").forEach(function (v) {
      return v.pause();
    });
  }

  function nextSlide() {
    index = (index + 1) % total;
    updateSlider();
  }

  function prevSlide() {
    index = (index - 1 + total) % total;
    updateSlider();
  }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function () {
      index = i;
      updateSlider();
    });
  });
  var moreNext = document.querySelector(".more-next").addEventListener("click", function () {
    console.log("tst");
    nextSlide();
  });
  var morePrev = document.querySelector(".more-prev").addEventListener("click", function () {
    prevSlide();
  });
  console.log(moreNext);
  console.log(morePrev);
  updateSlider();
};