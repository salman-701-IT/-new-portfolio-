import React from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  id?: string;
}

const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(
  ({ as: Comp = 'section', className, id, children, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        id={id}
        className={cn('container mx-auto px-4 md:px-8', className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SectionContainer.displayName = 'SectionContainer';

export default SectionContainer;
