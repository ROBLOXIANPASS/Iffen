document.addEventListener('DOMContentLoaded', function() {
    const MAKE_URL = "https://hook.us2.make.com/wiikktnvbhxvvhy93nr723wzsfoty1ax";
    const RATE = 0.04;

    const modal = document.getElementById('modalRegras');
    const app = document.getElementById('appContent');
    const concordou = document.getElementById('concordo');
    const btnConfirmar = document.getElementById('btnConfirmar');
    
    const perfil = document.getElementById('perfil');
    const valor = document.getElementById('valor');
    const gamepass = document.getElementById('gamepass');
    const robuxQtde = document.getElementById('robuxQtde');
    const btnPagar = document.getElementById('btnPagar');
    const userPhoto = document.getElementById('userPhoto');
    const previewArea = document.getElementById('previewArea');

    // Lógica do Modal
    concordou.addEventListener('change', function() {
        btnConfirmar.disabled = !this.checked;
    });

    btnConfirmar.addEventListener('click', function() {
        modal.style.display = 'none';
        app.classList.remove('blur');
    });

    // Lógica da Foto e Cálculo
    function validar() {
        const v = parseFloat(valor.value) || 0;
        const p = perfil.value.includes("roblox.com/users/");
        const g = gamepass.value.length > 5;
        
        if (v > 0) {
            robuxQtde.innerText = Math.floor(v / RATE).toLocaleString();
        } else {
            robuxQtde.innerText = "0";
        }
        
        btnPagar.disabled = !(v >= 15 && p && g);
    }

    perfil.addEventListener('input', function() {
        const match = perfil.value.match(/users\/(\d+)/);
        if (match) {
            userPhoto.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${match[1]}&width=150&height=150&format=png`;
            previewArea.style.display = 'flex';
        } else {
            previewArea.style.display = 'none';
        }
        validar();
    });

    valor.addEventListener('input', validar);
    gamepass.addEventListener('input', validar);

    // Botão Finalizar
    btnPagar.addEventListener('click', async function() {
        btnPagar.innerText = "GERANDO PIX...";
        btnPagar.disabled = true;
        try {
            await fetch(MAKE_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user: perfil.value,
                    valor: valor.value,
                    robux: robuxQtde.innerText,
                    gamepass: gamepass.value
                })
            });
        } catch (e) {
            console.error("Erro no Webhook");
        }
        window.location.href = "https://t.me/LIL7809";
    });
});
