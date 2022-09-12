
let timeBreak;
let time;
let direction;
let bar;
let elems = {
  break: document.getElementById('break-indicator'),
  time: document.getElementById('timer-indicator'),
  info: document.getElementById('timer-info'),
};


const init = function() {
  elems.info.innerHTML = 'Session';
  timeBreak = elems.break.innerHTML * 60;
  time = elems.time.innerHTML * 60;
  direction = -1;

  setProgressBar();
};


const getTime = function(time) {
  let min = parseInt(Math.abs(time / 60), 10);
  let s = parseInt(Math.abs(time % 60));

  s = s > 9 ? ('' + s) : ('0' + s);

  return min + ':' + s;
};

// circular timer
const setProgressBar = function() {
  if (bar) {
    bar.destroy();
    bar = null;
  }

  bar = new ProgressBar.Circle(timer, {
    strokeWidth: 2,
    easing: 'linear',
    color: '#D9D9D9',
    trailColor: '#000000',
    trailWidth: 2,
    svgStyle: null,
    text: {
      value: getTime(time),
      className: 'progressbar-label'
    },
    step: function(state, bar, attachment) {
      let value = Math.abs(bar.value());
      let timeDisplay = time - (time * value);
      bar.setText(getTime(timeDisplay));
    }
  });

};

const toggleTimer = function(pause) {
  let progress = time * Math.abs(bar.value());
  // Animate time
  bar.animate(direction, {
    duration: (time - progress) * 1000
  }, function() {
    // Animate break
    elems.info.innerHTML = 'Break';
    time = timeBreak;
    direction *= -1;

    setProgressBar();
    bar.animate(direction, {
      duration: time * 1000
    });
  });

  if (pause) bar.stop();
};

const toggleValue = function(type, operation) {
  let elem = elems[type];
  let value = parseInt(elem.innerHTML, 10);
  value += operation === '+' ? 1 : -1;

  if (value < 0) return;

  elem.innerHTML = value;

  if (type === 'time') time = value * 60;
  else timeBreak = value * 60;

  reset();
};

const reset = function() {
  elems.info.innerHTML = 'Session';
  time = elems.time.innerHTML * 60;
  timeBreak = elems.break.innerHTML * 60;
  direction = -1;
  setProgressBar();
  window.pause = false;
};

init();

