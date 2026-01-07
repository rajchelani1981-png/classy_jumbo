"use strict";

var exportEnquiryInit = function exportEnquiryInit() {
  var statusText = document.getElementById("form-status");
  document.querySelector("#exportForm").addEventListener("submit", function _callee(e) {
    var form, formData, response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            statusText.textContent = "Sending message...";
            statusText.className = "form-status";
            form = document.querySelector("#exportForm");
            _context.prev = 4;
            formData = new FormData(form);
            _context.next = 8;
            return regeneratorRuntime.awrap(fetch(form.action, {
              method: "POST",
              body: formData
            }));

          case 8:
            response = _context.sent;

            if (!response.ok) {
              _context.next = 15;
              break;
            }

            statusText.textContent = "✅ Form submit successfully!";
            statusText.classList.add("success");
            form.reset();
            _context.next = 16;
            break;

          case 15:
            throw new Error("Something went wrong");

          case 16:
            _context.next = 23;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](4);
            statusText.textContent = "❌ Failed to submit the form. Please try again.";
            statusText.classList.add("error");
            form.reset();

          case 23:
            // Fade out message after 4 seconds
            setTimeout(function () {
              statusText.textContent = "";
              statusText.className = "form-status";
            }, 4000);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[4, 18]]);
  });
  document.getElementById("whatsappBtn").addEventListener("click", function () {
    var form = document.getElementById("exportForm");
    var required = ["company_name", "contact_person", "email", "phone", "country", "business_type", "products", "message"];

    for (var _i = 0, _required = required; _i < _required.length; _i++) {
      var field = _required[_i];

      if (!form[field].value.trim()) {
        Swal.fire({
          title: "Please fill all mandatory fields before sending via WhatsApp.",
          icon: "error",
          draggable: true
        });
        return;
      }
    }

    var waMessage = "EXPORT ENQUIRY\n\nCompany: ".concat(form.company_name.value, "\nContact: ").concat(form.contact_person.value, "\nEmail: ").concat(form.email.value, "\nPhone: ").concat(form.phone.value, "\n\nCountry: ").concat(form.country.value, "\nCity/Port: ").concat(form.city.value, "\nBusiness Type: ").concat(form.business_type.value, "\n\nProducts: ").concat(form.products.value, "\n\nQuantity: ").concat(form.quantity.value, "\n\nMessage: ").concat(form.message.value);
    window.open("https://wa.me/919772923303?text=".concat(encodeURIComponent(waMessage)), "_blank");
    form.reset();
  });
};