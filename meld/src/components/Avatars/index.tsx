import { useVoice } from '@humeai/voice-react';
import { useAvatars } from '@store/AvatarProvider';
import { cn } from '@utils/cn';
import { getFaceByEmotion } from '@utils/emotionFaces';
import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Avatars: FC = () => {
  const { avatars, activeAvatar } = useAvatars();
  const { fft } = useVoice();

  const averageFFT = fft.reduce((sum, value) => sum + value, 0) / fft.length;
  const activeScale = 0.75 + averageFFT * 1.25;
  const inactiveScale = 1;

  

  return (
    <div className="flex gap-32">
      {avatars.map(({ name, visual, prosody }, index) => {
        const isActive = activeAvatar === name;
        let topProsody = prosody ? Object.keys(prosody)[0] : 'Neutral';
        topProsody = !isActive ? 'Rest' : topProsody;
        const face = isActive ? getFaceByEmotion(topProsody) : getFaceByEmotion('Rest');
        // console.log('topProsody', topProsody);
        // console.log('topProsody', topProsody);

        
        return (
          <div
            key={`avatar-${index}`}
            className="flex flex-col gap-6 items-center justify-center"
          >
            <div
              className={cn(
                isActive ? 'opacity-90 scale-110' : 'opacity-50 scale-100',
                visual,
                'relative size-60 rounded-full transition-all z-20 flex items-center justify-center',
              )}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={topProsody}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  // style={{ alignContent: 'center'}}
                >
                  {face}{' '}
                </motion.div>
              </AnimatePresence>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: isActive ? activeScale : inactiveScale }}
                  transition={{ duration: 0.5 }}
                  className={cn('relative bg-inherit rounded-full opacity-20 size-60', visual)}
                ></motion.div>
              </div>
            </div>
            <div className={cn('text-xl font-bold text-center')}>{topProsody}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Avatars;
