type CubicBezier = [number, number, number, number];

const ease: CubicBezier = [0.4, 0, 0.2, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export const fadeInScale = {
  hidden: { opacity: 0, y: Math.round(20 * 0.8), scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -Math.round(20 * 0.4) },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.36, ease },
  },
};

export const sectionVariants = {
  hidden: { opacity: 0, y: Math.round(20 * 0.8) },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};
