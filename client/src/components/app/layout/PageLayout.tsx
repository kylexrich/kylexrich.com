import { motion } from 'framer-motion';
import React, { Fragment, ReactNode } from 'react';

type PageLayoutProps = {
    children: ReactNode;
};

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 }
};

const PageLayout = ({ children }: PageLayoutProps): React.JSX.Element => (
    <Fragment>
        <motion.main initial="hidden" animate="enter" exit="exit" variants={variants} transition={{ type: 'linear' }}>
            {children}
        </motion.main>
    </Fragment>
);

export default PageLayout;
