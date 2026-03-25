function generatePassword() {
            const length = document.getElementById("length").value;

            let chars = "";
            let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let lower = "abcdefghijklmnopqrstuvwxyz";
            let numbers = "0123456789";
            let symbols = "!@#$%^&*()_+";

            if (document.getElementById("exclude").checked) {
                upper = upper.replace(/[O]/g, "");
                lower = lower.replace(/[l]/g, "");
                numbers = numbers.replace(/[01]/g, "");
            }

            if (document.getElementById("uppercase").checked) chars += upper;
            if (document.getElementById("lowercase").checked) chars += lower;
            if (document.getElementById("numbers").checked) chars += numbers;
            if (document.getElementById("symbols").checked) chars += symbols;

            if (chars === "") {
                alert("Select at least one option!");
                return;
            }

            let password = "";
            for (let i = 0; i < length; i++) {
                password += chars[Math.floor(Math.random() * chars.length)];
            }

            document.getElementById("password").value = password;

            checkStrength(password);
        }

        function togglePassword() {
            const field = document.getElementById("password");
            field.type = field.type === "password" ? "text" : "password";
        }

        function copyPassword() {
            const password = document.getElementById("password").value;

            if (!password) {
                alert("Generate password first!");
                return;
            }

            navigator.clipboard.writeText(password);
            alert("Copied!");
        }

        function checkStrength(password) {
            let strength = "Weak";
            let bar = document.getElementById("strengthBar");

            if (password.length >= 8) {
                strength = "Medium";
                bar.style.width = "60%";
                bar.className = "progress-bar bg-warning";
            }

            if (
                password.length >= 12 &&
                /[A-Z]/.test(password) &&
                /[0-9]/.test(password) &&
                /[^A-Za-z0-9]/.test(password)
            ) {
                strength = "Strong";
                bar.style.width = "100%";
                bar.className = "progress-bar bg-success";
            }

            if (password.length < 8) {
                bar.style.width = "30%";
                bar.className = "progress-bar bg-danger";
            }

            document.getElementById("strengthText").innerText = strength;
        }