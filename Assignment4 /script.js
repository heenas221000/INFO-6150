//  Copyright - Heena Shah 
// Date - 10/06/2023
// INFO 6150 Web Development Methods and Tools - Assignment 4 



var form = document.getElementById("myForm");
	 form.addEventListener("submit", submitted);

            var validFirstName = false;
			var validLastName = false;
            var validEmail = false;
            var validContact = false;
			var validZipcode = false;
            var validDrinkDesc= false;
            var validdrinkComm = false;

            // regex checks variables
            var regName = /^[a-zA-Z]+$/;
            var regEmail =/([\w\.]+)@(northeastern+)\.(edu)/;
            var regPhone = /\d{3}-?\d{3}-\d{4}(?:-[0-9]{6})?$/;
			var regZipcode= /^[0-9]{5}(?:-[0-9]{4})?$/;
            var regDrinkDesc=/^[a-zA-Z]+$/;

            var minLength = 3; // Minimum length for fields
            var maxLength = 50; // Maximum length for fields    

            var firstName = document.getElementById("firstName");
            firstName.addEventListener("input", validate);

			var lastName = document.getElementById("lastName");
            lastName.addEventListener("input", validate);

            var emailId = document.getElementById("emailId");
            emailId.addEventListener("input", validate);

            var phoneNumber = document.getElementById("phoneNumber");
            phoneNumber.addEventListener("input", validate);

			var zipCode = document.getElementById("zipcode");
            zipCode.addEventListener("input", validate);

			var optionSelect = document.getElementById("optionSelect");
      		optionSelect.addEventListener("change", addCheckbox);

      		var checkboxSelect = document.getElementById("checkboxSelectDynamic");
      		checkboxSelect.addEventListener("change", addTextField);

			function validate(e) {
                console.log("validate");
                var value = e.target.value;
                console.log(value);
                var type = this.id;
                var em = "error_" + type;

                switch (type) {
                    case "firstName":
                        if (!value.trim().match(regName)) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validFirstName = false;
                        }
                        else if (value.length < minLength) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validFirstName = false;
                        } else if (value.length > maxLength) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validFirstName = false;
                        }
                        else {
                            document.getElementById(em).style.display = "none";
                            this.style.border = "";
                            validFirstName = true;
                        }
                        break;

					case "lastName":
                        if (!value.trim().match(regName)) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validLastName = false;
                        }
                        else if (value.length < minLength) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validLastName = false;
                        } else if (value.length > maxLength) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validLastName = false;
                        }
                        else {
                            document.getElementById(em).style.display = "none";
                            this.style.border = "";
                            validLastName = true;
                        }
                        break;

                    case "emailId":
                        if (!value.trim().match(regEmail)) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validEmail = false;
                        }
                        else if (value.length < minLength) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validEmail = false;
                        } else if (value.length > maxLength) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validEmail = false;
                        }
                        else {
                            document.getElementById(em).style.display = "none";
                            this.style.border = "";
                            validEmail = true;
                        }
                        break;

                    case "phoneNumber":
                        if (!value.trim().match(regPhone)) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validContact = false;
                        }
                        else if (value.length < minLength) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validContact = false;
                        } else if (value.length > 13) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validContact = false;
                        }
                        else {
                            document.getElementById(em).style.display = "none";
                            this.style.border = "";
                            validContact = true;
                        }
                        break;

					case "zipcode":
                        if (!value.trim().match(regZipcode)) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validZipcode = false;
                        }
                        else if (value.length < minLength) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validZipcode = false;
                        } else if (value.length > 6) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validZipcode  = false;
                        }
                        else {
                            document.getElementById(em).style.display = "none";
                            this.style.border = "";
                            validZipcode = true;
                        }
                        break;

                    case "drink":
                        if (!value.trim().match(regDrinkDesc)) {
                            document.getElementById(em).style.display = "block";
                            this.style.border = "2px solid red";
                            validDrinkDesc = false;
                        }
                        else {
                            document.getElementById(em).style.display = "none";
                            this.style.border = "";
                            validDrinkDesc = true;
                        }
                        break;
                }
            }

            function submitted(e) {
                
                e.preventDefault();
                console.log("submitted");
                console.log(validFirstName + "|" + validLastName + "|" + validEmail + "|" + validContact + "|" + validZipcode );
                if(validFirstName && validLastName && validEmail && validContact && validZipcode) {
                    alert("Data Saved Successfully");
                    document.getElementById("table").style.display="block";
                
                    var table = document.getElementById("table");
                    var row = table.insertRow(-1);
                    var title = row.insertCell(0);
                    var firstName = row.insertCell(1);
                    var lastName = row.insertCell(2);
                    var emailId =row.insertCell(3);
                    var phoneNumber = row.insertCell(4);
                    var address1 =row.insertCell(5);
                    var address2 = row.insertCell(6);
                    var city = row.insertCell(7);
                    var state = row.insertCell(8);
                    var zipcode = row.insertCell(9);
                    var hear = row.insertCell(10);
                    var comments = row.insertCell(11);
                    var selectDrink = row.insertCell(12);

                    title.innerHTML = document.querySelector('input[name="title"]:checked').value;

                    firstName.innerHTML = document.getElementById("firstName").value;
                    lastName.innerHTML = document.getElementById("lastName").value;
                    emailId.innerHTML = document.getElementById("emailId").value;

                    phoneNumber.innerHTML = document.getElementById("phoneNumber").value;
                    address1.innerHTML = document.getElementById("streetAddress1").value;
                    address2.innerHTML = document.getElementById("streetAddress2").value;
                    

                    city.innerHTML = document.getElementById("city").value;
                    state.innerHTML = document.getElementById("state").value;
                    zipcode.innerHTML = document.getElementById("zipcode").value;
                    
                    var checks=$('input[name="link"]:checked').map(function(){
                        return $(this).val();
                    }).get()

                    console.log(checks);
                    hear.innerHTML = checks;
                    comments.innerHTML = document.getElementById("comments").value;
                    selectDrink.innerHTML = document.getElementById("xyz").value;

                }
                else {
                    alert("Please enter correct details");
                }
                form.reset();
            }
			
			
