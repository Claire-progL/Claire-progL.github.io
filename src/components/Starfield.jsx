import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 1. 生成发光点贴图
const createGlowTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
};

// 3. 动态处理图片：极致的边缘渐变处理，实现与深空背景的无缝消融
const createSeamlessNebulaTexture = (imageSrc, callback) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imageSrc;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    
    // 遍历像素，将暗部和边缘以更高幂次（5.0）衰减，实现完美融入深空
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
      
      let alpha = brightness / 255;
      alpha = Math.pow(alpha, 5.0); 
      
      data[i + 3] = alpha * 255;
    }
    
    ctx.putImageData(imgData, 0, 0);
    texture.image = canvas;
    texture.needsUpdate = true;
    if (callback) callback(texture);
  };

  return texture;
};

const Starfield = ({ count = 3500 }) => {
  const starsRef = useRef();
  const farStarsRef = useRef();
  const andromedaRef = useRef();
  const eagleDustRef = useRef();
  const earthRef = useRef();
  const cloudsRef = useRef();
  const moonRef = useRef();

  // 加载标准贴图（地球直接对应 public/earth.jpg，即您的指定路径）
  const [
    earthMap,
    earthNormalMap,
    earthSpecularMap,
    earthCloudsMap,
    moonMap
  ] = useTexture([
    '/earth.jpg', 
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_normal_2048.jpg', 
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg', 
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png', 
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/moon_1024.jpg'
  ]);

  earthMap.colorSpace = THREE.SRGBColorSpace;
  moonMap.colorSpace = THREE.SRGBColorSpace;

  const glowTexture = useMemo(() => createGlowTexture(), []);
  
  const seamlessPillarsMap = useMemo(() => createSeamlessNebulaTexture('/pillars.jpg'), []);

  // 满天繁星
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 180 + Math.random() * 650;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      sizes[i] = 1.0 + Math.random() * 2.0;
    }
    return { positions, sizes };
  }, [count]);

  const farPositions = useMemo(() => {
    const arr = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      const radius = 550 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  // 仙女座星系
  const { galaxyPositions, galaxyColors, galaxySizes } = useMemo(() => {
    const particleCount = 15000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorInside = new THREE.Color('#ffedd5'); 
    const colorOutside = new THREE.Color('#3b82f6'); 
    const colorDust = new THREE.Color('#ec4899');

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 180; 
      const spinAngle = radius * 0.04;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2; 

      const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 0.4 * radius;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.2 * (180 - radius); 
      const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 0.4 * radius;

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 180);
      if (Math.random() > 0.8) mixedColor.lerp(colorDust, Math.random());

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
      sizes[i] = (Math.random() * 3.5 + 1.0) * (1 - radius / 180 * 0.5);
    }
    return { galaxyPositions: positions, galaxyColors: colors, galaxySizes: sizes };
  }, []);

  // 创世之柱周边的 3D 伴生气体尘埃
  const { eagleDustPositions, eagleDustColors, eagleDustSizes } = useMemo(() => {
    const particleCount = 22000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const c1 = new THREE.Color('#0d9488'); // 幽蓝
    const c2 = new THREE.Color('#eab308'); // 亮金
    const c3 = new THREE.Color('#7f1d1d'); // 暗红

    for (let i = 0; i < particleCount; i++) {
      const r = Math.cbrt(Math.random()) * 350; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 1.6; 
      const z = r * Math.cos(phi); 

      const mixColor = c1.clone();
      if (z > 30) mixColor.lerp(c2, Math.random()); 
      else if (z < -30) mixColor.lerp(c3, Math.random()); 
      else mixColor.lerp(c1, Math.random()); 

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
      sizes[i] = Math.random() * 12 + 2.0;
    }
    return { eagleDustPositions: positions, eagleDustColors: colors, eagleDustSizes: sizes };
  }, []);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.005;
      starsRef.current.rotation.x += delta * 0.001;
    }
    if (farStarsRef.current) {
      farStarsRef.current.rotation.y -= delta * 0.002;
    }
    if (andromedaRef.current) {
      andromedaRef.current.rotation.y += delta * 0.01;
    }
    if (eagleDustRef.current) {
      eagleDustRef.current.rotation.y += delta * 0.0015; 
    }
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.05;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.06;
    if (moonRef.current) {
      const time = _.clock.getElapsedTime();
      moonRef.current.position.x = Math.sin(time * 0.3) * 12;
      moonRef.current.position.z = Math.cos(time * 0.3) * 12;
      moonRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.1} />
      <directionalLight position={[40, 10, 20]} intensity={3.5} color="#fffcf8" />
      <pointLight position={[-30, -10, -20]} intensity={0.5} color="#4c1d95" />

      {/* 圆形发光星点 */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={glowTexture} color="#dce7ff" size={1.8} sizeAttenuation={true} transparent={true} opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <points ref={farStarsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[farPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={glowTexture} color="#899cff" size={1.2} sizeAttenuation={true} transparent={true} opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      {/* 仙女座星系 */}
      <group position={[-90, 50, -200]} rotation={[1.2, 0.2, 0.4]} ref={andromedaRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[galaxyPositions, 3]} />
            <bufferAttribute attach="attributes-color" args={[galaxyColors, 3]} />
            <bufferAttribute attach="attributes-size" args={[galaxySizes, 1]} />
          </bufferGeometry>
          <pointsMaterial 
            map={glowTexture} sizeAttenuation={true} transparent={true} 
            opacity={0.8} depthWrite={false} vertexColors={true} blending={THREE.AdditiveBlending} 
          />
        </points>
      </group>

      {/* ================= 极远景：移至对角线另一侧（左下方 -350, -80, -950）的创世之柱 ================= */}
      <group position={[-350, -80, -950]}>
        
        {/* 创世之柱主体：1000x1000 巨幅远景，opacity 保持 0.45 完美融入深空背景 */}
        <sprite scale={[1000, 1000, 1]} position={[0, 0, 0]}>
          <spriteMaterial 
            map={seamlessPillarsMap} 
            transparent={true} 
            opacity={0.45} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false} 
          />
        </sprite>

        {/* 3D 伴生气体粒子：强化对角深空的包围感 */}
        <points ref={eagleDustRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[eagleDustPositions, 3]} />
            <bufferAttribute attach="attributes-color" args={[eagleDustColors, 3]} />
            <bufferAttribute attach="attributes-size" args={[eagleDustSizes, 1]} />
          </bufferGeometry>
          <pointsMaterial 
            map={glowTexture} sizeAttenuation={true} transparent={true} 
            opacity={0.15} depthWrite={false} vertexColors={true} blending={THREE.AdditiveBlending} 
          />
        </points>

      </group>

      {/* ================= 近景：右侧的地球与月球（与左下角的创世之柱形成对角呼应） ================= */}
      <group position={[18, 8, -25]}>
        
        <mesh ref={earthRef} rotation={[0.2, 0, 0]}>
          <sphereGeometry args={[4, 64, 64]} />
          <meshPhongMaterial 
            map={earthMap}
            normalMap={earthNormalMap}
            specularMap={earthSpecularMap}
            specular={new THREE.Color('grey')}
            shininess={40} 
          />
        </mesh>

        <mesh rotation={[0.2, 0, 0]} scale={[1.04, 1.04, 1.04]}>
          <sphereGeometry args={[4, 64, 64]} />
          <meshBasicMaterial 
            color="#4ca6ff" 
            transparent={true} 
            opacity={0.25} 
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <mesh ref={cloudsRef} rotation={[0.2, 0, 0]} scale={[1.015, 1.015, 1.015]}>
          <sphereGeometry args={[4, 64, 64]} />
          <meshPhongMaterial 
            map={earthCloudsMap}
            transparent={true}
            opacity={0.9}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh ref={moonRef}>
          <sphereGeometry args={[1.1, 64, 64]} />
          <meshStandardMaterial 
            map={moonMap}
            roughness={0.9}
            metalness={0.0}
          />
        </mesh>

      </group>
    </group>
  );
};

export default Starfield;