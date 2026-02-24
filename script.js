const MAKE_URL = "https://hook.us2.make.com/wiikktnvbhxvvhy93nr723wzsfoty1ax";
const RATE = 0.04;

// Lógica do Modal de Regras
const concordou = document.getElementById('concordo');
const btnConfirmar = document.getElementById('btnConfirmar');
const modal = document.getElementById('modalRegras');
const app = document.getElementById('appContent');

concordou.addEventListener('change', () => {
    btnConfirmar.disabled = !concordou.checked;
});

btnConfirmar.addEventListener('click', () => {
    modal.style.display = 'none';
    app.classList.remove('blur');
});

// Lógica de Cálculo e Validação
const perfil = document.getElementById('perfil');
const valor = document.getElementById('valor');
const gamepass = document.getElementById('gamepass');
const robuxQtde = document.getElementById('robuxQtde');
const totalReal = document.getElementById('totalReal');
const btnPagar = document.getElementById('btnPagar');

function validar() {
    const v = parseFloat(valor.value) || 0;
    const p = perfil.value.includes("roblox.com/users/");
    const g = gamepass.value.length > 5;

    if (v > 0) {
        robuxQtde.innerText = Math.floor(v / RATE).toLocaleString();
        totalReal.innerText = v.toFixed(2).replace('.', ',');
    }
    btnPagar.disabled = !(v >= 15 && p && g);
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
