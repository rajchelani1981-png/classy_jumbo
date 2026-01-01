const footerContainerId = "footer";
const companyInformationDataLinkForFooter = "/json/company_information.json";
const menuDataLinkForFooter = "/json/menu.json";

let companyFooterData = null;
let menuFooterData = null;

async function fetchCompanyFooterData() {
  if (companyFooterData) return companyFooterData;

  const res = await fetch(companyInformationDataLinkForFooter);
  companyFooterData = await res.json();
  return companyFooterData;
}

let fetchMenuData = async () =>{
  let response = await fetch(menuDataLinkForFooter);
  let data = await response.json();

  if (data)
    menuFooterData = data;
}

async function menuDataLoadForFooter(){
  if(!menuFooterData)
    await fetchMenuData();

  return `
    ${menuFooterData.map( m => `<li><a href="${m.route}">${m.title}</a></li>`).join("")}
  `;
}

function renderFooter(data, menu) {
  const contact = data.contact?.[0] || {};

  return `
    <div class="site-footer">
      <div class="footer-top">
        <div class="container footer-grid">

          <!-- Brand -->
          <div class="footer-col">
            <img src="${data.logo}" alt="${data.company_name}" class="footer-logo">
            <p class="footer-desc">
              Crunch into happiness with <strong>${data.company_name}</strong>.
              Premium snacks crafted with quality and taste.
            </p>
          </div>

          <!-- Address -->
          <div class="footer-col">
            <h4>Address</h4><br>
            <strong>${data.parent_company_name}</strong>
            <p>${data.address}</p>
          </div>

          <!-- Contact -->
          <div class="footer-col">
            <h4>Customer Support</h4>
            <p>📞 <a href="tel:${contact.phone}">${contact.phone}</a></p>
            <p>✉️ <a href="mailto:${contact.email}">${contact.email}</a></p>
          </div>

          <!-- Links -->
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              ${menu}
            </ul>
          </div>

        </div>
      </div>

      <div class="footer-bottom">
        <div class="container footer-bottom-wrap">
          <span>© ${new Date().getFullYear()} ${data.company_name}. All Rights Reserved.</span>
        </div>
      </div>
    </div>
  `;
}

async function loadFooter() {
  const data = await fetchCompanyFooterData();
  const menu = await menuDataLoadForFooter();

  document.getElementById(footerContainerId).innerHTML = renderFooter(data, menu);
}

document.addEventListener("DOMContentLoaded", loadFooter);