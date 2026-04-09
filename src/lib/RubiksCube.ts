import * as THREE from 'three';

// Face colors: White, Yellow, Red, Orange, Blue, Green
const COLORS = {
  white:  0xffffff,
  yellow: 0xffff00,
  red:    0xff2200,
  orange: 0xff8800,
  blue:   0x0044ff,
  green:  0x00aa44,
  black:  0x111111,
};

// Sticker positions on each face (local UV → 3D offset)
// Each cubie is 1x1x1, gap = 0.05
const CUBIE_SIZE = 0.95;
const GAP = 0.05;
const STEP = 1.0; // center-to-center distance

export type MoveType = 'U' | 'D' | 'L' | 'R' | 'F' | 'B' | "U'" | "D'" | "L'" | "R'" | "F'" | "B'" | 'U2' | 'D2' | 'L2' | 'R2' | 'F2' | 'B2';

interface Cubie {
  mesh: THREE.Group;
  // logical position in cube coords -1,0,1
  pos: THREE.Vector3;
}

export class RubiksCube {
  scene: THREE.Scene;
  private cubies: Cubie[] = [];
  private animating = false;
  private animQueue: MoveType[] = [];
  private onAnimDone?: () => void;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.buildCube();
  }

  private buildCube() {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const cubie = this.makeCubie(x, y, z);
          this.scene.add(cubie.mesh);
          this.cubies.push(cubie);
        }
      }
    }
  }

  private makeCubie(x: number, y: number, z: number): Cubie {
    const group = new THREE.Group();
    group.position.set(x * STEP, y * STEP, z * STEP);

    // Black base box
    const geo = new THREE.BoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE);
    const mat = new THREE.MeshStandardMaterial({ color: COLORS.black });
    const box = new THREE.Mesh(geo, mat);
    group.add(box);

    // Add colored stickers on exposed faces
    const stickerSize = CUBIE_SIZE * 0.85;
    const offset = CUBIE_SIZE / 2 + 0.001;

    type FaceSpec = { axis: 'x' | 'y' | 'z'; dir: number; color: number };
    const faces: FaceSpec[] = [
      { axis: 'x', dir:  1, color: COLORS.red },    // Right
      { axis: 'x', dir: -1, color: COLORS.orange },  // Left
      { axis: 'y', dir:  1, color: COLORS.white },   // Top
      { axis: 'y', dir: -1, color: COLORS.yellow },  // Bottom
      { axis: 'z', dir:  1, color: COLORS.blue },    // Front
      { axis: 'z', dir: -1, color: COLORS.green },   // Back
    ];

    for (const face of faces) {
      // Only show sticker if this cubie is on that face
      const cubieFaceVal = face.axis === 'x' ? x : face.axis === 'y' ? y : z;
      if (cubieFaceVal !== face.dir) continue;

      const sGeo = new THREE.PlaneGeometry(stickerSize, stickerSize);
      const sMat = new THREE.MeshStandardMaterial({
        color: face.color,
        roughness: 0.3,
        metalness: 0.1,
      });
      const sticker = new THREE.Mesh(sGeo, sMat);

      if (face.axis === 'x') {
        sticker.position.set(face.dir * offset, 0, 0);
        sticker.rotation.y = face.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else if (face.axis === 'y') {
        sticker.position.set(0, face.dir * offset, 0);
        sticker.rotation.x = face.dir > 0 ? -Math.PI / 2 : Math.PI / 2;
      } else {
        sticker.position.set(0, 0, face.dir * offset);
        if (face.dir < 0) sticker.rotation.y = Math.PI;
      }

      group.add(sticker);
    }

    return { mesh: group, pos: new THREE.Vector3(x, y, z) };
  }

  // Get cubies on a given layer
  private getLayer(axis: 'x' | 'y' | 'z', value: number): Cubie[] {
    return this.cubies.filter(c => {
      const v = axis === 'x' ? c.pos.x : axis === 'y' ? c.pos.y : c.pos.z;
      return Math.round(v) === value;
    });
  }

  // Rotate cubies around an axis by angle
  private rotateLayer(axis: 'x' | 'y' | 'z', value: number, angle: number, duration: number, onDone?: () => void) {
    const layer = this.getLayer(axis, value);
    const pivot = new THREE.Object3D();
    this.scene.add(pivot);

    // Attach cubies to pivot
    for (const c of layer) {
      pivot.attach(c.mesh);
    }

    const axisVec = axis === 'x' ? new THREE.Vector3(1, 0, 0) :
                    axis === 'y' ? new THREE.Vector3(0, 1, 0) :
                                   new THREE.Vector3(0, 0, 1);

    const startTime = performance.now();
    const startQuat = pivot.quaternion.clone();
    const endQuat = new THREE.Quaternion().setFromAxisAngle(axisVec, angle);

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      pivot.quaternion.slerpQuaternions(startQuat, endQuat, eased);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        pivot.quaternion.copy(endQuat);
        // Detach cubies, update positions
        for (const c of layer) {
          this.scene.attach(c.mesh);
          // Update logical position
          c.pos.applyQuaternion(endQuat);
          c.pos.x = Math.round(c.pos.x);
          c.pos.y = Math.round(c.pos.y);
          c.pos.z = Math.round(c.pos.z);
        }
        this.scene.remove(pivot);
        onDone?.();
      }
    };

    requestAnimationFrame(animate);
  }

  // Map move to axis/layer/angle
  private getMoveParams(move: MoveType): { axis: 'x' | 'y' | 'z'; value: number; angle: number } {
    const deg90 = Math.PI / 2;
    switch (move) {
      case 'U':  return { axis: 'y', value:  1, angle: -deg90 };
      case "U'": return { axis: 'y', value:  1, angle:  deg90 };
      case 'U2': return { axis: 'y', value:  1, angle: -deg90 * 2 };
      case 'D':  return { axis: 'y', value: -1, angle:  deg90 };
      case "D'": return { axis: 'y', value: -1, angle: -deg90 };
      case 'D2': return { axis: 'y', value: -1, angle:  deg90 * 2 };
      case 'R':  return { axis: 'x', value:  1, angle: -deg90 };
      case "R'": return { axis: 'x', value:  1, angle:  deg90 };
      case 'R2': return { axis: 'x', value:  1, angle: -deg90 * 2 };
      case 'L':  return { axis: 'x', value: -1, angle:  deg90 };
      case "L'": return { axis: 'x', value: -1, angle: -deg90 };
      case 'L2': return { axis: 'x', value: -1, angle:  deg90 * 2 };
      case 'F':  return { axis: 'z', value:  1, angle: -deg90 };
      case "F'": return { axis: 'z', value:  1, angle:  deg90 };
      case 'F2': return { axis: 'z', value:  1, angle: -deg90 * 2 };
      case 'B':  return { axis: 'z', value: -1, angle:  deg90 };
      case "B'": return { axis: 'z', value: -1, angle: -deg90 };
      case 'B2': return { axis: 'z', value: -1, angle:  deg90 * 2 };
    }
  }

  doMove(move: MoveType, duration = 300) {
    return new Promise<void>((resolve) => {
      if (this.animating) {
        this.animQueue.push(move);
        // Chain via existing queue
        const origDone = this.onAnimDone;
        this.onAnimDone = () => {
          origDone?.();
          resolve();
        };
        return;
      }
      this._executeMove(move, duration, resolve);
    });
  }

  private _executeMove(move: MoveType, duration: number, onDone?: () => void) {
    this.animating = true;
    const { axis, value, angle } = this.getMoveParams(move);
    this.rotateLayer(axis, value, angle, duration, () => {
      this.animating = false;
      onDone?.();
      if (this.animQueue.length > 0) {
        const next = this.animQueue.shift()!;
        this._executeMove(next, duration);
      }
    });
  }

  async scramble(moves = 20) {
    const moveList: MoveType[] = ['U', "U'", 'D', "D'", 'L', "L'", 'R', "R'", 'F', "F'", 'B', "B'"];
    const sequence: MoveType[] = [];
    for (let i = 0; i < moves; i++) {
      sequence.push(moveList[Math.floor(Math.random() * moveList.length)]);
    }
    for (const m of sequence) {
      await this.doMove(m, 80);
    }
  }
}
