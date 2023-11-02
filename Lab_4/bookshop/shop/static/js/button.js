const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
  let target = button.querySelector('.target');
  function handleMove(e) {
    const x = -50 + (e.pageX - button.offsetLeft - 300 / 2) / 3;
    const y = -10 + (e.pageY - button.offsetTop - 100 / 2) / 3;

    target.style.setProperty('--x', `${ x }px`)
    target.style.setProperty('--y', `${ y }px`)
  }
  button.addEventListener('mousemove', (e) => {
    handleMove(e);
  });
  button.addEventListener('touchmove', (e) => {
    handleMove(e.changedTouches[0]);
  });
});