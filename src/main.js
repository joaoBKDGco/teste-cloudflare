import './style.css'
import { createHero3D } from './hero3d.js'

const builtAt = __BUILD_TIME__

document.querySelector('#app').innerHTML = `
  <nav class="nav">
    <span class="logo">◐ Orbe</span>
    <div class="nav-links">
      <a href="#detalhes">Detalhes</a>
      <a href="#info">Info</a>
    </div>
  </nav>

  <section class="hero" id="hero">
    <canvas id="scene" aria-hidden="true"></canvas>
    <div class="hero-copy">
      <p class="eyebrow">Novo</p>
      <h1 class="title">Orbe.</h1>
      <p class="tagline">Luz, vidro e movimento.<br />Num só objeto.</p>
      <div class="ctas">
        <a class="btn btn-primary" href="#detalhes">Saiba mais</a>
        <a class="btn btn-link" href="#info">Ver detalhes ›</a>
      </div>
    </div>
    <div class="scroll-hint" aria-hidden="true"><span></span></div>
  </section>

  <section class="details" id="detalhes">
    <h2 class="reveal">Feito de luz.<br /><span>Renderizado no navegador.</span></h2>
    <div class="grid">
      <article class="tile reveal"><strong>60 fps</strong><p>WebGL com three.js, direto na GPU.</p></article>
      <article class="tile reveal"><strong>Vidro real</strong><p>Material físico com transmissão, clearcoat e iridescência.</p></article>
      <article class="tile reveal"><strong>Responde a você</strong><p>Mova o mouse e role a página para girar o objeto.</p></article>
    </div>
  </section>

  <footer class="info" id="info">
    <p>Publicado no Cloudflare Pages · build ${new Date(builtAt).toLocaleString('pt-BR')}</p>
  </footer>
`

createHero3D(document.querySelector('#scene'), document.querySelector('#hero'))

const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
  { threshold: 0.2 },
)
document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

const copy = document.querySelector('.hero-copy')
addEventListener('scroll', () => {
  const p = Math.min(scrollY / innerHeight, 1)
  copy.style.opacity = String(1 - p * 1.4)
  copy.style.transform = `translateY(${p * -60}px) scale(${1 - p * 0.06})`
}, { passive: true })
