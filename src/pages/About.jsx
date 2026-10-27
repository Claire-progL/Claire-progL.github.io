// src/pages/About.jsx
import { useTranslation, Trans } from 'react-i18next';
import { Dock, DockIcon } from '../components/Dock';
import { PixelatedCanvas } from '../components/pixelated-canvas';
import { EncryptedText } from '../components/encrypted-text';
import { BlurFade } from '../components/BlurFade';
import { getCloudinaryUrl } from '../data/galleryData';

const personalPhoto = getCloudinaryUrl('myphoto', { width: 600, quality: 'auto' });

// Icon components
const Icons = {
  gitHub: (props) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  email: (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 6l-10 7L2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const About = () => {
  const { t } = useTranslation();
  const researchInterests = t('about.researchInterests', { returnObjects: true });

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">
          <BlurFade delay={0.1} inView>
            {t('about.title')}
          </BlurFade>
        </h1>

        {/* Introduction Section with Photo */}
        <section className="about-section about-with-photo">
          <div className="about-text-content">
            <p className="about-intro">
              <Trans i18nKey="about.intro" components={{ 1: <strong /> }} />
            </p>

            <p className="about-text">
              {t('about.paragraph1')}
            </p>

            <p className="about-text">
              {t('about.paragraph2')}
            </p>
          </div>

          <div className="about-photo-wrapper">
            <PixelatedCanvas
              src={personalPhoto}
              width={300}
              height={450}
              cellSize={3}
              dotScale={0.9}
              shape="square"
              backgroundColor="#000000"
              tintStrength={0}
              dropoutStrength={0.2}
              interactive={true}
              distortionStrength={3}
              distortionRadius={80}
              distortionMode="swirl"
              jitterStrength={4}
              jitterSpeed={4}
              sampleAverage
              responsive={true}
              className="pixelated-photo"
            />
          </div>
        </section>

        {/* Research Interests Section */}
        <section className="resume-section">
          <h2 className="section-title">
            <BlurFade delay={0.2} inView>
              {t('about.researchTitle')}
            </BlurFade>
          </h2>
          <div className="skills-list">
            {researchInterests.map((interest, index) => (
              <span key={index}>{interest}</span>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="resume-section">
          <h2 className="section-title">
            <BlurFade delay={0.3} inView>
              {t('about.contactTitle')}
            </BlurFade>
          </h2>
          <div className="contact-info">
            <p className="about-text">
              <EncryptedText
                text={t('about.contactText')}
                encryptedClassName="text-neutral-500"
                revealedClassName=""
                revealDelayMs={2}
                encryptSpeed={2}
              />
            </p>
            <Dock>
              <DockIcon className="bg-black/10 dark:bg-white/10" href="mailto:linsu8513@gmail.com" title="Email">
                <Icons.email className="size-full" />
              </DockIcon>
              <DockIcon className="bg-black/10 dark:bg-white/10" href="https://github.com/Claire-progL" title="GitHub">
                <Icons.gitHub className="size-full" />
              </DockIcon>
            </Dock>
          </div>
        </section>

        {/* Fun Fact */}
        <section className="about-section" style={{marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <p className="about-text" style={{fontStyle: 'italic', color: 'rgba(255,255,255,0.6)'}}>
            {t('about.quote')}
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
