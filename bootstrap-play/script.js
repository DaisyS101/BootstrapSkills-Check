const ideaInput = document.querySelector('#ideaInput');
const ideaOutput = document.querySelector('#ideaOutput');
const launchButton = document.querySelector('#launchButton');
const launchToast = document.querySelector('#launchToast');
const toastText = document.querySelector('#toastText');
const ideaProgress = document.querySelector('#ideaProgress');
const paletteName = document.querySelector('#paletteName');
const chartBars = document.querySelector('#chartBars');

const toast = new bootstrap.Toast(launchToast, { delay: 2600 });

function launchIdea() {
  const idea = ideaInput.value.trim() || 'A perfectly timed kitten pounce';
  ideaOutput.innerHTML = `<span class="output-arrow">→</span><span>Launching <strong>${idea}</strong> into the cat dimension.</span>`;
  toastText.textContent = 'The cat has approved your adventure.';
  toast.show();
  ideaProgress.style.width = `${Math.min(99, 87 + Math.floor(Math.random() * 10))}%`;
}

launchButton.addEventListener('click', launchIdea);
ideaInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') launchIdea();
});

document.querySelectorAll('.tag-button').forEach((tag) => {
  tag.addEventListener('click', () => {
    document.querySelectorAll('.tag-button').forEach((button) => button.classList.remove('active'));
    tag.classList.add('active');
    ideaInput.value = tag.dataset.idea;
    ideaInput.focus();
  });
});

document.querySelectorAll('.swatch').forEach((swatch) => {
  swatch.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach((button) => button.classList.remove('active'));
    swatch.classList.add('active');
    paletteName.textContent = swatch.dataset.palette;
    document.documentElement.style.setProperty('--coral', getComputedStyle(swatch).backgroundColor);
  });
});

document.querySelectorAll('.btn-chart').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.btn-chart').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const heights = button.dataset.range === 'month' ? [56, 35, 73, 47, 88, 64, 79] : [42, 68, 51, 83, 63, 31, 92];
    chartBars.querySelectorAll('.bar').forEach((bar, index) => { bar.style.height = `${heights[index]}%`; });
    chartBars.querySelectorAll('small').forEach((label, index) => { label.textContent = button.dataset.range === 'month' ? `W${index + 1}` : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][index]; });
  });
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.activity-card').forEach((card) => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

document.querySelector('#shuffleButton').addEventListener('click', () => {
  const title = document.querySelector('.display-title');
  title.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-2deg) scale(.98)' }, { transform: 'rotate(0deg)' }], { duration: 450, easing: 'ease-out' });
  const phrases = [['A little <em>more</em><br>mischief.', 'A little more mischief.'], ['A little <em>more</em><br>whiskers.', 'A little more whiskers.'], ['A little <em>more</em><br>nap.', 'A little more nap.']];
  const next = phrases[Math.floor(Math.random() * phrases.length)];
  title.innerHTML = next[0];
  toastText.textContent = next[1];
  toast.show();
});
