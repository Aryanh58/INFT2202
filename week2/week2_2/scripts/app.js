"use strict";


(function (){

    function DisplayHomePage(){

        console.log("Called DisplayHomePage()");
        let AboutUsButton = document.getElementById("AboutUsBtn")
        AboutUsButton.addEventListener("click", function (){
            location.href="about.html";
        })

        let mainContent = document.getElementsByTagName("main")[0];

        let MainParagraph = document.createElement("p");

        MainParagraph.setAttribute("id", "MainParagraph");
        MainParagraph.setAttribute("class", "mt-3");

        MainParagraph.textContent = "This is my first paragraph";
        MainContent.appendChild(MainParagraph);

        let MainString = "This is";
        let SecondString = `${FirstString}the main paragraph`;
        MainParagraph.textContent = SecondString;
        MainContent.appendChild(MainParagraph);

        let DocumentBody =  document.body;
        let article = document.createElement("article");
        let articleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        Article.setAttribute("class", "container");
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);



    }
    function DisplayProductPage(){

        console.log("Called DisplayProductPage()");
    }
    function DisplayAboutUsPage(){

        console.log("Called DisplayAboutUsPage()");
    }
    function DisplayContactPage(){

        console.log("Called DisplayContactPage()");
    }
    function DisplayServicePage(){

        console.log("Called DisplayServicePage()");
    }
    function Start(){
        console.log("App Started");

        switch (document.title){
            case "Home":
                DisplayHomePage
                break;
            case "Our Products":
                DisplayProductPage
                break;
            case "About Us":
                DisplayAboutUsPage
                break;
            case "Our Services":
                DisplayServicePage
                break;
            case "Contact Us":
                break;
        }
    }
    window.addEventListener("load", Start);
})()