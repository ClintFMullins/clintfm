import { useEffect } from 'react';

export function useDirectionKeys({ handleUp, handleDown, handleLeft, handleRight }) {
  function onKeyDown(event) {
    if (event.keyCode === 37) {
      handleLeft && handleLeft();
    } else if (event.keyCode === 38) {
      handleUp && handleUp();
    } else if (event.keyCode === 39) {
      handleRight && handleRight();
    } else if (event.keyCode === 40) {
      handleDown && handleDown();
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', onKeyDown);

    return () => {
      document.removeEventListener('keyup', onKeyDown);
    }
  })
} 