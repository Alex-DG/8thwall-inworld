import * as THREE from 'three'

class _Lights {
  init() {
    const { scene } = XR8.Threejs.xrScene()
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(0, 2, 0)
    scene.add(directionalLight)
  }
}

const Lights = new _Lights()
export default Lights
