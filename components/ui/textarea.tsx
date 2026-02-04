import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-lg border border-deep-charcoal/15 bg-soft-bone px-4 py-2.5 text-sm text-deep-charcoal placeholder:text-deep-charcoal/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold/25 focus-visible:ring-offset-2 focus-visible:border-muted-gold/30 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
