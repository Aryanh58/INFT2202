"use strict";

// Immediately Invoked Function Expression (IIFE)
(function(){
    // User class definition
    class User {
        // Constructor method with default parameter values
        constructor(displayName = "", emailAddress = "", userId = "", password = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._userId = userId;
            this._password = password;
        }

        // Setter and getter methods for the displayName property
        set displayName(value){
            this._displayName = value;
        }
        get displayName(){
            return this._displayName;
        }

        // Setter and getter methods for the emailAddress property
        set emailAddress(value){
            this._emailAddress = value;
        }
        get emailAddress(){
            return this._emailAddress;
        }

        // Setter and getter methods for the userId property
        set userId(value){
            this._userId = value;
        }
        get userId(){
            return this._userId;
        }

        // Setter and getter methods for the password property
        set password(value){
            this._password = value;
        }
        get password(){
            return this._password;
        }

        // Method to return a string representation of the User object
        toString(){
            return `DisplayName  = ${this._displayName}\n
                    EmailAddress = ${this._emailAddress}\n
                    UserId = ${this._userId}`;
        }

        // Method to serialize User object data into a string
        serialize(){
            if (this._displayName !== "" && this._emailAddress !== "" && this._userId !== "" && this._password !== ""){
                return `${this._displayName},${this._emailAddress},${this._userId},${this._password}`;
            }
            console.error("One or more user information is empty");
            return null;
        }

        // Method to deserialize data string and populate User object properties
        deserialize(data){
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._userId = propertyArray[2];
            this._password = propertyArray[3];
        }

        // Method to convert User object to JSON format
        toJSON(){
            return {
                DisplayName: this._displayName,
                EmailAddress: this._emailAddress,
                UserId: this._userId,
                Password: this._password
            };
        }

        // Method to populate User object properties from JSON data
        fromJSON(data){
            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._userId = data.UserId;
            this._password = data.Password;
        }
    }
    // Assigning User class to the core namespace if exists, otherwise creating it
    core.User = User;
})(core || (core = {}));
