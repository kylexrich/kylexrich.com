import {motion} from 'framer-motion';
import React from 'react';
import {PropsAndChildren} from '../../../util/types/PassThroughProps.ts';

interface MainLayoutProps extends PropsAndChildren {
    // empty
}

const MainLayout: React.FC<MainLayoutProps> = ({children, ...motionOverrideProps}) => {
    const mainVariants = {
        initial: {opacity: 0, x: -200, y: 0},
        enter: {opacity: 1, x: 0, y: 0},
        exit: {opacity: 0, x: 0, y: -100}
    };
    return (
        <motion.main
            initial="initial"
            animate="enter"
            exit="exit"
            variants={mainVariants}
            transition={{type: 'linear'}}
            {...motionOverrideProps}
        >
            {children}
        </motion.main>
    );
};

export default MainLayout;
