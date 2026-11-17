import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { RAIO, VI, LETRAS } from '../../src/Diamante.jsx'

// Peças da marca em 3D: as mesmas coordenadas da logo, extrudadas com bisel.
// tipo: 'diamante' | 'raio' | 'V' | 'I'
const MAGENTA = '#D400EC'

function pecasDe(tipo) {
  if (tipo === 'diamante' || tipo === 'raio') {
    const raio = [
      { pontos: RAIO[0], cor: MAGENTA, vem: [0.4, 5, 2] },
      { pontos: RAIO[1], cor: '#a000b4', vem: [0.6, 6, -2] },
    ]
    if (tipo === 'raio') return raio
    return [
      ...raio,
      { pontos: VI.laranja, cor: '#D66D00', vem: [-5, 1, 2] },
      { pontos: VI.escuro, cor: '#4a0050', vem: [-6, -2, -1], contorno: true },
    ]
  }
  return LETRAS[tipo].partes.map((p, i) => ({ d: p.d, cor: p.cor === '#fff' ? '#f6eaf7' : p.cor, vem: [i ? 3 : -4, 4, 2] }))
}

function formas(peca) {
  if (peca.pontos) {
    const pts = peca.pontos.split(' ').map((p) => p.split(',').map(Number))
    const s = new THREE.Shape()
    pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)))
    return [s]
  }
  const svg = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${peca.d}"/></svg>`)
  return svg.paths.flatMap((p) => SVGLoader.createShapes(p))
}

const suave = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4)

export default function Objeto3D({ tipo = 'diamante', className = '', profundidade = 34, giro = 0.45, atraso = 0 }) {
  const caixa = useRef(null)

  useEffect(() => {
    const el = caixa.current
    if (!el) return
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      el.classList.add('objeto3d--sem-webgl')
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    el.appendChild(renderer.domElement)

    const cena = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 1, 5000)
    camera.position.set(0, 0, 900)

    cena.add(new THREE.AmbientLight('#ffffff', 0.55))
    const frente = new THREE.DirectionalLight('#ffffff', 2.2)
    frente.position.set(200, 300, 600)
    cena.add(frente)
    const magenta = new THREE.PointLight('#ff3cff', 4, 0, 0)
    magenta.position.set(-400, 100, 300)
    cena.add(magenta)
    const laranja = new THREE.PointLight('#ff9a2e', 3, 0, 0)
    laranja.position.set(400, -250, 250)
    cena.add(laranja)

    const grupo = new THREE.Group()
    cena.add(grupo)
    const pecas = pecasDe(tipo)
    const malhas = pecas.map((p) => {
      const geo = new THREE.ExtrudeGeometry(formas(p), {
        depth: profundidade, bevelEnabled: true, bevelThickness: 4, bevelSize: 3, bevelSegments: 3, curveSegments: 6,
      })
      const mat = new THREE.MeshPhysicalMaterial({
        color: p.cor, metalness: 0.35, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15,
        emissive: p.cor, emissiveIntensity: p.cor === '#4a0050' ? 0.25 : 0.12,
      })
      const m = new THREE.Mesh(geo, mat)
      if (p.contorno) {
        const linhas = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), new THREE.LineBasicMaterial({ color: '#ffb8ff', transparent: true, opacity: 0.7 }))
        m.add(linhas)
      }
      grupo.add(m)
      return { m, vem: p.vem }
    })

    // Centraliza e vira (o SVG tem o eixo Y para baixo)
    const bbox = new THREE.Box3().setFromObject(grupo)
    const centro = bbox.getCenter(new THREE.Vector3())
    const tamanho = bbox.getSize(new THREE.Vector3())
    malhas.forEach(({ m }) => m.geometry.translate(-centro.x, -centro.y, -profundidade / 2))
    grupo.scale.set(1, -1, 1)
    const escala = (tipo === 'V' || tipo === 'I' ? 340 : 520) / Math.max(tamanho.x, tamanho.y)
    grupo.scale.multiplyScalar(escala)

    // Faíscas em volta
    const n = 140
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 260 + Math.random() * 260
      const a = Math.random() * Math.PI * 2
      pos.set([Math.cos(a) * r, (Math.random() - 0.5) * 700, Math.sin(a) * r * 0.6], i * 3)
    }
    const geoP = new THREE.BufferGeometry()
    geoP.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const faiscas = new THREE.Points(geoP, new THREE.PointsMaterial({ color: '#ffb0ff', size: 4, transparent: true, opacity: 0.75, sizeAttenuation: true }))
    cena.add(faiscas)

    const mouse = { x: 0, y: 0, ax: 0, ay: 0 }
    const mover = (e) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = (e.clientY / innerHeight) * 2 - 1 }
    addEventListener('pointermove', mover)

    const ajustar = () => {
      const w = el.clientWidth, h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    ajustar()
    const obs = new ResizeObserver(ajustar)
    obs.observe(el)

    const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches
    const inicio = performance.now() + atraso
    let quadro
    const desenhar = (agora) => {
      const t = Math.max(0, (agora - inicio) / 1000)
      malhas.forEach(({ m, vem }, i) => {
        const k = reduzido ? 1 : suave((t - i * 0.18) / 1.3)
        const f = (1 - k) * 160
        m.position.set(vem[0] * f, -vem[1] * f, vem[2] * f)
        m.rotation.set((1 - k) * 2.2, (1 - k) * -1.6, 0)
      })
      mouse.ax += (mouse.x - mouse.ax) * 0.05
      mouse.ay += (mouse.y - mouse.ay) * 0.05
      grupo.rotation.y = Math.sin(t * 0.7) * giro + mouse.ax * 0.5
      grupo.rotation.x = Math.sin(t * 0.5) * 0.08 + mouse.ay * 0.25
      grupo.position.y = Math.sin(t * 1.2) * 14
      faiscas.rotation.y = t * 0.12
      faiscas.material.opacity = 0.45 + Math.sin(t * 3) * 0.25
      renderer.render(cena, camera)
      quadro = requestAnimationFrame(desenhar)
    }
    quadro = requestAnimationFrame(desenhar)

    return () => {
      cancelAnimationFrame(quadro)
      removeEventListener('pointermove', mover)
      obs.disconnect()
      cena.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.() })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [tipo, profundidade, giro, atraso])

  return <div ref={caixa} className={`objeto3d ${className}`} aria-hidden="true" />
}
