const numRegex = /^[1-9]\d*/;

        const validateInput = (input, errorDiv) => {
            if (!input) {
                $(errorDiv).show();
                $(errorDiv).html("Input fields cannot be empty");
            } else if (!numRegex.test(input) || /\D/.test(input)) {
                $(errorDiv).show();
                $(errorDiv).html("Enter a valid number");
            } else if (input === 'Infinity') {
                $(errorDiv).show();
                $(errorDiv).html("Value is infinite");
            } else {
                $(errorDiv).hide();
            }
        }

        $("#Digit1").on("input", function() {
            validateInput($(this).val(), "#error_input1");
        });

        $("#Digit2").on("input", function() {
            validateInput($(this).val(), "#error_input2");
        });

        const myFunction = (v) => {
            const input1 = $("#Digit1").val();  
            const input2 = $("#Digit2").val();
            let ans = 0;

            $("#error_number").hide();

            if (!input1 || !input2) {
                $("#error_number").show();
                $("#error_number").html("Input fields cannot be empty");
            } else if (!numRegex.test(input1) || /\D/.test(input1) || input1 === 'Infinity' ||
                       !numRegex.test(input2) || /\D/.test(input2) || input2 === 'Infinity') {
                $("#error_number").show();
                $("#error_number").html("Enter valid inputs");
            } else {
                switch(v) {
                    case "add":
                        ans = parseInt(input1) + parseInt(input2);
                        break;
                    case "subtract":
                        ans = parseInt(input1) - parseInt(input2);
                        break;
                    case "multiply":
                        ans = parseInt(input1) * parseInt(input2);
                        break;
                    case "divide":
                        if (parseInt(input2) === 0) {
                            $("#error_input2").show();
                            $("#error_input2").html("Cannot divide by zero");
                        } else {
                            ans = parseInt(input1) / parseInt(input2);
                        }
                        break;
                }
                $('#ans').val(ans);
            }
        }

        // Attach click handlers to the buttons
        $("#add").click(() => myFunction("add"));
        $("#subtract").click(() => myFunction("subtract"));
        $("#multiply").click(() => myFunction("multiply"));
        $("#divide").click(() => myFunction("divide"));

        const username = sessionStorage.getItem('username');
        // Display the username in the HTML
        document.getElementById('username').textContent = username;

        