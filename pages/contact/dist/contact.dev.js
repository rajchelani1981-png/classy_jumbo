"use strict";

var companyInformationForContact = function companyInformationForContact() {
  return regeneratorRuntime.async(function companyInformationForContact$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          companyAddressLoad();
          companyMailLinkLoad();
          companyPhoneLinkLoad();
          contactFormInit();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var contactFormInit = function contactFormInit() {
  // contact form submission
  var form = document.querySelector("#contactForm");
  var statusText = document.getElementById("form-status");
  form.addEventListener("submit", function _callee(e) {
    var formData, response;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            e.preventDefault();
            statusText.textContent = "Sending message...";
            statusText.className = "form-status";
            _context2.prev = 3;
            formData = new FormData(form);
            _context2.next = 7;
            return regeneratorRuntime.awrap(fetch(form.action, {
              method: "POST",
              body: formData
            }));

          case 7:
            response = _context2.sent;

            if (!response.ok) {
              _context2.next = 14;
              break;
            }

            statusText.textContent = "✅ Form submit successfully!";
            statusText.classList.add("success");
            form.reset();
            _context2.next = 15;
            break;

          case 14:
            throw new Error("Something went wrong");

          case 15:
            _context2.next = 22;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](3);
            statusText.textContent = "❌ Failed to submit the form. Please try again.";
            statusText.classList.add("error");
            form.reset();

          case 22:
            // Fade out message after 4 seconds
            setTimeout(function () {
              statusText.textContent = "";
              statusText.className = "form-status";
            }, 4000);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[3, 17]]);
  });
};