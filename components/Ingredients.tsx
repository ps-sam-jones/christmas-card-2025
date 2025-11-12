'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
const images = [
  // Gravy
  {
    src: 'ingredients/gravy_2.webp',
    className: 'w-[50%] right-[55%] top-[13%] absolute rotate-[0deg]',
    type: 'gravy',
  },
  {
    src: 'ingredients/gravy_3.webp',
    className: 'w-[50%] right-[0%] top-[3%] absolute rotate-[0deg]',
    type: 'gravy',
  },
  {
    src: 'ingredients/gravy_1.webp',
    className: 'w-[80%] right-[28%] top-[48%] absolute rotate-[-10deg]',
    type: 'gravy',
  },

  // Turkey
  {
    src: 'ingredients/turkey_1.webp',
    className: 'rotate-[45deg] w-[50%] top-[20%] absolute',
    type: 'turkey',
  },
  {
    src: 'ingredients/turkey_1.webp',
    className: 'rotate-[180deg] w-[40%] left-[13%] bottom-[7%] absolute',
    type: 'turkey',
  },
  {
    src: 'ingredients/turkey_1.webp',
    className: 'top-[25%] w-[40%] right-[18%] absolute rotate-[-20deg]',
    type: 'turkey',
  },
  {
    src: 'ingredients/turkey_2.webp',
    className: 'w-[50%] right-[5%] bottom-[11%] absolute rotate-[-40deg]',
    type: 'turkey',
  },

  // Sprout
  {
    src: 'ingredients/sprout_3.webp',
    className: 'w-[45%] left-[67%] top-[7%] absolute rotate-[90deg]',
    type: 'sprout',
  },
  {
    src: 'ingredients/sprout_1.webp',
    className: 'w-[50%] left-[2%] top-[37%] absolute rotate-[25deg]',
    type: 'sprout',
  },
  {
    src: 'ingredients/sprout_1.webp',
    className: 'w-[10%] left-[40%] bottom-[10%] absolute rotate-[290deg]',
    type: 'sprout',
  },
  {
    src: 'ingredients/sprout_2.webp',
    className: 'w-[17%] left-[43%] bottom-[2%] absolute rotate-[90deg]',
    type: 'sprout',
  },

  // Potato
  {
    src: 'ingredients/potato_1.webp',
    className: 'w-[15%] left-[46%] top-[8%] absolute rotate-[94deg]',
    type: 'potato',
  },
  {
    src: 'ingredients/potato_1.webp',
    className: 'w-[20%] left-[0%] top-[60%] absolute rotate-[-20deg]',
    type: 'potato',
  },
  {
    src: 'ingredients/potato_2.webp',
    className: 'w-[32%] right-[2%] top-[39%] absolute rotate-[-20deg]',
    type: 'potato',
  },
  {
    src: 'ingredients/potato_3.webp',
    className: 'w-[34%] left-[24%] top-[11%] absolute rotate-[40deg]',
    type: 'potato',
  },
];

const textBlocks = [
  {
    id: 'turkey_text',
    title: 'Lavish bronze essence',
    desc: 'Golden, radiant and carved to perfection',
    type: 'turkey',
  },
  {
    id: 'sprout_text',
    title: 'Green silk infusion',
    desc: 'Bold, earthy freshness that awakens the senses',
    type: 'sprout',
  },
  {
    id: 'gravy_text',
    title: 'Velvet jus absolute',
    desc: 'Rich, dark and utterly consuming',
    type: 'gravy',
  },
  {
    id: 'potato_text',
    title: 'Honeyed starch symphony',
    desc: 'Luxuriously layered with hints of oil and satisfaction',
    type: 'potato',
  },
];

