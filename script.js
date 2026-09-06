const video = document.getElementById('myVideo');
const bigPlayBtn = document.getElementById('bigPlayBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const playSvg = playPauseBtn.querySelector('.play-svg');
const pauseSvg = playPauseBtn.querySelector('.pause-svg');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const fullscreenBtn = document.getElementById('fullscreenBtn');

function togglePlay() {
  if (video.paused) {
    video.play();
    bigPlayBtn.classList.add('hidden');
    playSvg.classList.add('hidden');
    pauseSvg.classList.remove('hidden');
  } else {
    video.pause();
    bigPlayBtn.classList.remove('hidden');
    playSvg.classList.remove('hidden');
    pauseSvg.classList.add('hidden');
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(video.currentTime);
}

function setProgress(e) {
  const newTime = (e.offsetX / progressContainer.offsetWidth) * video.duration;
  video.currentTime = newTime;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.parentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

video.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(video.duration);
});

video.addEventListener('timeupdate', updateProgress);
video.addEventListener('click', togglePlay);
bigPlayBtn.addEventListener('click', togglePlay);
playPauseBtn.addEventListener('click', togglePlay);
progressContainer.addEventListener('click', setProgress);
fullscreenBtn.addEventListener('click', toggleFullscreen);
