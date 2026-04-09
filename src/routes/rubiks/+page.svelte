<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { RubiksCube, type MoveType } from '$lib/RubiksCube';

  let canvas: HTMLCanvasElement;
  let cube: RubiksCube;
  let renderer: THREE.WebGLRenderer;
  let animFrameId: number;
  let isScrambling = $state(false);

  const moves: { label: string; move: MoveType }[] = [
    { label: 'U',  move: 'U'  }, { label: "U'", move: "U'" }, { label: 'U2', move: 'U2' },
    { label: 'D',  move: 'D'  }, { label: "D'", move: "D'" }, { label: 'D2', move: 'D2' },
    { label: 'R',  move: 'R'  }, { label: "R'", move: "R'" }, { label: 'R2', move: 'R2' },
    { label: 'L',  move: 'L'  }, { label: "L'", move: "L'" }, { label: 'L2', move: 'L2' },
    { label: 'F',  move: 'F'  }, { label: "F'", move: "F'" }, { label: 'F2', move: 'F2' },
    { label: 'B',  move: 'B'  }, { label: "B'", move: "B'" }, { label: 'B2', move: 'B2' },
  ];

  const keyMap: Record<string, MoveType> = {
    'u': 'U', 'U': "U'",
    'd': 'D', 'D': "D'",
    'r': 'R', 'R': "R'",
    'l': 'L', 'L': "L'",
    'f': 'F', 'F': "F'",
    'b': 'B', 'B': "B'",
  };

  function handleKey(e: KeyboardEvent) {
    const move = keyMap[e.key];
    if (move && !isScrambling) {
      cube.doMove(move);
    }
  }

  async function scramble() {
    isScrambling = true;
    await cube.scramble(20);
    isScrambling = false;
  }

  onMount(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(5, 4, 6);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.shadowMap.enabled = true;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 15;

    cube = new RubiksCube(scene);

    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', handleKey);

    const loop = () => {
      animFrameId = requestAnimationFrame(loop);
      controls.update();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', handleKey);
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
    };
  });
</script>

<div class="app">
  <div class="sidebar">
    <h1>🧩 Rubik's Cube</h1>
    <p class="hint">Drag to rotate view • Click move buttons or use keyboard</p>

    <div class="move-grid">
      {#each ['U','D','R','L','F','B'] as face}
        <div class="face-group">
          <span class="face-label">{face}</span>
          {#each moves.filter(m => m.label.startsWith(face)) as m}
            <button
              class="move-btn"
              onclick={() => cube?.doMove(m.move)}
              disabled={isScrambling}
            >{m.label}</button>
          {/each}
        </div>
      {/each}
    </div>

    <div class="controls">
      <button class="action-btn scramble-btn" onclick={scramble} disabled={isScrambling}>
        {isScrambling ? '⏳ Scrambling…' : '🔀 Scramble'}
      </button>
    </div>

    <div class="keyboard-hint">
      <h3>Keyboard shortcuts</h3>
      <table>
        <tbody>
          <tr><td>u</td><td>U move</td><td>U (shift)</td><td>U'</td></tr>
          <tr><td>d</td><td>D move</td><td>D (shift)</td><td>D'</td></tr>
          <tr><td>r</td><td>R move</td><td>R (shift)</td><td>R'</td></tr>
          <tr><td>l</td><td>L move</td><td>L (shift)</td><td>L'</td></tr>
          <tr><td>f</td><td>F move</td><td>F (shift)</td><td>F'</td></tr>
          <tr><td>b</td><td>B move</td><td>B (shift)</td><td>B'</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas bind:this={canvas}></canvas>
  </div>
</div>

<style>
  .app {
    display: flex;
    height: 100vh;
    font-family: 'Segoe UI', system-ui, sans-serif;
    color: #e0e0e0;
  }

  .sidebar {
    width: 280px;
    min-width: 240px;
    background: #16213e;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    box-shadow: 4px 0 20px rgba(0,0,0,0.4);
    z-index: 1;
  }

  h1 {
    margin: 0;
    font-size: 1.4rem;
    color: #f0f0f0;
  }

  .hint {
    margin: 0;
    font-size: 0.75rem;
    color: #7a8aa0;
    line-height: 1.4;
  }

  .move-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .face-group {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .face-label {
    width: 18px;
    font-weight: bold;
    font-size: 0.85rem;
    color: #a0b0c0;
  }

  .move-btn {
    flex: 1;
    padding: 8px 4px;
    border: 1px solid #2a3a5e;
    border-radius: 6px;
    background: #0f3460;
    color: #e0f0ff;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
  }

  .move-btn:hover:not(:disabled) {
    background: #1a5a9e;
    border-color: #4a8adf;
    transform: translateY(-1px);
  }

  .move-btn:active:not(:disabled) {
    transform: translateY(0);
    background: #0a2a50;
  }

  .move-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .action-btn {
    padding: 10px;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
  }

  .scramble-btn {
    background: #e94560;
    color: white;
  }

  .scramble-btn:hover:not(:disabled) {
    background: #ff6080;
    transform: translateY(-1px);
  }

  .scramble-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .keyboard-hint {
    border-top: 1px solid #2a3a5e;
    padding-top: 12px;
  }

  .keyboard-hint h3 {
    margin: 0 0 8px;
    font-size: 0.8rem;
    color: #7a8aa0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .keyboard-hint table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.78rem;
  }

  .keyboard-hint td {
    padding: 3px 4px;
    color: #8090a0;
  }

  .keyboard-hint td:nth-child(odd) {
    font-family: monospace;
    background: #0f3460;
    border-radius: 3px;
    color: #c0d8f0;
    text-align: center;
    width: 28px;
  }

  .canvas-wrap {
    flex: 1;
    position: relative;
    background: #1a1a2e;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
