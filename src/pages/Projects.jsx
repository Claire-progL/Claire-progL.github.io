// src/pages/Publications.jsx
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { BlurFade } from '../components/BlurFade';
import { getPublicationImage } from '../data/publicationImages';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(null);
  const projects = t('projects.items',{ returnObjects: true });
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useOutsideClick(modalRef, () => setActiveId(null));

  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setActiveId(null);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeId]);

const activePub = useMemo(
    () => projects.find((_, index) => index === activeId),
    [projects, activeId]
  );

  const abstractPreviews = useMemo(
    () => Object.fromEntries(projects.map((pub, index) => [index, pub.description ? pub.description.substring(0, 120) : ''])),
    [projects]
  );

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="page-title">
          <BlurFade delay={0.1} inView>
            {t('projects.title')}
          </BlurFade>
        </h1>

        <div className="projects-grid">
          {projects.map((pub, index) => (
            <motion.div
              key={index}
              layoutId={`card-${index}`}
              onClick={() => setActiveId(index)}
              className="pub-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
            <div className="pub-card-content">


                <motion.h2 layoutId={`title-${index}`} className="pub-title">
                  {pub.title}
                </motion.h2>


                <p className="pub-abstract-preview">
                  {abstractPreviews[index]}...
                </p>
                  
                <div className="pub-footer">
                  <div className="pub-tags">
                    {pub.tags?.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
            </div>

              {/* 右侧一列：期刊名 / 配图 / PDF 链接，统一贴右对齐 */}
              <div className="pub-card-aside">

                {getPublicationImage(index) ? (
                  <motion.div layoutId={`image-${index}`} className="pub-card-image">
                    <img
                      src={getPublicationImage(index, 700)}
                      alt={pub.title}
                      loading="lazy"
                    />
                  </motion.div>
                ) : (
                  <div className="pub-card-image pub-card-image-placeholder" aria-hidden="true">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  </div>
                )}

                {index === 4 && (
                  <a
                    href="https://github.com/Claire-progL/Geospatial-Accuracy-Assessment-Toolkit"
                    className="pub-link-compact"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    → GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Modal */}
        <AnimatePresence>
          {activeId !== null && activePub && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="modal-backdrop"
                onClick={() => setActiveId(null)}
              />

              {/* Modal Content */}
              <div className="modal-container">
                <motion.div
                  ref={modalRef}
                  layoutId={`card-${activeId}`}
                  className="modal-content"
                >
                  {/* Close Button */}
                  <button
                    className="modal-close"
                    onClick={() => setActiveId(null)}
                    aria-label="Close"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>



                  <motion.h2
                    layoutId={`title-${activeId}`}
                    className="pub-title"
                  >
                    {activePub.title}
                  </motion.h2>



                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="modal-body"
                  >

                    <p className="pub-abstract-full">{activePub.description}</p>

                    {getPublicationImage(activeId) && (
                      <motion.figure
                        layoutId={`image-${activeId}`}
                        className="modal-image-bottom"
                      >
                        <img
                          src={getPublicationImage(activeId, 1200)}
                          alt={activePub.title}
                        />
                      </motion.figure>
                    )}

                    <div className="pub-footer">
                      <div className="pub-tags">
                        {activePub.tags?.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
          
                     {activeId === 4 && (
                        <a
                          href="https://github.com/Claire-progL/Geospatial-Accuracy-Assessment-Toolkit"
                          className="pub-link-button"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          → GitHub Repository
                        </a>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
