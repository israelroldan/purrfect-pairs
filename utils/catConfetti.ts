import confetti from "canvas-confetti"

export function catConfetti() {
  const duration = 5 * 1000
  const animationEnd = Date.now() + duration
  const defaults: any = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval: NodeJS.Timeout = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 20 * (timeLeft / duration)

    // Create colorful confetti
    confetti({
      ...defaults,
      particleCount: Math.floor(particleCount / 2),
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      colors: ["#ff9999", "#ffcc99", "#ffff99", "#99ff99", "#99ffff", "#9999ff", "#ff99ff"],
      scalar: 2,
    })

    // Create paw print confetti
    confetti({
      ...defaults,
      particleCount: Math.floor(particleCount / 2),
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      colors: ["#000000"],
      scalar: 1.5,
      drift: randomInRange(-1, 1),
      ticks: 40,
    })
  }, 250)
}

