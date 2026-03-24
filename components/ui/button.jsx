import * as React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Link from "next/link"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, href, to, text, children, target, ...props }, ref) => {
  const Comp = asChild ? "span" : "button"
  
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F62F8] disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-200"
  
  const variants = {
    default: "bg-[#4F62F8] text-white shadow-md hover:bg-[#3D4FD8] hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-slate-200 bg-beige shadow-sm hover:bg-beige-light hover:text-black",
    secondary: "bg-slate-100 text-black shadow-sm hover:bg-slate-200",
    ghost: "hover:bg-slate-100 hover:text-black",
    link: "text-[#4F62F8] underline-offset-4 hover:underline",
  }
  
  const sizes = {
    default: "h-11 px-5 py-2",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-12 rounded-xl px-8 text-base",
    icon: "h-10 w-10",
  }
  
  const compClass = cn(baseStyles, variants[variant], sizes[size], className)
  
  const linkHref = href || to
  if (linkHref) {
    return (
      <Link href={linkHref} className={compClass} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} {...props}>
        {text || children}
      </Link>
    )
  }

  return (
    <Comp
      className={compClass}
      ref={ref}
      {...props}
    >
      {text || children}
    </Comp>
  )
})
Button.displayName = "Button"

export { Button }
