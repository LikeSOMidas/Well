document.querySelector('form').addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.querySelector('input[name="Nome"]').value;
    const memoria = document.querySelector('input[name="Memória"]').value;
    const created = new Date().toISOString();

    document.querySelector("form button[type='submit']").disabled = true;

    fetch('https://api.sheetmonkey.io/form/5RLnHa37yoqgJZCMCHZPcq', 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: 
                JSON.stringify({Name: nome, Memory: memoria, Created: created})
        });
    iniciarLoadingAscii(document.querySelector('button[type="submit"]'));
    
}

function iniciarLoadingAscii(elementoBotao) {
    const etapasBarra = [
        '[█         ]',
        '[███       ]',
        '[█████     ]',
        '[███████   ]',
        '[█████████ ]',
        '[██████████]'
    ];
    
    let etapaAtual = 0;

    // Atualiza o texto do botão a cada 300 milissegundos
    const intervalo = setInterval(() => {
        if (etapaAtual < etapasBarra.length) {
            elementoBotao.textContent = etapasBarra[etapaAtual];
            etapaAtual++;
        } else {
            clearInterval(intervalo);
            document.querySelector("form").reset()
            elementoBotao.textContent = 'Esquecer';
            document.querySelector("form button[type='submit']").disabled = false;
            window.location.replace('./forgotten.html');
        }
    }, 300);
}
