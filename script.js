const MAKE_URL = "https://hook.us2.make.com/wiikktnvbhxvvhy93nr723wzsfoty1ax";
const RATE = 0.04;

const perfil = document.getElementById('perfil');
const valor = document.getElementById('valor');
const gamepass = document.getElementById('gamepass');
const robuxQtde = document.getElementById('robuxQtde');
const btnPagar = document.getElementById('btnPagar');
const userPhoto = document.getElementById('userPhoto');
const previewArea = document.getElementById('previewArea');
const modal = document.getElementById('modalRegras');
const app = document.getElementById('appContent');

// Modal
document.getElementById('concordo').addEventListener('change', function() {
    document.getElementById('btnConfirmar').disabled = !this.checked;
});
document.getElementById('btnConfirmar').addEventListener('click', () => {
    modal.style.display = 'none';
    app.classList.remove('blur');
});

// Foto e Validação
perfil.addEventListener('input', () => {
    const match = perfil.value.match(/users\/(\d+)/);
    if (match) {
        userPhoto.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${match[1]}&width=150&height=150&format=png`;
        previewArea.style.display = 'flex';
    } else {
        previewArea.style.display = 'none';
    }
    validar();
});

function validar() {
    const v = parseFloat(valor.value) || 0;
    const p = perfil.value.includes("roblox.com/users/");
    const g = gamepass.value.length > 5;
    if (v > 0) robuxQtde.innerText = Math.floor(v / RATE).toLocaleString();
    btnPagar.disabled = !(v >= 15 && p && g);
}

valor.addEventListener('input', validar);
gamepass.addEventListener('input', validar);

btnPagar.addEventListener('click', async () => {
    btnPagar.innerText = "GERANDO PIX...";
    btnPagar.disabled = true;
    try {
        await fetch(MAKE_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user: perfil.value, valor: valor.value, robux: robuxQtde.innerText, gamepass: gamepass.value})
        });
        window.location.href = "https://t.me/LIL7809";
    } catch (e) { window.location.href = "https://t.me/LIL7809"; }
});
}

[perfil, valor, gamepass].forEach(el => el.addEventListener('input', validar));

btnPagar.addEventListener('click', async () => {
    btnPagar.innerText = "GERANDO PEDIDO...";
    btnPagar.disabled = true;

    try {
        const res = await fetch(MAKE_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user: perfil.value,
                valor: valor.value,
                robux: robuxQtde.innerText,
                gamepass: gamepass.value
            })
        });
        
        const data = await res.json();
        window.location.href = data.payment_url || "https://t.me/LIL7809";
    } catch (e) {
        window.location.href = "https://t.me/LIL7809";
    }
});
