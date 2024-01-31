import { CSSProperties } from 'react'
import { EasingFunction } from 'react-spring'
import { Linear, EasingOptions } from './Easing'

interface SpringAnimationOptions {
  duration: number
  active: boolean
  initialStyle?: CSSProperties
  delay?: number
}

interface HeightIncreaseAnimationOptions extends SpringAnimationOptions, EasingOptions {
  height: number
}

export function heightIncreaseAnimation(options: HeightIncreaseAnimationOptions) {
  const { height, duration, active, initialStyle = {}, delay = 0, enterEasing = Linear, leaveEasing = Linear } = options
  return {
    from: { height: 0, ...initialStyle },
    to: { height: active ? height : 0 },
    delay,
    config: { duration, easing: active ? leaveEasing : enterEasing },
  }
}

interface NumberIncreaseAnimationOptions extends SpringAnimationOptions, EasingOptions {
  maxNumber: number
}

export function numberIncreaseAnimation(options: NumberIncreaseAnimationOptions) {
  const {
    duration,
    active,
    initialStyle = {},
    delay = 0,
    maxNumber,
    enterEasing = Linear,
    leaveEasing = Linear,
  } = options
  return {
    from: { num: 0, ...initialStyle },
    to: { num: active ? maxNumber : 0 },
    delay,
    config: { duration, easing: active ? leaveEasing : enterEasing },
  }
}

interface leftSlideAnimationOptions extends SpringAnimationOptions, EasingOptions {
  left: number
}

export function leftSlideAnimation(options: leftSlideAnimationOptions) {
  const { left, duration, active, initialStyle = {}, delay = 0, enterEasing = Linear, leaveEasing = Linear } = options
  return {
    from: { left: -left, ...initialStyle },
    left: active ? 0 : -left,
    delay,
    config: { duration, easing: active ? enterEasing : leaveEasing },
  }
}

interface opacityLoopAnimationOptions extends Omit<SpringAnimationOptions, 'active'>, EasingOptions {
  maxOpacity?: number
  easing?: EasingFunction
}

export function opacityLoopAnimation(options: opacityLoopAnimationOptions) {
  const { maxOpacity = 1, duration, initialStyle = {}, delay = 0, easing = Linear } = options
  return {
    from: { opacity: 0, ...initialStyle },
    to: { opacity: maxOpacity },
    delay,
    config: { duration, easing },
    loop: { reverse: true },
  }
}

export type SpringAnimationTypes =
  | ReturnType<typeof heightIncreaseAnimation>
  | ReturnType<typeof numberIncreaseAnimation>
  | ReturnType<typeof leftSlideAnimation>
  | ReturnType<typeof opacityLoopAnimation>
