let companyInformationForContact = async () => {
    companyAddressLoad();
    companyMailLinkLoad();
    companyPhoneLinkLoad();
    contactFormInit();
}

let contactFormInit = () =>{

    // contact form submission
    const form = document.querySelector("#contactForm");
    const statusText = document.getElementById("form-status");

    form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusText.textContent = "Sending message...";
    statusText.className = "form-status";

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
}