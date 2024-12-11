import { cn } from '../../lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export function ResponsiveGrid({ 
  children, 
  className,
  columns = { default: 1, sm: 2, md: 3, lg: 4 }
}: ResponsiveGridProps) {
  return (
    <div className={cn(
      "grid gap-4",
      `grid-cols-${columns.default}`,
      columns.sm && `sm:grid-cols-${columns.sm}`,
      columns.md && `md:grid-cols-${columns.md}`,
      columns.lg && `lg:grid-cols-${columns.lg}`,
      className
    )}>
      {children}
    </div>
  );
}