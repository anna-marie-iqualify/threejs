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

  function makeDirectionalLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    return light;
  }

  function makePointLight() {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
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

  // characters
  function makeSphere(radius, segments) {
    const widthSegments = segments;
    const heightSegments = segments;
    const sphereGeometry = new THREE.SphereBufferGeometry(
      radius,
      widthSegments,
      heightSegments
    );
    return sphereGeometry;
  }

  function main() {
    const canvas = $("#sun-earth-moon").get(0);
    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = makeCamera();
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    const light = makeDirectionalLight();

    scene.add(light);

    // Adding characters
    // making the sun
    const objects = [];
    const sunShape = makeSphere(1, 6);
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sunShape, sunMaterial);

    sunMesh.scale.set(5, 5, 5); // make the sun large
    scene.add(sunMesh);
    objects.push(sunMesh);

    const sunlight = makePointLight();
    scene.add(sunlight);

    function animate(time) {
      time *= 0.001; // convert time to seconds

      // resize window if needed
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      objects.forEach((obj) => {
        obj.rotation.y = time;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  main();
});
