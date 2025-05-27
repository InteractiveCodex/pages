// Animación Lottie
lottie.loadAnimation({
  container: document.getElementById('lottie-container'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_person.json'
});
// Animaciones para historia
// Para part1
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
// Para part2
lottie.loadAnimation({
  container: document.querySelector('#part2 .animation-top'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_corazon.json'
});
lottie.loadAnimation({
  container: document.querySelector('#part2 .animation-bottom'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/indicador.json'
});
// Para part3
lottie.loadAnimation({
  container: document.querySelector('#part3 .animation-top'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/anim_ojos.json'
});
lottie.loadAnimation({
  container: document.querySelector('#part3 .animation-bottom'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'recursos/indicador.json'
});

let birthDateGlobal;
const avgBeatsPerSecond = 100000 / (24 * 60 * 60); // Aprox. 1.157 latidos/segundo
let beatsContador = 0;
let lastUpdate = 0;

const avgBlinksPerSecond = 16 / 60; // 16 parpadeos por minuto ≈ 0.266 por segundo
let blinkContador = 0;


function startStory() {
  const day = parseInt(document.getElementById("day").value, 10);
  const month = parseInt(document.getElementById("month").value, 10);
  const year = parseInt(document.getElementById("year").value, 10);

  if (!day || !month || !year) {
    return alert("Por favor introduce una fecha completa.");
  }

  const birthDate = new Date(year, month - 1, day);
  const now = new Date();

  if (birthDate > now || isNaN(birthDate.getTime())) {
    return alert("Introduce una fecha válida del pasado.");
  }

  birthDateGlobal = birthDate;

  const diffTime = now - birthDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  document.getElementById("daysLived").innerText = diffDays.toLocaleString();

  // Mostrar partes
  document.querySelectorAll(".story").forEach(el => el.classList.remove("hidden"));

  // Preparar contador de latidos
  beatsContador = Math.floor((now - birthDate) / 1000 * avgBeatsPerSecond);
  // Preparar contador de parpadeos
  blinkContador = Math.floor((now - birthDate) / 1000 * avgBlinksPerSecond);
  lastUpdate = performance.now();




  animateBeats(); // Comenzar animación

  setTimeout(() => {
    document.getElementById("part1").scrollIntoView({ behavior: "smooth" });
  }, 300);
}

function animateBeats() {
  const now = performance.now();
  const elapsed = (now - lastUpdate) / 1000; // en segundos
  lastUpdate = now;

  // Latidos
  beatsContador += avgBeatsPerSecond * elapsed;
  document.getElementById("latidos").innerText = Math.floor(beatsContador).toLocaleString();

  // Parpadeos
  blinkContador += avgBlinksPerSecond * elapsed;
  document.getElementById("parpadeos").innerText = Math.floor(blinkContador).toLocaleString();

  requestAnimationFrame(animateBeats);
}

