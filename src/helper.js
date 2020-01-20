export function usePauseFunction(fn, initialPaused) {
  const [paused, setState] = useState(initialPaused);
  return [function() {
    !paused && fn();
  }, {
    play() { setState(false); },
    pause() { setState(true); }
  }];
}