let contactButtonInit = async () => {
    if(!companyFooterData)
        await fetchCompanyFooterData();

    if (!menuData)
        await fetchMenu();

    //phone and email according to the country
    let contact = companyFooterData.contact[0];
    //contact page link
    const contactLink = menuData.find( e => e.type && e.type.toLowerCase() == "contact")

    let contactWidget = document.getElementById("contact-widget");
    const message = encodeURI(`Hello! I want to know more about ${companyFooterData.parent_company_name}`);

    contactWidget.innerHTML = `
        <div class="contact-toggle">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Contact">
        </div>

        <div class="contact-panel">
            <a href="https://wa.me/${contact.phone}?text=${message}" target="_blank" class="item">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg">
                <span>WhatsApp</span>
            </a>

            <a href="tel:${contact.phone}" class="item phone">
                📞 <span>${contact.phone}</span>
            </a>

            <a href="mailto:${contact.email}" class="item email">
                ✉️ <span>${contact.email}</span>
            </a>

            <a href="${contactLink.route}" class="item request">
                📝 <span>Request a Call</span>
            </a>
        </div>
    `
}

contactButtonInit();