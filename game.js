const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ukuran dan posisi paddle
const paddleWidth = 100;
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

// Ukuran dan posisi bola
const ballRadius = 10;
let ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
let ballY = 20;
let ballSpeed = 2;

// Skor
let score = 0;

// Input keyboard
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'ArrowRight') rightPressed = true;
    else if (e.key === 'ArrowLeft') leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === 'ArrowRight') rightPressed = false;
    else if (e.key === 'ArrowLeft') leftPressed = false;
}

// Menggambar paddle
function drawPaddle() {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
}

// Menggambar bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#DD3300';
    ctx.fill();
    ctx.closePath();
}

// Menggambar skor
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Logika permainan
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBall();
    drawScore();

    // Pergerakan bola
    ballY += ballSpeed;

    // Pergerakan paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Deteksi tangkapan bola
    if (
        ballY + ballRadius >= canvas.height - paddleHeight - 10 &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
    ) {
        score++;
        ballY = 20;
        ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
        ballSpeed += 0.2; // Tambah kecepatan bola
    }

    // Bola melewati paddle
    if (ballY > canvas.height) {
        alert('Game Over! Skor Anda: ' + score);
        document.location.reload();
    }

    requestAnimationFrame(updateGame);

        // Pergerakan paddle
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7; // Gerak ke kanan
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7; // Gerak ke kiri
        }
    
}

// Mulai permainan
updateGame();