export const Ingredients = () => {
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 text-white px-16 xl:px-0 max-w-[1200px] py-8 xl:py-16 gap-6 font-gotham w-full">
      {/* Left column */}
      <div className="flex flex-col gap-8 xl:gap-[140px] order-2 xl:order-1">
        {textBlocks
          .filter((t) => ['turkey', 'sprout'].includes(t.type))
          .map((t) => (
            <motion.div
              key={t.id}
              onMouseEnter={() => setHoveredType(t.type)} // set hovered type
              className={`${t.type}_text transition-opacity duration-300 cursor-pointer`}
              animate={{
                opacity: hoveredType && hoveredType !== t.type ? 0.3 : 1,
              }}
            >
              <h3 className="font-cofo leading-[100%] text-3xl xl:text-[40px]">{t.title}</h3>
              <p className="text-sm xl:text-base">{t.desc}</p>
            </motion.div>
          ))}
      </div>

      {/* Center images */}
      <div
        className="md:col-span-2 xl:h-[70vh] relative flex items-center justify-center order-1 xl:order-2"
        onMouseLeave={() => setHoveredType(null)} // handle mouse leave globally
      >
        <div className="relative w-full z-20 aspect-square">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img.src}
              className={`${img.className} absolute transition duration-600 ${!hoveredType || hoveredType === img.type ? 'opacity-100! scale-[1]' : 'opacity-20! scale-[0.9]'}`}
              initial={{ opacity: 0, scale: 0, x: '50%', y: '-50%' }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
              onMouseEnter={() => setHoveredType(img.type)} // set hovered type
            />
          ))}
        </div>

        <img src={'bottle.png'} alt="Slej de Procteurs Bottle" className="absolute z-30 w-[50%]" />
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-8 xl:gap-[140px] order-3">
        {textBlocks
          .filter((t) => ['potato', 'gravy'].includes(t.type))
          .map((t) => (
            <motion.div
              key={t.id}
              onMouseEnter={() => setHoveredType(t.type)} // set hovered type
              className={`${t.type}_text transition-opacity duration-300 cursor-pointer`}
              animate={{
                opacity: hoveredType && hoveredType !== t.type ? 0.3 : 1,
              }}
            >
              <h3 className="font-cofo leading-[100%] text-3xl xl:text-[40px]">{t.title}</h3>
              <p className="text-sm xl:text-base">{t.desc}</p>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

// import { motion, useScroll, useTransform } from 'framer-motion';

// export const Ingredients = () => {
//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-4 text-white max-w-[1200px] py-16 gap-6 font-gotham w-full">
//       <div className="flex justify-center flex-col gap-[140px]">
//         <div className="turkey_text">
//           <h3 className="font-cofo leading-[100%] text-[40px]">Lavish bronze essence</h3>
//           <p>Golden, radiant and carved to perfection</p>
//         </div>
//         <div className="sprout_text">
//           <h3 className="font-cofo leading-[100%]  text-[40px]">Green silk infusion</h3>
//           <p>Bold, earthy freshness that awakens the senses</p>
//         </div>
//       </div>
//       <div className="col-span-2 h-[70vh] relative flex items-center justify-center">
//         <div className="relative size-full z-20">
//           <motion.img
//             src={'ingredients/gravy_2.webp'}
//             className=" w-[50%] right-[55%] top-[13%] absolute rotate-[0deg] "
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/gravy_3.webp'}
//             className=" w-[50%] right-[0%] top-[3%] absolute rotate-[0deg] "
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/gravy_1.webp'}
//             className=" w-[80%] right-[28%] top-[48%] absolute rotate-[-10deg] "
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/turkey_1.webp'}
//             className="rotate-[45deg] w-[50%] top-[20%] absolute"
//             initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut' }}
//           />
//           <motion.img
//             src={'ingredients/turkey_1.webp'}
//             className="rotate-[180deg] w-[40%] left-[13%] bottom-[7%] absolute"
//             initial={{ opacity: 0, scale: 0, x: '50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
//           />
//           <motion.img
//             src={'ingredients/turkey_1.webp'}
//             className="top-[25%] w-[40%] right-[18%] absolute rotate-[-20deg]"
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//           />
//           <motion.img
//             src={'ingredients/turkey_2.webp'}
//             className=" w-[50%] right-[5%] bottom-[11%] absolute rotate-[-40deg]"
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/sprout_3.webp'}
//             className=" w-[45%] left-[67%] top-[7%] absolute rotate-[90deg]"
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/sprout_1.webp'}
//             className=" w-[50%] left-[2%] top-[37%] absolute rotate-[25deg]"
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/sprout_1.webp'}
//             className=" w-[10%] left-[40%] bottom-[10%] absolute rotate-[290deg]"
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/sprout_2.webp'}
//             className=" w-[17%] left-[43%] bottom-[2%] absolute rotate-[90deg]"
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/potato_1.webp'}
//             className=" w-[15%] left-[46%] top-[8%] absolute rotate-[94deg]"
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/potato_1.webp'}
//             className=" w-[20%] left-[0%] top-[60%] absolute rotate-[-20deg]"
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/potato_2.webp'}
//             className=" w-[32%] right-[2%] top-[39%] absolute rotate-[-20deg]"
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//           <motion.img
//             src={'ingredients/potato_3.webp'}
//             className=" w-[34%] left-[24%] top-[11%] absolute rotate-[40deg] "
//             initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%' }}
//             whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
//           />
//         </div>
//         <img src={'bottle.png'} alt="Slej de Procteurs Bottle" className="absolute z-30 w-[60%]" />
//       </div>
//       <div className="flex justify-center flex-col gap-[140px]">
//         <div id="potato_text">
//           <h3 className="font-cofo leading-[100%]  text-[40px]">Honeyed starch symphony</h3>
//           <p>Luxuriously layered with hints of oil and satisfaction</p>
//         </div>
//         <div className="gravy_text">
//           <h3 className="font-cofo leading-[100%] text-[40px]">Velvet jus absolute</h3>
//           <p>Rich, dark and utterly consuming</p>
//         </div>
//       </div>
//     </div>
//   );
// };