function addTextField(e) {
        console.log(e);
        var selected = e.target.checked;
        var textarea = document.getElementById("text_area");

        if (selected) {
          textarea.style.display = "block";
        } else {
          textarea.style.display = "none";
        }
      }

function addCheckbox(e) {
        console.log(e.target.value);
        var selected = e.target.value;
        var dynamicCheckbox = document.getElementById("dynamicCheckbox");
        console.log(checkboxSelectDynamic.innerHTML);

        if (selected === "Hot Black Tea") {
          dynamicCheckbox.style.display = "block";
          checkboxSelectDynamic.value = "hi";
          document.getElementById("spanTag").innerHTML = "Hot Black Tea - Large (75¢ extra)";
        } else if (selected === "Cold Coffee") {
          dynamicCheckbox.style.display = "block";
          checkboxSelectDynamic.value = "hi";
          document.getElementById("spanTag").innerHTML = "Cold Coffee - Large (75¢ extra)";
        } else if (selected === "Lemon Ice Tea") {
          dynamicCheckbox.style.display = "block";
          checkboxSelectDynamic.value = "hi";
          document.getElementById("spanTag").innerHTML = "Lemon Ice Tea - Large (75¢ extra)";
        } else if (selected === "Expresso") {
          dynamicCheckbox.style.display = "block";
          checkboxSelectDynamic.value = "hi";
          document.getElementById("spanTag").innerHTML = "Expresso - Large (75¢ extra)";
        } else if (selected === "Latte") {
            dynamicCheckbox.style.display = "block";
            checkboxSelectDynamic.value = "hi";
            document.getElementById("spanTag").innerHTML = "Latte - Large (75¢ extra)";
          }else {
          dynamicCheckbox.style.display = "none";
        }
        console.log(checkboxSelectDynamic.value);
    }