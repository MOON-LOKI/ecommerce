/* UI ANIMATIONS */
function flipCard() {
    const card = document.getElementById("authCard");
    card.classList.toggle("flipped");
    document.getElementById("loginMessage").textContent = "";
    document.getElementById("signupMessage").textContent = "";
}

/* PASSWORD SHOW / HIDE */
function togglePassword(id, button) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        button.textContent = "🙈";
    } else {
        input.type = "password";
        button.textContent = "👁";
    }
}

/* HELPER TO SHOW IN-UI MESSAGES */
function displayUIMessage(elementId, message, isSuccess) {
    const msgContainer = document.getElementById(elementId);
    msgContainer.textContent = message;
    msgContainer.className = "api-message " + (isSuccess ? "success" : "error");

    setTimeout(() => {
        msgContainer.textContent = "";
        msgContainer.className = "api-message";
    }, 4000);
}

/* SIGNUP API INTEGRATION */
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.main-btn');
    const oldText = btn.textContent;
    btn.textContent = "Processing...";

    const payload = {
        name: document.getElementById('signupName').value,
        email: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };

    try {
        const res = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (res.ok && data.success) {
            btn.textContent = "✓ SUCCESS";
            displayUIMessage('signupMessage', data.message || "Account created successfully!", true);
            setTimeout(() => {
                flipCard();
                this.reset();
            }, 1800);
        } else {
            const errorMsg = data.message || Object.values(data)[0] || "Signup failed. Check inputs.";
            displayUIMessage('signupMessage', errorMsg, false);
        }
    } catch(err) {
        displayUIMessage('signupMessage', "Server error. Is the backend running?", false);
    } finally {
        setTimeout(() => { btn.textContent = oldText; }, 1800);
    }
});

/* LOGIN API INTEGRATION */
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.main-btn');
    const oldText = btn.textContent;
    btn.textContent = "Processing...";

    const payload = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    try {
        const res = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
            btn.textContent = "✓ SUCCESS";
            displayUIMessage('loginMessage', data.message || "Login successful!", true);
        } else {
            displayUIMessage('loginMessage', data.message || "Invalid credentials.", false);
            btn.textContent = oldText;
        }
    } catch(err) {
        displayUIMessage('loginMessage', "Server error. Is the backend running?", false);
        btn.textContent = oldText;
    }
});