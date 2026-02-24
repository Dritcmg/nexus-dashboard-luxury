import { motion } from 'framer-motion';

export const PerformanceSkeleton = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6 w-full pointer-events-none"
    >
        <div className="h-[200px] rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
        <div className="h-64 rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="h-[400px] rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
            <div className="grid grid-cols-2 gap-6">
                <div className="h-32 rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
                <div className="h-32 rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
                <div className="h-32 rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
                <div className="h-32 rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
            </div>
        </div>
    </motion.div>
);

export const BasicSkeleton = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6 w-full pointer-events-none"
    >
        <div className="h-40 rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
        <div className="h-40 rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
        <div className="h-40 rounded-lg bg-surface-card animate-pulse border border-surface-border"></div>
    </motion.div>
);
