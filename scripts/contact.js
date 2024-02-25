"use strict";

// Anonymous function wrapped in an IIFE, accepting a parameter named "core"
(function (core){
    // Contact class definition
    class Contact{

        // Constructor method with default parameter values
        constructor(fullName = "", contactNumber = "", emailAddress = "", feedback = "") {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
            this._feedback = feedback;
        }

        // Setter and getter methods for the feedback property
        set feedback(value){
            this._feedback = value;
        }
        get feedback(){
            return this._feedback;
        }

        // Setter and getter methods for the fullName property
        set fullName(value){
            this._fullName = value;
        }
        get fullName(){
            return this._fullName;
        }

        // Setter and getter methods for the contactNumber property
        set contactNumber(value){
            this._contactNumber = value;
        }
        get contactNumber(){
            return this._contactNumber;
        }

        // Getter method for the emailAddress property
        get emailAddress(){
            return this._emailAddress;
        }

        // Setter method for the emailAddress property
        set emailAddress(value){
            this._emailAddress = value;
        }

        // Method to return a string representation of the Contact object
        toString (){
            return `FullName: ${this._fullName}\n
                    ContactNumber:${this._contactNumber}\n
                    EmailAddress: ${this._emailAddress}`;
        }

        // Method to serialize Contact object data into a string
        serialize(){
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "" && this._feedback !== ""){
                return `${this._fullName},${this._contactNumber},${this._emailAddress},${this._feedback}`;
            }
            console.error("One or more of the contact information is empty or invalid");
            return null;
        }

        // Method to deserialize data string and populate Contact object properties
        deserialize(data){
            if (data) {
                let propertyArray = data.split(",");
                this._fullName = propertyArray[0];
                this._contactNumber = propertyArray[1];
                this._emailAddress = propertyArray[2];
                this._feedback = propertyArray[3];
            } else {
                console.error("The data is null or invalid");
            }
        }
    }
    // Assigning Contact class to the core namespace if exists, otherwise creating it
    core.Contact = Contact;
})(core || (core = {}));
