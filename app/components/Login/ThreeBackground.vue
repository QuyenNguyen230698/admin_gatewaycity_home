<template>
  <div ref="container" class="absolute inset-0 bg-[#000000] overflow-hidden -z-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.05),transparent_80%)]"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const container = ref(null)
let scene, camera, renderer, globe, instancedParticles
let clock = new THREE.Clock()

// --- LOGIC CHUỘT ---
const mouse = { x: 0, y: 0 }
const targetRotation = { x: 0, y: 0 }

// Cấu hình
const GLOBE_SIZE = 1800 
const PARTICLE_COUNT = 15000 
const PARTICLE_RADIUS = 2 
const WAVE_SPEED = 0.5 
const COLOR_CHANGE_SPEED = 1

const initialPositions = []
const dummy = new THREE.Object3D()

onMounted(() => {
  if (!process.client) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000)
  camera.position.z = 1500

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  // 1. Khối địa cầu ẩn
  const globeGeo = new THREE.IcosahedronGeometry(GLOBE_SIZE / 2, 4)
  const globeMat = new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: true, transparent: true, opacity: 0.05 })
  globe = new THREE.Mesh(globeGeo, globeMat)
  scene.add(globe)

  // 2. Instanced Mesh
  const sphereGeo = new THREE.SphereGeometry(PARTICLE_RADIUS, 8, 8) 
  const sphereMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  })

  instancedParticles = new THREE.InstancedMesh(sphereGeo, sphereMat, PARTICLE_COUNT)
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const phi = Math.random() * Math.PI * 2
    const theta = Math.acos(2 * Math.random() - 1)
    const radius = (GLOBE_SIZE / 2) + Math.random() * 60
    const x = radius * Math.sin(theta) * Math.cos(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(theta)

    initialPositions.push({ x, y, z })
    dummy.position.set(x, y, z)
    dummy.updateMatrix()
    instancedParticles.setMatrixAt(i, dummy.matrix)
  }
  scene.add(instancedParticles)

  // --- SỰ KIỆN CHUỘT ---
  const handleMouseMove = (event) => {
    // Chuyển tọa độ chuột về dải -1 đến 1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', handleMouseMove)

  // 3. Animation
  const animate = () => {
    requestAnimationFrame(animate)
    const elapsedTime = clock.getElapsedTime()

    // --- XOAY THEO CHUỘT (PARALLAX) ---
    // Tính toán góc xoay mục tiêu dựa trên vị trí chuột
    targetRotation.y = mouse.x * 0.4 // Xoay trục Y khi di chuột ngang
    targetRotation.x = mouse.y * 0.4 // Xoay trục X khi di chuột dọc

    // Dùng lerp để tạo độ trễ mượt mà (0.05 là tốc độ đuổi theo)
    globe.rotation.y += (targetRotation.y - globe.rotation.y) * 0.05
    globe.rotation.x += (targetRotation.x - globe.rotation.x) * 0.05
    instancedParticles.rotation.y += (targetRotation.y - instancedParticles.rotation.y) * 0.05
    instancedParticles.rotation.x += (targetRotation.x - instancedParticles.rotation.x) * 0.05

    // Đổi màu Gradient
    const colorRatio = (Math.sin(elapsedTime * COLOR_CHANGE_SPEED) + 1) / 2
    const currentColor = new THREE.Color(0xea4335).lerp(new THREE.Color(0x4285f4), colorRatio)
    instancedParticles.material.color = currentColor

    // Hiệu ứng sóng biển
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const { x, y, z } = initialPositions[i]
      const waveX = Math.sin(elapsedTime * WAVE_SPEED + x * 0.005) * 15
      const waveY = Math.cos(elapsedTime * WAVE_SPEED + y * 0.005) * 15
      const waveZ = Math.sin(elapsedTime * WAVE_SPEED + z * 0.005) * 15

      dummy.position.set(x + waveX, y + waveY, z + waveZ)
      dummy.rotation.y = elapsedTime * 0.2
      dummy.updateMatrix()
      instancedParticles.setMatrixAt(i, dummy.matrix)
    }
    instancedParticles.instanceMatrix.needsUpdate = true

    // Tự động xoay nhẹ nhàng
    globe.rotation.y += 0.0005
    instancedParticles.rotation.y += 0.0005

    renderer.render(scene, camera)
  }

  animate()

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    renderer.dispose()
    sphereGeo.dispose()
    sphereMat.dispose()
    globeGeo.dispose()
    globeMat.dispose()
  })
})
</script>