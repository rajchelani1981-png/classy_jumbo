let exportEnquiryInit = () =>{
    const statusText = document.getElementById("form-status");

    document.querySelector("#exportForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        statusText.textContent = "Sending message...";
        statusText.className = "form-status";
        const form = document.querySelector("#exportForm");

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            });

            if (response.ok) {
            statusText.textContent = "✅ Form submit successfully!";
            statusText.classList.add("success");
            form.reset();
            } else {
            throw new Error("Something went wrong");
            }
        } catch (error) {
            statusText.textContent = "❌ Failed to submit the form. Please try again.";
            statusText.classList.add("error");
            form.reset();
        }

        // Fade out message after 4 seconds
        setTimeout(() => {
            statusText.textContent = "";
            statusText.className = "form-status";
        }, 4000);
    });
document.getElementById("whatsappBtn").addEventListener("click", () => {
    const form = document.getElementById("exportForm");

    const required = [
        "company_name",
        "contact_person",
        "email",
        "phone",
        "country",
        "business_type",
        "products",
        "message"
    ];

    for (let field of required) {
        if (!form[field].value.trim()) {
            Swal.fire({
                title: "Please fill all mandatory fields before sending via WhatsApp.",
                icon: "error",
                draggable: true
            });
            return;
        }
    }

    const waMessage = `EXPORT ENQUIRY

Company: ${form.company_name.value}
Contact: ${form.contact_person.value}
Email: ${form.email.value}
Phone: ${form.phone.value}

Country: ${form.country.value}
City/Port: ${form.city.value}
Business Type: ${form.business_type.value}

Products: ${form.products.value}

Quantity: ${form.quantity.value}

Message: ${form.message.value}`;

    window.open(
        `https://wa.me/919772923303?text=${encodeURIComponent(waMessage)}`,
        "_blank"
    );
    form.reset();
    });
}