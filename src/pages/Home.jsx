// src/pages/Home.jsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useTranslation } from 'react-i18next';
//import ParticlesCityReal from '../components/ParticlesCityReal';
import Starfield from '../components/Starfield';
import { BlurFade } from '../components/BlurFade';
import { InteractiveHoverButton } from '../components/InteractiveHoverButton';
import TrueFocus from '../components/TrueFocus';

const Home = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      {/* --- WebGL Layer (底层) --- */}
      
<div className="canvas-container">
  <Canvas dpr={[1, 1.5]}>
    <color attach="background" args={['#02030d']} />

    <Suspense fallback={null}>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 10]}
        fov={65}
      />

      <Starfield count={3500} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.08}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 3 / 4}
        target={[0, 0, 0]}
      />
    </Suspense>
  </Canvas>
</div>


      {/* --- HTML Layer (上层覆盖) --- */}
      <div className="hero-overlay">
        <div className="hero-content">
          <TrueFocus
            sentence={t('home.greeting')}
            separator="|"
            manualMode={false}
            blurAmount={5}
            borderColor="#ffffff"
            glowColor="rgba(165, 180, 252, 0.6)"
            textColor="#a5b4fc"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />

          <BlurFade delay={0.5} inView>
            <p className="subtitle" style={{marginTop: '1.5rem'}}>
              {t('home.subtitle')} <br/>
              {t('home.description')} <br/>
              {t('home.description2')} <br/>
              {t('home.description3')}
            </p>
          </BlurFade>

          <BlurFade delay={0.75} inView>
            <div style={{marginTop: '2rem'}}>
               <InteractiveHoverButton onClick={() => onNavigate?.(1)}>
                   {t('home.button')}
               </InteractiveHoverButton>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

export default Home;