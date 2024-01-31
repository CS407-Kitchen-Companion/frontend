import { CSSProperties } from 'react'
import { Linear, EasingOptions } from './Easing'

interface TransitionAnimationOptions {
  duration: number
  initialStyle?: CSSProperties
}

interface OpacityAnimationOptions extends TransitionAnimationOptions, EasingOptions {
  maxOpacity: number
}

export function opacityAnimation(options: OpacityAnimationOptions) {
  const { duration, maxOpacity, initialStyle = {}, enterEasing = Linear, leaveEasing = Linear } = options
  return {
    from: { opacity: 0, ...initialStyle },
    enter: { opacity: maxOpacity },
    leave: { opacity: 0 },
    config: (item: any, _: any, state: string) => {
      switch (state) {
        case 'enter':
          return { duration, easing: enterEasing }
        case 'leave':
          return { duration, easing: leaveEasing }
      }
    },
  }
}

interface BottomSlideAnimationOptions extends TransitionAnimationOptions, EasingOptions {}

export function bottomSlideAnimation(options: BottomSlideAnimationOptions) {
  const { duration, initialStyle = {}, enterEasing = Linear, leaveEasing = Linear } = options
  return {
    from: { transform: 'translateY(100%)', ...initialStyle },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(100%)' },
    config: (item: any, _: any, state: string) => {
      switch (state) {
        case 'enter':
          return { duration, easing: enterEasing }
        case 'leave':
          return { duration, easing: leaveEasing }
      }
    },
  }
}

interface OpacityBottomSlideAnimation extends TransitionAnimationOptions, EasingOptions {
  maxOpacity: number
}

export function opacityBottomSlideAnimation(options: OpacityBottomSlideAnimation) {
  const { duration, maxOpacity, initialStyle = {}, enterEasing = Linear, leaveEasing = Linear } = options
  return {
    from: { transform: 'translateY(100%)', opacity: 0, ...initialStyle },
    enter: { transform: 'translateY(0%)', opacity: maxOpacity },
    leave: { transform: 'translateY(100%)', opacity: 0 },
    config: (item: any, _: any, state: string) => {
      switch (state) {
        case 'enter':
          return { duration, easing: enterEasing }
        case 'leave':
          return { duration, easing: leaveEasing }
      }
    },
  }
}

interface ScaleAnimationOptions extends TransitionAnimationOptions, EasingOptions {}

export function scaleAnimation(options: ScaleAnimationOptions) {
  const { duration, initialStyle = {}, enterEasing = Linear, leaveEasing = Linear } = options
  return {
    from: { transform: 'scale(0)', ...initialStyle },
    enter: { transform: 'scale(1)' },
    leave: { transform: 'scale(0)' },
    config: (item: any, _: any, state: string) => {
      switch (state) {
        case 'enter':
          return { duration, easing: enterEasing }
        case 'leave':
          return { duration, easing: leaveEasing }
      }
    },
  }
}

export type TransitionAnimationTypes = ReturnType<typeof opacityAnimation> | ReturnType<typeof bottomSlideAnimation>
