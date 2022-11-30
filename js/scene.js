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

  function makeCube() {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    const cube = new THREE.Mesh(geometry, material);
    return cube;
  }

  function main() {
    console.log("hello");
    const canvas = $("#scene").get(0);
    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = makeCamera();

    const scene = new THREE.Scene();

    const light = makeLight();

    scene.add(light);

    const cube = makeCube();

    scene.add(cube);

    function animate(time) {
      time *= 0.001; // convert time to seconds

      cube.rotation.x = time;
      cube.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  main();
});
