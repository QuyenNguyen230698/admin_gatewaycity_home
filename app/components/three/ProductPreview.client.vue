<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvasRef = ref(null)
const containerRef = ref(null)
let renderer, scene, camera, cube, controls, animationId

const initThree = () => {
  if (!canvasRef.value) return

  // 1. Scene & Camera
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, containerRef.value.clientWidth / containerRef.value.clientHeight, 0.1, 1000)
  camera.position.z = 4
  camera.position.y = 1

  // 2. Renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvasRef.value, 
    antialias: true, 
    alpha: true 
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)

  // 3. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  const blueLight = new THREE.PointLight(0x2563eb, 2, 10)
  blueLight.position.set(-2, 1, 2)
  scene.add(blueLight)

  // 4. Object (Product Mockup)
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x0f172a, 
    roughness: 0.2, 
    metalness: 0.8,
    emissive: 0x1e293b,
    emissiveIntensity: 0.1
  })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // 5. Controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // 6. Animation
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    cube.rotation.y += 0.005
    cube.rotation.z += 0.002
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
}

const handleResize = () => {
  if (!containerRef.value || !camera || !renderer) return
  camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
}

onMounted(() => {
  initThree()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div ref="containerRef" class="w-full h-[500px] bg-slate-900 rounded-3xl relative overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-800">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
    
    <!-- UI Overlay -->
    <div class="absolute top-6 left-6 flex flex-col gap-1 pointer-events-none">
       <span class="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Neural Engine v4.0</span>
       <h3 class="text-white font-bold text-lg tracking-tight">Enterprise Asset Preview</h3>
    </div>

    <div class="absolute bottom-6 left-6 flex items-center gap-4">
       <div class="flex flex-col">
          <span class="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Rotation Speed</span>
          <div class="h-1 w-24 bg-slate-800 rounded-full mt-1 overflow-hidden">
             <div class="h-full bg-blue-600 w-1/3"></div>
          </div>
       </div>
    </div>

    <div class="absolute bottom-6 right-6 flex items-center gap-2">
       <button class="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
       </button>
    </div>
  </div>
</template>
