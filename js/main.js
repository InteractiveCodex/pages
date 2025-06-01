// Animación Lottie
lottie.loadAnimation({
  container: document.getElementById('lottie-container'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_person.json'
});

// Animaciones para historia
// Part1
lottie.loadAnimation({
  container: document.querySelector('#part1 .animation-top'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_day.json'
});
lottie.loadAnimation({
  container: document.querySelector('#part1 .animation-bottom'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/indicador.json'
});

// Part2
lottie.loadAnimation({
  container: document.querySelector('#part2 .animation-top'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_sleep.json'
});
lottie.loadAnimation({
  container: document.querySelector('#part2 .animation-bottom'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/indicador.json'
});

// Part3
lottie.loadAnimation({
  container: document.querySelector('#part3 .animation-top'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_corazon.json'
});
lottie.loadAnimation({
  container: document.querySelector('#part3 .animation-bottom'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/indicador.json'
});

// Part4
lottie.loadAnimation({
  container: document.querySelector('#part4 .animation-top'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_celulas.json'
});
lottie.loadAnimation({
  container: document.querySelector('#part4 .animation-bottom'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/indicador.json'
});

// Part5
lottie.loadAnimation({
  container: document.querySelector('#part5 .animation-top'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_eyes.json'
});
lottie.loadAnimation({
  container: document.querySelector('#part5 .animation-bottom'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/indicador.json'
});

// Part6
lottie.loadAnimation({
  container: document.querySelector('#part6 .animation-top'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_world.json'
});
lottie.loadAnimation({
  container: document.querySelector('#part6 .animation-bottom'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/indicador.json'
});

let birthDateGlobal;
const avgBeatsPerSecond = 100000 / (24 * 60 * 60); // ≈ 1.157
let beatsContador = 0;
let lastUpdate = 0;

const avgBlinksPerSecond = 18 / 60; // ≈ 0.3
let blinkContador = 0;

const avgCellsPerSecond = 1000000; // 1 millón por segundo
let celulasContador = 0;

function startStory() {
  const day = parseInt(document.getElementById("day").value, 10);
  const month = parseInt(document.getElementById("month").value, 10);
  const year = parseInt(document.getElementById("year").value, 10);

  const errorEl = document.getElementById("error-message");

  if (!day || !month || !year) {
    errorEl.innerText = "Por favor introduce una fecha completa.";
    errorEl.classList.add("visible");
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  const now = new Date();

  if (birthDate > now || isNaN(birthDate.getTime())) {
    errorEl.innerText = "Introduce una fecha válida del pasado.";
    errorEl.classList.add("visible");
    return;
  }

  // Ocultar error si todo está bien
  errorEl.innerText = "";
  errorEl.classList.remove("visible");

  birthDateGlobal = birthDate;

  const diffTime = now - birthDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  document.getElementById("daysLived").innerText = diffDays.toLocaleString();

  const diasDormido = Math.floor(diffDays / 3);
  document.getElementById("diasDormido").innerText = diasDormido.toLocaleString();

  // Mostrar partes
  document.querySelectorAll(".story").forEach(el => el.classList.remove("hidden"));

  // Inicializar contadores
  beatsContador = Math.floor((now - birthDate) / 1000 * avgBeatsPerSecond);
  blinkContador = Math.floor((now - birthDate) / 1000 * avgBlinksPerSecond);
  celulasContador = Math.floor((now - birthDate) / 1000 * avgCellsPerSecond);

  lastUpdate = performance.now();

  animateBeats();

  setTimeout(() => {
    document.getElementById("part1").scrollIntoView({ behavior: "smooth" });
  }, 300);
}

function animateBeats() {
  const now = performance.now();
  const elapsed = (now - lastUpdate) / 1000;
  lastUpdate = now;

  // Latidos
  beatsContador += avgBeatsPerSecond * elapsed;
  document.getElementById("latidos").innerText = Math.floor(beatsContador).toLocaleString();

  // Parpadeos
  blinkContador += avgBlinksPerSecond * elapsed;
  document.getElementById("parpadeos").innerText = Math.floor(blinkContador).toLocaleString();

  // Células
  celulasContador += avgCellsPerSecond * elapsed;
  document.getElementById("celulas").innerText = Math.floor(celulasContador).toLocaleString();

  requestAnimationFrame(animateBeats);
}







// Función para bloquear y desbloquear scroll
function toggleScrollLock(lock) {
  if (lock) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

const storySections = Array.from(document.querySelectorAll('.story'));

// Añadimos event listeners a cada animation-bottom dentro de las story
storySections.forEach((section, index) => {
  const animBottom = section.querySelector('.animation-bottom');
  if (animBottom) {
    animBottom.style.cursor = 'pointer'; // Cambio cursor para indicar que es clickable

    animBottom.addEventListener('click', () => {
      // Si es la última sección no hacemos scroll a ninguna
      if (index === storySections.length - 1) {
        // Opcional: puedes hacer algo aquí si quieres
        return;
      }

      // Bloquear scroll
      toggleScrollLock(true);

      // Scroll a la siguiente sección
      storySections[index + 1].scrollIntoView({ behavior: 'smooth' });

      // Esperamos el tiempo del scroll (estimado) para desbloquear el scroll
      // 800ms suele estar bien para smooth scroll, ajusta si quieres
      setTimeout(() => {
        toggleScrollLock(false);
      }, 800);
    });
  }
});
