export function calcOffsetByActive(activeIndex, length, {
  width, 
  height, 
  slidePerView,
  spaceBetween,
  loop, 
  animation
}) {
  const base = ((animation === 'vertical' ? height : width) - (spaceBetween * Math.floor(slidePerView)))/slidePerView + spaceBetween;
  const max = 0;
  const min = (loop ? length + 1 : length - 1) * -base;
  let offset = (loop ? activeIndex + 1 : activeIndex) * -base;
  if(loop) {
    offset += (width - base + spaceBetween)/2;
  }
  return Math.max(min, Math.min(offset, max));
}