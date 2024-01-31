import bezier from 'bezier-easing'

export interface EasingOptions {
  enterEasing?: bezier.EasingFunction
  leaveEasing?: bezier.EasingFunction
}

export const Linear = bezier(0, 0, 1, 1)

export const EaseOutCubic = bezier(0.33, 1, 0.68, 1)

export const EaseInCubic = bezier(0.32, 0, 0.67, 0)

export const EaseInOutCubic = bezier(0.65, 0, 0.35, 1)

export const EaseOutQuint = bezier(0.22, 1, 0.36, 1)
