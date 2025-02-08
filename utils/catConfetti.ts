import confetti from "canvas-confetti"

const catShape = `
M0 0
L20 0
Q30 0 30 10
L30 20
Q30 30 20 30
L0 30
Q-10 30 -10 20
L-10 10
Q-10 0 0 0
M5 10
A3 3 0 0 1 5 16
A3 3 0 0 1 5 10
M15 10
A3 3 0 0 1 15 16
A3 3 0 0 1 15 10
M0 20
Q5 25 10 20
Q15 25 20 20
`

export function catConfetti() {
  const duration = 5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval: NodeJS.Timeout = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 20 * (timeLeft / duration)

    // Create cat-shaped confetti
    confetti(
      Object.assign({}, defaults, {
        particleCount: Math.floor(particleCount / 2),
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        shapes: ["circle"],
        colors: ["#ff9999", "#ffcc99", "#ffff99", "#99ff99", "#99ffff", "#9999ff", "#ff99ff"],
        scalar: 2,
      }),
    )

    // Create paw print confetti
    confetti(
      Object.assign({}, defaults, {
        particleCount: Math.floor(particleCount / 2),
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        shapes: ["circle"],
        colors: ["#000000"],
        scalar: 1.5,
        drift: randomInRange(-1, 1),
        ticks: 40,
      }),
    )
  }, 250)
}

