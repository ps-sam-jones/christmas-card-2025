import { motion } from 'framer-motion';
export const ScrollIndicator = () => {
  const duration = 3;
  const lineHeight = 70;
  return (
    <div className="h-[100px] flex flex-col items-center gap-2">
      {' '}
      <motion.span
        className="text-white font-bold text-sm"
        animate={{ y: [0, lineHeight, lineHeight, 0, 0], opacity: [1, 1, 0, 0, 0, 1] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 0.6, 0.7, 0.85],
        }}
      >
        {' '}
        SCROLL{' '}
      </motion.span>{' '}
      <motion.span
        className="w-0.5 bg-[#F5B40C]"
        style={{ height: lineHeight, originY: 1 }}
        animate={{ scaleY: [1, 0, 0, 1, 1], opacity: [1, 1, 0, 0, 1] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.5, 0.6, 0.7, 0.85],
        }}
      />{' '}
    </div>
  );
};
