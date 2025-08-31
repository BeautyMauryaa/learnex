import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  animation?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fadeIn' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = ''
}) => {
  const getAnimationVariants = () => {
    switch (animation) {
      case 'slideUp':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 }
        };
      case 'slideDown':
        return {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 }
        };
      case 'slideLeft':
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 }
        };
      case 'slideRight':
        return {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;