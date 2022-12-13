$(document).ready(function () {
  function makeCamera() {
    const fov = 40;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;
    return camera;
  }

  function makeLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    return light;
  }
  
  // fix pixelation of objects.
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function main() {
    const canvas = $("#textures").get(0);
    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = makeCamera();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    const light = makeLight();

    scene.add(light);

    function animate(time) {
      time *= 0.001; // convert time to seconds

      // resize window if needed
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  main();
});
