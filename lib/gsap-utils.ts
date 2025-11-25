import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const createScrollTrigger = (
  trigger: string | HTMLElement,
  animation: gsap.TweenVars,
  options?: ScrollTrigger.Vars,
) => {
  return gsap.to(trigger, {
    ...animation,
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
      ...options,
    },
  })
}

export const createParallax = (element: string | HTMLElement, speed = 0.5) => {
  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
    ease: "none",
  })
}

export const createStaggerAnimation = (elements: string, animation: gsap.TweenVars, stagger = 0.1) => {
  return gsap.from(elements, {
    ...animation,
    stagger,
    scrollTrigger: {
      trigger: elements,
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
    },
  })
}
