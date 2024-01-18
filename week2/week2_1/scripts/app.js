"use strict";


(function (){

    function DisplayHomePage(){

        console.log("Called DisplayHomePage()");
        let AboutUsButton = document.getElementById("AboutUsBtn")
        AboutUsButton.addEventListener("click", function (){
            location.href="about.html";

        })






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
                DisplayServicePagePage
                break;
            case "Contact Us":
                break;
        }
    }
    window.addEventListener("load", Start);
})()