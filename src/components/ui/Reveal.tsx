import React, { Children, isValidElement, cloneElement, ReactElement } from 'react';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  as?: React.ElementType;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  cascade?: boolean;
  cascadeStep?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 750,
  className = '',
  as: Component = 'div',
  threshold = 0.1,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
  cascade = false,
  cascadeStep = 90
}) => {
  const [ref, inView] = useInView<HTMLElement>({
    threshold,
    rootMargin,
    triggerOnce,
    initialInView: false
  });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>;
  }

  const getInitialTransform = (): string => {
    switch (direction) {
      case 'up':
        return 'translate3d(0, 28px, 0)';
      case 'down':
        return 'translate3d(0, -28px, 0)';
      case 'left':
        return 'translate3d(32px, 0, 0)';
      case 'right':
        return 'translate3d(-32px, 0, 0)';
      case 'scale':
        return 'scale(0.95)';
      case 'fade':
      default:
        return 'none';
    }
  };

  const getActiveTransform = (): string => {
    switch (direction) {
      case 'scale':
        return 'scale(1)';
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  // If cascade is requested on direct children
  if (cascade) {
    const childArray = Children.toArray(children);
    return (
      <Component ref={ref as any} className={className}>
        {childArray.map((child, index) => {
          if (!isValidElement(child)) return child;

          const itemDelay = delay + index * cascadeStep;
          const style: React.CSSProperties = prefersReduced
            ? (child.props.style || {})
            : {
                opacity: inView ? 1 : 0,
                transform: inView ? getActiveTransform() : getInitialTransform(),
                transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${itemDelay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${itemDelay}ms`,
                willChange: inView ? 'auto' : 'opacity, transform',
                ...(child.props.style || {})
              };

          return cloneElement(child as ReactElement, {
            style,
            className: child.props.className || ''
          });
        })}
      </Component>
    );
  }

  const style: React.CSSProperties = prefersReduced
    ? {}
    : {
        opacity: inView ? 1 : 0,
        transform: inView ? getActiveTransform() : getInitialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: inView ? 'auto' : 'opacity, transform'
      };

  return (
    <Component ref={ref as any} style={style} className={className}>
      {children}
    </Component>
  );
};
