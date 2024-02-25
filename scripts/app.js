"use strict";
/*
* Author : Rijan Dahal(100889092) and Aryan Hachhethu (100844145)
*
* */
// Function to display projects on the Portfolio page

(function(){
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Oshawa?unitGroup=us&key=2T49E7CPCAZD2Q3CMRVAXTCVW&contentType=json")
        .then( res => res.json())
        .then(data => {
            console.log(data);
            const pinpoint = data.resolvedAddress;
            const temperatureFahrenheit = data.currentConditions.temp;
            const condition = data.currentConditions.conditions;

            let temperature = temperatureFahrenheit + "°F";

            document.getElementById('location').innerHTML = `<i class="fa-regular fa-compass"></i>${pinpoint}|`; // Changed .html() to .innerHTML
            document.getElementById('temperature').innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i>${temperature}|`; // Changed .html() to .innerHTML
            document.getElementById('condition').innerHTML = `<i class="fa-solid fa-cloud"></i>${condition}`; // Changed .html() to .innerHTML
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
})();

// Function to perform search
function searchContent() {
    const searchInput = $("#search-container").val().toLowerCase();
    const searchResultsContainer = $("#searchResults");
    searchResultsContainer.empty(); // Clear previous search results

    // Loop through content to find matches
    $(".searchable-content").each(function () {
        const content = $(this).text().toLowerCase();
        if (content.includes(searchInput)) {
            // If content matches search input, display it
            console.log("Search bar invoked");
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// Event listener for search button click
$("#searchButton").on("click", searchContent);



function checkSession() {
        let logout = $("#logout");
        if (!sessionStorage.getItem("user")){
            logout.hide();


        }
        else if(sessionStorage.getItem("user")){
            $("#login").hide();
        }
        logout.on("click",function(){
            sessionStorage.clear();
            location.href = "login.html";
        });
}

function authguard(){
    if(!sessionStorage.getItem("user")){
        location.href = "login.html";
    }

}
function AjaxRequest(method, url, callback){

    //step1 : Instantiate an XHR object
    let xhr = new XMLHttpRequest();

    //Step 2: open a connection to the server
    xhr.open(method, url);

    //Step3: Add event listener for readystatechange event
    // the readystate event is being triggered when the
    //state of the document being fetched changes.
    xhr.addEventListener("readystatechange", () =>{

        if(xhr.readyState === 4 && xhr.status  === 200){
            //response succeeded - data is available in here only
            if(typeof callback == "function"){
                callback(xhr.responseText);
            }else{
                console.error("ERROR: callback not a function");
            }

        }
    });

    //step4: send the request
    xhr.send();


}

function RegisterFormValidation() {
    ValidateField("#firstName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First Name");
    ValidateField("#lastName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid Last Name");
    ValidateField("#emailAddress",/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,"Please enter a valid email address");
}

const  AddUser = (fullName,EmailAddress,identity,password)=>{
    const fs = require("fs");

    const  jsonData = fs.readFileSync('data/users.json','utf8');
    const jsonObject = JSON.parse(jsonData);

    let user = new core.User(fullName,EmailAddress,identity,password);

    jsonObject.users.push(user.toJSON());

    const updatedJsonData = JSON.stringify(jsonObject, null, 2);


    fs.writeFileSync('data/users.json', updatedJsonData);

};
function registerUser(){
    RegisterFormValidation();

    let firstName = $("#firstName").val;
    let lastName = $("#lastName").val;
    let emailAddress = $("#emailAddress").val;
    let password = $("#password").val;
    let confirmPassword = $("#confirmPassword").val;
    let id = "jdoe";

    $("#registerButton").on("click",function () {
        if (password === confirmPassword){
        let fullName = firstName+ " "+lastName;
        AddUser(fullName,emailAddress,id,password);
        location.href = "login.html";
        }
        else{
            $("#messageArea").addClass("alert alert-danger")
                .text("Error: Passwords must match")
                .show();
        }
    })


}



const AddContact = (fullName, contactNumber, emailAddress) => {
    let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
    if (contact.serialize()) {
        let key = contact.fullName[0] + Date.now();
        localStorage.setItem(key, contact.serialize());
    }
};
function blogToNews(){
    let blog =  document.getElementById("blogIcon");
    blog.innerHTML = `<i class="fa-brands fa-blogger"></i>News</a>`;
}


function ContactFormValidation() {
    ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First Name and ");
    ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid contact number");
    ValidateField("#emailAddress",/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please enter a valid Email Address");
}

/**
 * This function validates input form text field.
 * @param input_field_id
 * @param regular_expression
 * @param error_message
 *
 */

function ValidateField(input_field_id, regular_expression, error_message) {
    let messageArea = $("#messageArea").hide();

    $(input_field_id).on("blur", function () {
        //fail validation
        let inputFieldText = $(this).val();
        if (!regular_expression.test(inputFieldText)) {
            $(this).trigger("focus").trigger("select");
            messageArea.addClass("alert alert-danger");
            messageArea.text(error_message);
            messageArea.show();
        }
        //pass validation
        else {
            messageArea.removeAttr("class").hide();

        }

    });

}

function LoadHeader(html_data){
    $("header").html(html_data);
    $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
    checkSession();

}
function displayCareers(){
        let navbarElement = document.getElementById("navbarContent");
        let careerLink = document.createElement("li");
        careerLink.className = "nav-item";
        careerLink.innerHTML = ` <a class="nav-link " aria-current="page" href="#"><i class="fa-solid fa-briefcase"></i> Careers</a>`;
        navbarElement.appendChild(careerLink);
}
function displayPortfolioPage() {
    // Array of projects with details
    const projects = [
        // Project 1
        {
            title: "Sky Watch",
            description: "SkyWatch is an innovative stargazing application that allows users to explore the wonders of the night sky...",
            image: "./images/skywatch.jpg"
        },
        // Project 2
        {
            title: "Eco Hub",
            description: "EcoHub is a web platform dedicated to promoting and encouraging sustainable living practices...",
            image: "./images/ecohub.jpg"
        }
    ];

    // DOM elements for project display
    let projectContainer = document.getElementById("projectsContainers");
    let loadMoreButton = document.getElementById("loadMoreButton");

    // Variables for project pagination
    let projectPerPage = 1;
    let currentIndex = 0;

    // Event listener for the "Load More" button
    loadMoreButton.addEventListener("click", loadMoreProjects);

    // Function to display project cards
    function displayProjectCards(project) {
        let card = document.createElement("div");
        card.className = "col-md-6";
        card.innerHTML = `<div class="project-card bg-dark-subtle">
                          <h3 class=" project-card-heading">${project.title}</h3>
                          <p class="project-card-description">${project.description}</p>
                          <div class="d-none d-lg-block">
                          <img src="${project.image}" alt="project-image" class="border-dark-subtle">
                          </div>
                          </div>`;
        projectContainer.appendChild(card);
    }

    // Function to load more projects
    function loadMoreProjects() {
        for (let i = 0; i < projectPerPage; i++) {
            if (currentIndex < projects.length) {
                displayProjectCards(projects[currentIndex]);
                currentIndex++;
            } else {
                loadMoreButton.style.display = "none";
            }
        }
    }

    // Initial load
    loadMoreProjects();
}

function displayServicesPage() {
    // Array of services with details
    const services = [
        // Service 1
        {
            title: "Educational Classes",
            description: "Embark on a journey of continuous learning with our diverse educational classes...",
            image: "./images/classroom.png"
        },
        // Service 2
        {
            title: "Community Events",
            description: "At Harmony Hub, we believe in the power of connections. Join us at our thoughtfully curated community events...",
            image: "./images/community.png"
        },
        // Service 3
        {
            title: "Hands-On Workshops",
            description: "Unleash your creativity and enhance your skills through our hands-on workshops...",
            image: "./images/workshop.png"
        },
        // Service 4
        {
            title: "Community Projects",
            description: "Be an integral part of positive change by engaging in our collaborative community projects...",
            image: "./images/community-service.jpg"
        }
    ];

    // DOM element for services display
    let servicesContent = document.getElementById("servicesContent");
    let currentIndex = 0;
    let count = 1;

    // Function to display individual service and handle button click
    function displayService(service) {
        let card = document.createElement("div");
        card.className = "service-button";
        card.innerHTML = `<button id="button${currentIndex}" class="btn accordion service-button-heading"> 
                            ${service.title}
                            </button>`;
        servicesContent.appendChild(card);
        let button = document.getElementById(`button${currentIndex}`);

        // Event listener for button click
        button.addEventListener("click", ServiceButtonClicked);

        // Function to handle button click
        function ServiceButtonClicked() {
            let descriptionServiceButton = button.nextElementSibling;

            if (!descriptionServiceButton) {
                descriptionServiceButton = document.createElement("div");
                descriptionServiceButton.className = "";
                descriptionServiceButton.innerHTML = `<p>${service.description}</p>
                                                    <img src="${service.image}" class="card-image" alt="s">`;
                button.insertAdjacentElement("afterend", descriptionServiceButton);
            } else {
                count++;
                descriptionServiceButton.style.display = (count % 2 === 1) ? "block" : "none";
            }
        }
    }

    // Function to display all services
    function displayServices() {
        for (currentIndex; currentIndex < services.length; currentIndex++) {
            displayService(services[currentIndex]);
        }
    }

    // Initial display of services
    displayServices();
}

function displayBlogPage() {
    // Array of blog articles with details
    const articles = [
        // Article 1
        {
            title: "Empowering Minds: Success Stories from Harmony Hub's Educational Classes",
            summary: "Dive into the inspiring success stories of individuals whose lives have been positively impacted by our educational classes...",
            link: ""
        },
        // Article 2
        {
            title: "Celebrating Diversity: Cultural Festivals at Harmony Hub",
            summary: "Immerse yourself in the rich tapestry of cultures celebrated at Harmony Hub. This blog post highlights the vibrant cultural festivals hosted at our community center...",
            link: ""
        },
        // Article 3
        {
            title: "Innovation Unleashed: Tech Enthusiasts’ Playground at Harmony Hub",
            summary: "Explore the dynamic world of technology at Harmony Hub. From coding workshops to tech meetups, this post offers an inside look at how our community serves as a playground for tech enthusiasts...",
            link: ""
        },
        // Article 4
        {
            title: "Greening Our Community: Harmony Hub's Sustainability Initiatives",
            summary: "Delve into our commitment to sustainability. This post explores Harmony Hub's eco-friendly initiatives, from community gardens to recycling programs...",
            link: ""
        },
        // Article 5
        {
            title: "Behind the Scenes: The Harmony Hub Team and Their Passion for Community",
            summary: "Meet the faces behind Harmony Hub. This page introduces the dedicated team members who work tirelessly to create a welcoming space for our community...",
            link: "./team.html"
        }
    ];

    // DOM element for article display
    let articleContainer = document.getElementById("articleContainer");
    let currentIndex = 0;

    // Function to display individual blog article
    function displayArticle(article) {
        let articleContent = document.createElement("div");
        articleContent.className = "";
        articleContent.innerHTML = `
            <h5 class="service-button-heading">${article.title}</h5>
            <p>${article.summary} <a href="${article.link}">Read More</a></p>`;
        articleContainer.appendChild(articleContent);
    }

    // Function to display all blog articles
    function displayAllArticles() {
        for (currentIndex; currentIndex < articles.length; currentIndex++) {
            displayArticle(articles[currentIndex]);
        }
    }

    // Initial display of blog articles
    displayAllArticles();
}

// Function to display team members on the Team page
function displayTeamPage() {
    // DOM element for team members display
    let teamMembersCard = document.getElementById("teamCard");

    // Array of team members with details
    const teamMembers = [
        // Team Member 1
        {
            name: "Rijan Dahal, Team Member",
            roleDescription: "\"I am responsible for overseeing the implementation of HTML and JavaScript logic in website development projects...",
            photo: "./images/rijanDahal.jpg"
        },
        // Team Member 2
        {
            name: "Aryan Hachhethu, Team Member",
            roleDescription: "\"In this role, I'm tasked with bringing our website designs to life, focusing on both aesthetics and functionality...",
            photo: "./images/aryan.jpeg"
        }
    ];

    // Function to display individual team member
    function displayTeamMember(teamMember) {
        let teamCard = document.createElement("div");
        teamCard.className = "card w-05 h-50";
        teamCard.innerHTML = `
                <div class="align-content-md-center d-flex justify-content-center">
                    <div class="card-body ">
                        <img src="${teamMember.photo}" alt="${teamMember.name} Photo" class="card-image">
                        <h3 class="card-title team-heading">${teamMember.name}</h3>
                        <p class="project-card-description">${teamMember.roleDescription}</p>
                    </div>
                </div>`;
        teamMembersCard.appendChild(teamCard);
    }

    // Function to display all team members
    function displayTeamMembers() {
        teamMembers.forEach((teamMember, currentIndex) => {
            displayTeamMember(teamMember);
        });
    }

    // Initial display of team members
    displayTeamMembers();
}

// Function to display content on the Home Page
function displayHomePage() {
    // Slideshow functionality
    const images = document.querySelectorAll('.slideshow-container img');
    let currentImageIndex = 0;

    // Function to switch to the next slide
    function nextSlide() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    // Set interval for automatic slideshow
    setInterval(nextSlide, 7000);

    // Redirect to services page on "Explore" button click
    let exploreBtn = document.getElementById("exploreButton");
    exploreBtn.addEventListener("click", function () {
        window.location.href = "../services.html";
    });
}





function DisplayLoginPage() {
    console.log("Called displayloginpage");

    let messageArea = $("#messageArea");
    messageArea.hide();
    $("#loginButton").on("click", function () {

        let success = false;
        let newUser = new core.User();

        const emailAddress = $("#emailAddress").val(); // Use .val() to get the value
        const password = $("#password").val(); // Use .val() to get the value

        $.get("data/users.json", function (data) {

            for (const user of data.users) {

                console.log(user);
                if (emailAddress === user.EmailAddress && password === user.Password) {
                    success = true;
                    newUser.fromJSON(user);
                    break;
                }

            }

            if (success) {

                sessionStorage.setItem("user", newUser.serialize());

                location.href = "index.html";
                $("#HomeMessageArea").addClass("alert alert-danger")
                    .text("Error: Invalid Login Credentials")
                    .show();


            } else {
                $('#userName').trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger")
                    .text("Error: Invalid Login Credentials")
                    .show();
            }

        });

    });
    $("#cancelButton").on("click", function () {
        $("#loginForm").trigger('reset');
        location.href = "index.html";

    });




}

function DisplayRegisterPage(){
    console.log("Register page loaded");
    registerUser();
}

function displayContactPage(){
    console.log("Called DisplayContactUsPage()");

    ContactFormValidation()



    let sendButton = $("#sendButton");
    let subscribeCheckbox = $("#newsCheckBox");

    let fullName = $("#fullName");
    let contactNumber = $("#contactNumber");
    let emailAddress = $("#emailAddress");
    let description = $("#description")


    sendButton.click(function () {
        if (subscribeCheckbox.checked) {
            AddContact(fullName.value, contactNumber.value, emailAddress.value,description.value);
            $("#contactForm").reset();

        }
    });
}

function displayEvents(){
    AjaxRequest("GET","data/events.json",function (response){

        console.log(response);
        const responseData = JSON.parse(response);
        const eventsData = responseData.events;
        const eventsContainer = document.getElementById("eventContainer");


        eventsData.forEach(function(event) {
            // Create a div to hold each event
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("align-content-md-center", "d-flex", "justify-content-center", "card", "w-05", "h-50", "mb-3");
            eventDiv.innerHTML = `
        <div class="event-card">
            <h3 class="event-title" >${event.title} <h3 class="event-date">${event.date} </h3> </h3>
            <p class="event-description">${event.description}</p>
        </div>`;

            eventsContainer.appendChild(eventDiv);
        });

    })
}


// Function to display images from JSON data on the gallery page

// Function to display images from JSON data on the gallery page
function DisplayGalleryPage() {
    // Call fetchImageJSON function to fetch image data from images.json
    fetchImageJSON('images.json')
        .then(data => {
            // Iterate over each image data
            data.forEach(image => {
                // Create an img element
                const imgElement = document.createElement('img');
                // Set the src and alt attributes based on image data
                imgElement.src = image.url;
                imgElement.alt = image.alt;
                // Append the img element to the gallery container
                const galleryContainer = document.querySelector('.gallery');
                galleryContainer.appendChild(imgElement);

                // Add hover effect to each image
                imgElement.addEventListener('mouseenter', () => {
                    // Apply blur effect to all images except the hovered one
                    galleryContainer.querySelectorAll('img').forEach(img => {
                        if (img !== imgElement) {
                            img.style.filter = 'blur(8px)';
                            img.style.transition = 'filter 0.5s ease';
                        }
                    });
                });

                // Remove blur effect on mouse leave
                imgElement.addEventListener('mouseleave', () => {
                    // Remove blur effect from all images
                    galleryContainer.querySelectorAll('img').forEach(img => {
                        img.style.filter = 'none';
                    });
                });
            });
        })
        .catch(error => console.error('Error fetching images:', error)); // Catch any errors occurred during fetching
}

// Function to fetch JSON data from the specified URL
function fetchImageJSON(url) {
    // Use fetch API to make a network request to the specified URL
    return fetch(url)
        .then(response => {
            // Check if the response is OK
            if (!response.ok) {
                // If response is not OK, throw an error
                throw new Error('Network response was not ok');
            }
            // If response is OK, parse the JSON data and return it
            return response.json();
        });
}

function DisplayPrivacyPolicyPage() {

}

function DisplayTermsOfServicePage() {

}

document.addEventListener("DOMContentLoaded", function () {


    try{
    let searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click",searchContent);}
    catch (e){
        console.error(e);
    }

    console.log("App Started");

    AjaxRequest("GET", "header.html", LoadHeader);




    switch (document.title) {
        case "Portfolio":
            displayPortfolioPage();
            authguard();
            break;
        case "Home Page":
            displayHomePage();
            break;
        case "Team":
            displayTeamPage();
            authguard();
            break;
        case "Services":
            displayServicesPage();
            authguard();
            break;
        case "Blogs":
            displayBlogPage();
            authguard();
            break;
        case "Contact":
            AjaxRequest("POST","contact.html",displayContactPage);
            authguard();
            break;
        case "Login":
            DisplayLoginPage();
            break;
        case "Register":
            DisplayRegisterPage();
            break;
        case "Events":
            authguard();
            displayEvents();
            break;
        default:
            window.location.href = "404.html";
            break;
        case "Gallery":
            DisplayGalleryPage();
            authguard();
            break;

        case "Privacy Policy":
            DisplayPrivacyPolicyPage();
            break;
        case "Terms of Service":
            DisplayTermsOfServicePage();
            break;


    }
});



// Function to create a navigation link
function createNavLink(text, href) {
    const link = document.createElement("a");
    link.textContent = text;
    link.href = href;
    return link;
}

// Function to create the footer navigation bar
function createFooterNav() {
    const footer = document.getElementById("footer");

    const navContainer = document.createElement("div");
    navContainer.classList.add("footer-nav");

    // Add links to the footer navigation
    const privacyPolicyLink = createNavLink("Privacy Policy", "privacy_policy.html");
    const termsOfServiceLink = createNavLink("Terms of Service", "terms-of-service.html");
    const contactLink = createNavLink("Contact", "contact.html");

    // Append links to the container
    navContainer.appendChild(privacyPolicyLink);
    navContainer.appendChild(termsOfServiceLink);
    navContainer.appendChild(contactLink);

    // Append the container to the footer
    footer.appendChild(navContainer);
}

// Call the function to create the footer navigation bar
createFooterNav();
displayCareers();
blogToNews();
