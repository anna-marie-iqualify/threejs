$(document).ready(function () {
  function makeCamera() {
    const fov = 40;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

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

  // Turns both axes and grid visible on/off
  // dat.GUI requires a property that returns a bool
  // to decide to make a checkbox so we make a setter
  // and getter for `visible` which we can tell dat.GUI
  // to look at.
  const gui = new dat.gui.GUI();
  class AxisGridHelper {
    constructor(node, units = 10) {
      const axes = new THREE.AxesHelper();
      axes.material.depthTest = false;
      axes.renderOrder = 2; // after the grid
      node.add(axes);

      const grid = new THREE.GridHelper(units, units);
      grid.material.depthTest = false;
      grid.renderOrder = 1;
      node.add(grid);

      this.grid = grid;
      this.axes = axes;
      this.visible = false;
    }
    get visible() {
      return this._visible;
    }
    set visible(v) {
      this._visible = v;
      this.grid.visible = v;
      this.axes.visible = v;
    }
  }

  function main() {
    const canvas = $("#sun-earth-moon").get(0);
    const renderer = new THREE.WebGLRenderer({ canvas });

    const camera = makeCamera();
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    const objects = [];

    // Adding characters
    // make solarSystem
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    // making the sun
    const sunShape = makeSphere(1, 6);
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sunShape, sunMaterial);

    sunMesh.scale.set(5, 5, 5); // make the sun large
    solarSystem.add(sunMesh);
    objects.push(sunMesh);
    const sunlight = makePointLight();
    scene.add(sunlight);

    // making the earth orbit
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    // making the earth
    const earthShape = makeSphere(1, 6);
    const earthMats = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    });
    const earthMesh = new THREE.Mesh(earthShape, earthMats);
    objects.push(earthMesh);
    earthOrbit.add(earthMesh);

    // making the moon orbit
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    // making the moon
    const moonShape = makeSphere(1, 6);
    const moonMats = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
    });

    const moonMesh = new THREE.Mesh(moonShape, moonMats);
    moonMesh.scale.set(0.5, 0.5, 0.5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    // make a grid
    function makeAxisGrid(node, label, units) {
      const helper = new AxisGridHelper(node, units);
      gui.add(helper, "visible").name(label);
    }

    makeAxisGrid(solarSystem, "solarSystem", 25);
    makeAxisGrid(sunMesh, "sunMesh");
    makeAxisGrid(earthOrbit, "earthOrbit");
    makeAxisGrid(earthMesh, "earthMesh");
    makeAxisGrid(moonMesh, "moonMesh");

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
