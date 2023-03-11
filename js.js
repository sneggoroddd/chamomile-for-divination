let petalInterval = null;
let numPetals = null;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function initFlower() {
  numPetals = getRandomInt(10, 21);
  drawFlower(numPetals);
}

function drawFlower(numPetals) {
  const canvas = document.getElementById("flowerCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  const center = { x: canvas.width / 2, y: canvas.height / 2 };
  const radius = Math.min(center.x, center.y) * 0.4;
  const angle = Math.PI * 2 / numPetals;

  // Remove old message
  const oldMessage = document.getElementById("loveOrNot");
  if (oldMessage) {
    oldMessage.remove();
  }

  for (let i = 0; i < numPetals; i++) {
    // ...
  }

  for (let i = 0; i < numPetals; i++) {
    const petalAngle = i * angle;
    const x1 = center.x + Math.cos(petalAngle - angle / 2) * radius;
    const y1 = center.y + Math.sin(petalAngle - angle / 2) * radius;
    const x2 = center.x + Math.cos(petalAngle + angle / 2) * radius;
    const y2 = center.y + Math.sin(petalAngle + angle / 2) * radius;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(x1, y1);
    ctx.quadraticCurveTo(center.x, center.y, x2, y2);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius * 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Draw stem and leaf
  ctx.beginPath();
  ctx.moveTo(center.x, center.y + radius * 0.4);
  ctx.lineTo(center.x, center.y + radius * 1.2);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#228B22";
  ctx.stroke();
 
  ctx.fill();

  const loveOrNot = numPetals % 2 === 0 ? "Любит" : "Не любит";
  const message = document.createElement("div");
  message.id = "loveOrNot";
  message.innerHTML = loveOrNot;
  message.style.position = "absolute";
  message.style.top = `${center.y - radius*2}px`;
  message.style.left = `${center.x - message.offsetWidth / 3}px`;
  message.style.color = "pink";
  message.style.fontWeight = "bold";
  message.style.fontSize = "300%"; 
  document.body.appendChild(message);

  if (numPetals > 0) {
    setTimeout(() => {
      message.remove();
      drawFlower(numPetals - 1);
    }, 1000);
  } else if (numPetals === 0 && petalInterval !== null) {
    clearInterval(petalInterval);
    petalInterval = null;
  }
}


function changePetals() {
  if (petalInterval !== null) {
    clearInterval(petalInterval);
  }

  const changePetalsBtn = document.getElementById("changePetals");
  changePetalsBtn.addEventListener("click", () => {
    if (petalInterval === null) {
      initFlower();
      petalInterval = setInterval(() => {
        numPetals = Math.max(numPetals - 1, 0);
        drawFlower(numPetals);
      }, 3000);
    }
  });
}

initFlower();
changePetals();

