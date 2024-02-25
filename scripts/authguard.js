"use strict";

// Immediately Invoked Function Expression (IIFE)
(function(){
    // Check if user session exists
    if(!sessionStorage.getItem("user")){
        // If user session does not exist, redirect to home page
        location.href = "../home.html";
    }
})();
