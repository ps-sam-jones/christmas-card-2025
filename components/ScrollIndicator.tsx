import { motion } from 'framer-motion';

export const ScrollIndicator = () => {
  const duration = 3;
  const lineHeight = 70;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 2 }}
      className="h-[100px] flex flex-col items-center gap-2"
    >
      <motion.span
        className="text-white font-bold text-sm"
        initial={{ y: 0 }}
        animate={{ y: [0, lineHeight, lineHeight, 0, 0], opacity: [1, 1, 0, 0, 0, 1] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 0.6, 0.7, 0.85],
          delay: 2.5,
        }}
      >
        SCROLL
      </motion.span>
      <motion.span
        className="w-0.5 bg-[#F5B40C]"
        style={{ height: lineHeight, originY: 1 }}
        animate={{ scaleY: [1, 0, 0, 1, 1], opacity: [1, 1, 0, 0, 1] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 0.6, 0.7, 0.85],
          delay: 2.5,
        }}
      />
    </motion.div>
  );
};
