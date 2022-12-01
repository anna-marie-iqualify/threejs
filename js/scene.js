$(document).ready(function () {
  function makeCamera() {
    const fov = 40;
    const aspect = 2;  // the canvas default
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
    scene.background = new THREE.Color(0xAAAAAA);

    const light = makeLight();

    scene.add(light);

    const objects = [];
    const spread = 15;
  
    function addObject(x, y, obj) {
      obj.position.x = x * spread;
      obj.position.y = y * spread;
  
      scene.add(obj);
      objects.push(obj);
    }

    function createMaterial() {
      const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
      });
  
      const hue = Math.random();
      const saturation = 1;
      const luminance = .5;
      material.color.setHSL(hue, saturation, luminance);
  
      return material;
    }

    function addSolidGeometry(x, y, geometry) {
      const mesh = new THREE.Mesh(geometry, createMaterial());
      addObject(x, y, mesh);
    }
  
    function addLineGeometry(x, y, geometry) {
      const material = new THREE.LineBasicMaterial({color: 0x000000});
      const mesh = new THREE.LineSegments(geometry, material);
      addObject(x, y, mesh);
    }

    {
      const width = 8;
      const height = 8;
      const depth = 8;
      addSolidGeometry(-2, 2, new THREE.BoxBufferGeometry(width, height, depth));
    }

    function animate(time) {
      time *= 0.001; // convert time to seconds

      // resize window if needed
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      objects.forEach((obj, ndx) => {
        const speed = .1 + ndx * .05;
        const rot = time * speed;
        obj.rotation.x = rot;
        obj.rotation.y = rot;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  main();
});
