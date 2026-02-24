const MAKE_URL = "https://hook.us2.make.com/wiikktnvbhxvvhy93nr723wzsfoty1ax";
const RATE = 0.04;

// Lógica do Modal
const welcomeModal = document.getElementById('welcomeModal');
const agreeCheck = document.getElementById('agreeCheck');
const startBtn = document.getElementById('startBtn');
const mainApp = document.getElementById('mainApp');

agreeCheck.addEventListener('change', () => {
    startBtn.disabled = !agreeCheck.checked;
});

startBtn.addEventListener('click', () => {
    welcomeModal.style.display = 'none';
    mainApp.classList.remove('blur');
});

// Lógica de Venda
const amountInput = document.getElementById('amount');
const robuxTotal = document.getElementById('robuxTotal');
const cashDisplay = document.getElementById('cashDisplay');
const mainBtn = document.getElementById('mainBtn');
const linkInput = document.getElementById('profileLink');

function validate() {
    const val = parseFloat(amountInput.value) || 0;
    const hasProfile = linkInput.value.includes("roblox.com/users/");
    const hasPass = document.getElementById('gamepassLink').value.length > 5;

    if (val > 0) {
        robuxTotal.innerText = Math.floor(val / RATE).toLocaleString();
        cashDisplay.innerText = val.toFixed(2).replace('.', ',');
    }
    mainBtn.disabled = !(val >= 15 && hasProfile && hasPass);
}

amountInput.addEventListener('input', validate);
linkInput.addEventListener('input', validate);
document.getElementById('gamepassLink').addEventListener('input', validate);

mainBtn.addEventListener('click', async () => {
    mainBtn.innerText = "PROCESSANDO...";
    mainBtn.disabled = true;

    const pedido = {
        user: linkInput.value,
        valor: amountInput.value,
        robux: robuxTotal.innerText,
        gamepass: document.getElementById('gamepassLink').value
    };

    try {
        const response = await fetch(MAKE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });

        const data = await response.json();
        if (data.payment_url) {
            window.location.href = data.payment_url;
        } else {
            window.location.href = "https://t.me/LIL7809";
        }
    } catch (e) {
        window.location.href = "https://t.me/LIL7809";
    }
});
