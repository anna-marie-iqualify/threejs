$(document).ready(function () {
  function makeCamera(fov = 75) {
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

  function makeCube() {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    return geometry;
  }

  function main() {
    const canvas = $("#textures").get(0);
    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = makeCamera();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    const light = makeLight();

    scene.add(light);

    const geometry = makeCube();
    const cubes = []; // just an array we can use to rotate the cubes
    const loader = new THREE.TextureLoader();

    loader.load(
      "https://r105.threejsfundamentals.org/threejs/resources/images/wall.jpg",
      (texture) => {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = -1;
        scene.add(cube);
        cubes.push(cube); // add to our list of cubes to rotate
      }
    );

    const materials = [
      new THREE.MeshBasicMaterial({
        map: loader.load("../resources/images/flower-1.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../resources/images/flower-2.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../resources/images/flower-3.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../resources/images/flower-4.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../resources/images/flower-5.jpg"),
      }),
      new THREE.MeshBasicMaterial({
        map: loader.load("../resources/images/flower-6.jpg"),
      }),
    ];

    const flowerCube = new THREE.Mesh(makeCube(), materials);
    flowerCube.position.x = 1;
    scene.add(flowerCube);
    cubes.push(flowerCube);

    function animate(time) {
      time *= 0.001; // convert time to seconds

      // resize window if needed
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      cubes.forEach((cube, ndx) => {
        const speed = 0.2 + ndx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  main();
});
