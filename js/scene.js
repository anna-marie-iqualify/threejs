$(document).ready(function () {
  function makeCamera() {
    const fov = 75; // field of view - perspectivce camera takes degrees.
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    return camera;
  }

  function makeLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    return light;
  }

  function makeCube(color, position_x) {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;

    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = position_x;
    return cube;
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
    const canvas = $("#scene").get(0);
    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = makeCamera();

    const scene = new THREE.Scene();

    const light = makeLight();

    scene.add(light);

    const cubes = [
      makeCube(0x8844aa, -2),
      makeCube(0x44aa88, 0),
      makeCube(0xaa8844, 2),
    ];

    cubes.forEach(function (cube) {
      scene.add(cube);
    });

    function animate(time) {
      time *= 0.001; // convert time to seconds

      // resize window if needed
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      cubes.forEach(function (cube, index) {
        const speed = index + 1;
        cube.rotation.x = time * speed;
        cube.rotation.y = time;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  main();
});
