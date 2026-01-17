'use client'
import * as React from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  duration?: number        // duration per letter
  delay?: number           // stagger delay per letter
  repeatDelay?: number     // delay before repeating animation
  className?: string
  textClassName?: string
  underlineClassName?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  underlineGradient?: string
  underlineHeight?: string
  underlineOffset?: string
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  ({
    text,
    duration = 0.05,      
    delay = 0.05,         
    repeatDelay = 5,     
    className,
    textClassName,
    underlineClassName,
    as: Component = "h1",
    underlineGradient = "from-blue-300 via-purple-300 to-pink-300",
    underlineHeight = "h-1",
    underlineOffset = "-bottom-2",
    ...props
  }, ref) => {
    const letters = Array.from(text)

    // motion component for dynamic tag
    const MotionComponent = motion[Component] as unknown as typeof motion.div

    // child variants for letters
    const child: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }

    // container variants for staggering letters
    const container: Variants = {
      hidden: {},
      visible: { transition: { staggerChildren: delay } }
    }

    // Underline animation
    const lineVariants: Variants = {
      hidden: { width: "0%", left: "50%" },
      visible: {
        width: "100%",
        left: "0%",
        transition: {
          duration: letters.length * delay + 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: repeatDelay
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-2", className)}
        {...props}
      >
        <div className="relative">
          <MotionComponent
            style={{ display: "flex", overflow: "hidden" }}
            initial="hidden"
            animate="visible"
            variants={container}
            className={cn("text-4xl font-bold text-center flex flex-wrap", textClassName)}
          >
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                variants={child}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  delay: index * delay
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </MotionComponent>

          {/* Underline animation */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "absolute",
              underlineHeight,
              underlineOffset,
              "bg-gradient-to-r",
              underlineGradient,
              underlineClassName
            )}
          />
        </div>
      </div>
    )
  }
)

AnimatedText.displayName = "AnimatedText"
export { AnimatedText }
