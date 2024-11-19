<script>
    
function createRotationMatrices(rotX, rotY, rotZ) {
    // X-axis rotation matrix
    const Rx = [
        [1, 0, 0],
        [0, Math.cos(rotX), -Math.sin(rotX)],
        [0, Math.sin(rotX), Math.cos(rotX)]
    ];

    // Y-axis rotation matrix
    const Ry = [
        [Math.cos(rotY), 0, Math.sin(rotY)],
        [0, 1, 0],
        [-Math.sin(rotY), 0, Math.cos(rotY)]
    ];

    // Z-axis rotation matrix
    const Rz = [
        [Math.cos(rotZ), -Math.sin(rotZ), 0],
        [Math.sin(rotZ), Math.cos(rotZ), 0],
        [0, 0, 1]
    ];

    return { Rx, Ry, Rz };
}

function rotateCube(vertices, rotX, rotY, rotZ) {
    const { Rx, Ry, Rz } = createRotationMatrices(rotX, rotY, rotZ);

    return vertices.map(v => {
        // Multiply rotation matrices
        let x = v.x * Rx[0][0] + v.y * Rx[0][1] + v.z * Rx[0][2];
        let y = v.x * Rx[1][0] + v.y * Rx[1][1] + v.z * Rx[1][2];
        let z = v.x * Rx[2][0] + v.y * Rx[2][1] + v.z * Rx[2][2];

        // Y rotation
        let rotatedX = x * Ry[0][0] + y * Ry[0][1] + z * Ry[0][2];
        let rotatedY = x * Ry[1][0] + y * Ry[1][1] + z * Ry[1][2];
        let rotatedZ = x * Ry[2][0] + y * Ry[2][1] + z * Ry[2][2];

        // Z rotation
        x = rotatedX * Rz[0][0] + rotatedY * Rz[0][1] + rotatedZ * Rz[0][2];
        y = rotatedX * Rz[1][0] + rotatedY * Rz[1][1] + rotatedZ * Rz[1][2];
        z = rotatedX * Rz[2][0] + rotatedY * Rz[2][1] + rotatedZ * Rz[2][2];

        return { x, y, z };
    });
}

  function projectCube(vertices, centerX = 250, centerY = 250, size = 100) {
    // Simple perspective projection parameters
    const focalLength = 300;

    // Project vertices
    const projectedVertices = vertices.map(v => {
        // Scale the cube
        const scaledX = v.x * size;
        const scaledY = v.y * size;
        const scaledZ = v.z * size;

        // Perspective projection
        const x = (scaledX * focalLength) / (scaledZ + focalLength) + centerX;
        const y = (scaledY * focalLength) / (scaledZ + focalLength) + centerY;

        return { x, y };
    });

    return projectedVertices;
}

const faces = [
        [0, 1, 2, 3],  // Front face
        [1, 5, 6, 2],  // Right face
        [5, 4, 7, 6],  // Back face
        [4, 0, 3, 7],  // Left face
        [3, 2, 6, 7],  // Top face
        [4, 5, 1, 0]   // Bottom face
    ];

function calculateFaceVisibility(vertices) {

    // Calculate face normals
    function calculateNormal(face) {
        const v1 = {
            x: vertices[face[1]].x - vertices[face[0]].x,
            y: vertices[face[1]].y - vertices[face[0]].y,
            z: vertices[face[1]].z - vertices[face[0]].z
        };
        const v2 = {
            x: vertices[face[2]].x - vertices[face[0]].x,
            y: vertices[face[2]].y - vertices[face[0]].y,
            z: vertices[face[2]].z - vertices[face[0]].z
        };

        // Cross product to get normal
        return {
            x: v1.y * v2.z - v1.z * v2.y,
            y: v1.z * v2.x - v1.x * v2.z,
            z: v1.x * v2.y - v1.y * v2.x
        };
    }

    // Determine if face is visible (facing towards viewer)
    const viewVector = { x: 0, y: 0, z: -1 }; // Simplified view direction
    
    return faces.map(face => {
        const normal = calculateNormal(face);
        
        // Dot product determines visibility
        const dotProduct = 
            normal.x * viewVector.x + 
            normal.y * viewVector.y + 
            normal.z * viewVector.z;
        
        return dotProduct > 0;
    });
}

// Example usage
const vertices = [
    { x: -1, y: -1, z: -1 },
    { x:  1, y: -1, z: -1 },
    { x:  1, y:  1, z: -1 },
    { x: -1, y:  1, z: -1 },
    { x: -1, y: -1, z:  1 },
    { x:  1, y: -1, z:  1 },
    { x:  1, y:  1, z:  1 },
    { x: -1, y:  1, z:  1 }
];

let rotateX = $state(0)
let rotateY = $state(0)
let rotateZ = $state(0)

const rotatedVertices = $derived(rotateCube(
    vertices, 
    rotateX,
    rotateY,
    rotateZ
    // Math.PI/4,  // X rotation 
    // Math.PI/4,  // Y rotation
    // Math.PI/4   // Z rotation
))

const visibleFaces = calculateFaceVisibility(rotatedVertices);
let projectedCube = $derived(projectCube(rotatedVertices))
console.log(visibleFaces, projectedCube); // Array of boolean values

function faceToPath(face, cube){
  const [p0, p1, p2, p3] = face
  return `M ${cube[p0].x} ${cube[p0].y}
   L ${cube[p1].x} ${cube[p1].y}
   L ${cube[p2].x} ${cube[p2].y}
   L ${cube[p3].x} ${cube[p3].y}
   `
}

let dragging = $state(false)
let mouseX = null
let mouseY = null
const startDrag = (e) => {
  mouseX = e.screenX
  mouseY = e.screenY
  dragging = true
}
const moveDrag = (e) => {
  if (!dragging) return
  let deltaX = mouseX - e.screenX
  let deltaY = mouseY - e.screenY
  const sensitivity = 0.01
  rotateX = -deltaY * sensitivity; // Rotation around X-axis (pitch)
  rotateY = -deltaX * sensitivity; // Rotation around Y-axis (yaw)
  // the more you drag X, the more x rotation you get
}
const endDrag = (e) => {
  dragging = false
}

</script>

<svelte:window onmousedown={startDrag} onmousemove={moveDrag} onmouseup={endDrag}></svelte:window>
<svg width="100%" height="1000px">
  {#each faces as face}
    {@const d = faceToPath(face, projectedCube)}
    <path {d} fill="none" stroke="black"></path>
  {/each}
</svg>

