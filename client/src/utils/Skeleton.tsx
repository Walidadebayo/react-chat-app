import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonProps {
  count?  : number;
  duration?: number;
  width?: number | string;
  height?: number | string;
  wrapper?: React.FunctionComponent<{ children?: React.ReactNode }>;
  circle?: boolean;
  containerClassName?: string;
  className?: string;
}

function SkeletonLoader({ count = 1, duration, width, height, wrapper, circle, containerClassName, className }: SkeletonProps) {
  return <Skeleton count={count} duration={duration} width={width} height={height} wrapper={wrapper} circle={circle} containerClassName={containerClassName} className={className} />;
}

export default memo(SkeletonLoader);
