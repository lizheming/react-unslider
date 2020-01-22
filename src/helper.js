export function calcOffsetByActive(activeIndex, length, {
  width, 
  height, 
  spaceBetween,
  loop, 
  animation
}) {
  const base = (animation === 'vertical' ? height : width) + spaceBetween;
  const max = 0;
  const min = (loop ? length + 1 : length - 1) * -base;
  const offset = (loop ? activeIndex + 1 : activeIndex) * -base;
  return Math.max(min, Math.min(offset, max));
}