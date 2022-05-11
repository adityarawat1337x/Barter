import React from "react"
import { motion } from "framer-motion"

const AnimatedRouteWrapper = (props) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-10vw",
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      zIndex: 1000,
      x: "10vw",
    },
  }

  const pageTransition = {
    ease: "easeOut",
    type: "tween",
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {props.children}
    </motion.div>
  )
}

export default AnimatedRouteWrapper
