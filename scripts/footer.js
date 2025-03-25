function generateFooter() {
    // footer
    const footer = document.querySelector("footer");

    // info_footer
    const divInfoFooter = document.createElement("div");
    divInfoFooter.className = "info_footer";

    const infoFooterList = document.createElement("ul");
    const info = document.createElement("h2");
    info.innerText = "Tu Comeal-da";
    const home = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.href = "index.html#home";
    homeLink.innerText = "Home";
    home.appendChild(homeLink);

    const recipes = document.createElement("li");
    const recipesLink = document.createElement("a");
    recipesLink.href = "index.html#home";
    recipesLink.innerText = "Recipes";
    recipes.appendChild(recipesLink);

    const aboutUs = document.createElement("li");
    const aboutUsLink = document.createElement("a");
    aboutUsLink.href = "index.html#home";
    aboutUsLink.innerText = "About Us";
    aboutUs.appendChild(aboutUsLink);

    divInfoFooter.append(infoFooterList);
    infoFooterList.append(info, home, recipes, aboutUs);
    footer.appendChild(divInfoFooter);

    // contact_footer
    const divContactFooter = document.createElement("div");
    divContactFooter.className = "contact_footer";

    const contactFooterList = document.createElement("ul");
    const contact = document.createElement("h2");
    contact.innerText = "Contact";
    const facebook = document.createElement("li");
    const facebookLink = document.createElement("a");
    facebookLink.href = "https://facebook.com";
    facebookLink.target = "_blank";
    facebookLink.innerText = "Facebook";
    facebook.appendChild(facebookLink);

    const instagram = document.createElement("li");
    const instagramLink = document.createElement("a");
    instagramLink.href = "https://instagram.com";
    instagramLink.target = "_blank";
    instagramLink.innerText = "Instagram";
    instagram.appendChild(instagramLink);

    const linkedin = document.createElement("li");
    const linkedinLink = document.createElement("a");
    linkedinLink.href = "https://linkedin.com";
    linkedinLink.target = "_blank";
    linkedinLink.innerText = "LinkedIn";
    linkedin.appendChild(linkedinLink);

    divContactFooter.append(contactFooterList);
    contactFooterList.append(contact, facebook, instagram, linkedin);
    footer.appendChild(divContactFooter);

    // form_footer --------------------------------------------------
    const divFormFooter = document.createElement("div");
    divFormFooter.className = "form_footer";
    divContactFooter.id= "contact"

    // // creación de form
    const formElement = document.createElement("form");

    // // Crear el div con la clase form-inputs
    const formDivInputs = document.createElement("div");
    formDivInputs.className = "form-inputs";

    // // Crear los inputs
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Your name";

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.placeholder = "Your email";

    const textArea = document.createElement("textarea")
    textArea.rows = 5
    textArea.placeholder="Your message"
    textArea.className="textArea"

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerText = "Contact us";

    formDivInputs.append(nameInput, emailInput,textArea, submitButton);

    formElement.appendChild(formDivInputs);

    divFormFooter.appendChild(formElement);

    footer.appendChild(divFormFooter);
}

generateFooter();