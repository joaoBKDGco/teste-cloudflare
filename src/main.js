import './style.css'

const builtAt = __BUILD_TIME__

document.querySelector('#app').innerHTML = `
  <main class="card">
    <span class="badge">Online</span>
    <h1>Teste Cloudflare</h1>
    <p>Página estática feita com Vite, publicada no Cloudflare Pages a partir do GitHub.</p>
    <dl>
      <div><dt>Build</dt><dd>${new Date(builtAt).toLocaleString('pt-BR')}</dd></div>
      <div><dt>Host</dt><dd>${location.host}</dd></div>
    </dl>
    <button id="ping">Clique aqui</button>
    <p id="out" class="out" aria-live="polite"></p>
  </main>
`

let n = 0
document.querySelector('#ping').addEventListener('click', () => {
  n++
  document.querySelector('#out').textContent = `Funcionou! ${n} clique${n > 1 ? 's' : ''}.`
})
