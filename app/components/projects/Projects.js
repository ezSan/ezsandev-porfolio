import React, { useState, useEffect } from "react";
import styles from "../../scss/globals.module.scss";
import ProjectCard from "./ProjectCard";
import proyectos from "../../../app/proyects.json";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const { projects, styledProjectsContainer, title } = styles;

const arrProy = proyectos.proyects;

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const [arrPro, setProyectos] = useState(arrProy);

  return (
    <section className={projects} id="projects">
      <h3 className={title}>PROYECTOS</h3>
      <div className={styledProjectsContainer} ref={ref}>
        {arrPro.map((py, index) => {
          return (
            <div key={index}>
              <AnimatePresence>
                <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                  exit={{ opacity: 0, y: -50 }}
                >
                  <ProjectCard
                    image={py.image}
                    nombre={py.nombre}
                    desc={py.desc}
                    github={py.github}
                    deploy={py.deploy}
                    tecnologias={[py.tecnologias]}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
