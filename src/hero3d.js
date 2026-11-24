import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export function createHero3D(canvas, container) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.set(0, 0, 9)

  const group = new THREE.Group()
  scene.add(group)

  // Núcleo de vidro iridescente
  const glass = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.15, 0.38, 320, 48, 2, 3),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.15,
      roughness: 0.08,
      transmission: 0.9,
      thickness: 1.4,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      iridescence: 1,
      iridescenceIOR: 1.6,
      iridescenceThicknessRange: [200, 900],
    }),
  )
  group.add(glass)

  // Luzes coloridas que dão o brilho
  const l1 = new THREE.PointLight(0x5b8cff, 40, 20)
  l1.position.set(-4, 2, 3)
  const l2 = new THREE.PointLight(0xff5fa8, 40, 20)
  l2.position.set(4, -2, 3)
  scene.add(l1, l2)

  function resize() {
    const w = container.clientWidth
    const h = container.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // Afasta a câmera em telas estreitas para o objeto caber
    camera.position.z = w < 700 ? 16 : 12.5
    camera.updateProjectionMatrix()
  }
  resize()
  addEventListener('resize', resize)

  const pointer = { x: 0, y: 0 }
  addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1
    pointer.y = (e.clientY / innerHeight) * 2 - 1
  })

  const clock = new THREE.Clock()
  let visible = true
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(container)

  function tick() {
    requestAnimationFrame(tick)
    if (!visible) return
    const t = clock.getElapsedTime()
    const scroll = Math.min(scrollY / innerHeight, 1.5)
    const spin = reduceMotion ? 0 : t * 0.25

    glass.rotation.x = spin * 0.6 + scroll * 1.2
    glass.rotation.y = spin + scroll * 2
    group.rotation.y += (pointer.x * 0.35 - group.rotation.y) * 0.05
    group.rotation.x += (pointer.y * 0.25 - group.rotation.x) * 0.05
    group.position.y = -1.75 + Math.sin(t * 0.8) * 0.08 + scroll * 1.2
    group.scale.setScalar(1 + scroll * 0.15)

    l1.position.x = Math.sin(t * 0.5) * 5
    l2.position.x = Math.cos(t * 0.4) * 5

    renderer.render(scene, camera)
  }
  tick()
}
