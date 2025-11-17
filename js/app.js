const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const skillBars = document.querySelectorAll('.skill__bar span');

const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  body.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
    themeToggle.dataset.icon = theme === 'dark' ? 'moon' : 'sun';
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function toggleTheme() {
  const next = body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

function animateSkills(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const span = entry.target;
      const parent = span.closest('.skill');
      const target = parent.dataset.skill;
      requestAnimationFrame(() => {
        span.style.width = `${target}%`;
      });
      observer.unobserve(span);
    }
  });
}

function initSkillObserver() {
  const observer = new IntersectionObserver(animateSkills, {
    threshold: 0.4,
  });

  skillBars.forEach((bar) => observer.observe(bar));
}

function setup() {
  initTheme();
  initSkillObserver();

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

document.addEventListener('DOMContentLoaded', setup);
