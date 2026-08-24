// --- FUNÇÃO DE AUTO-AJUSTE DO ASCII ---
function ajustarTamanhoAscii() {
  const pre = document.getElementById('ascii-art');
  if (!pre) return;

  // Encontra o comprimento da linha mais longa
  const linhas = pre.innerText.split('\n');
  const maxCaracteres = Math.max(...linhas.map(linha => linha.length));

  if (maxCaracteres === 0) return;

  // Largura disponível na tela (com margem de segurança de 20px)
  const larguraDisponivel = window.innerWidth - 20;

  // Proporção largura/altura em fontes monoespaçadas (aprox. 0.6)
  const razaoCaractere = 0.605;

  // Calcula o font-size exato para a linha preencher a tela sem quebrar
  const tamanhoCalculado = larguraDisponivel / (maxCaracteres * razaoCaractere);

  // Limita o tamanho: mínimo de 3px e máximo de 14px no desktop
  const tamanhoFinal = Math.min(Math.max(tamanhoCalculado, 3), 14);

  pre.style.fontSize = `${tamanhoFinal}px`;
}

// Executa ao carregar a página e sempre que a tela mudar de tamanho ou girar
window.addEventListener('DOMContentLoaded', ajustarTamanhoAscii);
window.addEventListener('resize', ajustarTamanhoAscii);
window.addEventListener('orientationchange', ajustarTamanhoAscii);


// Meu código para enviar os dados do formulário para o Google Sheets via SheetMonkey
document.querySelector('form').addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); 

    const nome = document.querySelector('input[name="Nome"]').value;
    const memoria = document.querySelector('input[name="Memoria"]').value;
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
