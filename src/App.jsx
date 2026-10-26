import { useState, useEffect, useRef, useMemo } from "react";

const pages = [
  {
    title: "✨ A Special Question",
    text: "Among billions of stars in this universe, would you keep shining with me?",
    options: ["Yes ❤️", "Absolutely 💙"],
  },
  {
    title: "🌙 Another Question",
    text: "Would you like to keep creating beautiful memories together?",
    options: ["Of Course 💕", "Definitely ✨"],
  },
  {
    title: "⭐ One More Question",
    text: "If life gets difficult, would you still stay with kindness and trust?",
    options: ["Always 🌹", "Yes Forever ❤️"],
  },
  {
    title: "💫 Final Question",
    text: "Would you cherish every moment and keep smiling no matter what?",
    options: ["Forever 💖", "Without Doubt 🌟"],
  },
];

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, (_, id) => ({
        id,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
      })),
    []
  );

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, id) => ({
        id,
        left: `${Math.random() * 100}%`,
        duration: `${6 + Math.random() * 6}s`,
        delay: `${Math.random() * 5}s`,
      })),
    []
  );

  return (
    <div className="hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    setStep((currentStep) => currentStep + 1);
  };

  return (
    <main className="container">
      <audio ref={audioRef} loop>
        <source src="/love-music.mp3" type="audio/mpeg" />
      </audio>

      <Stars />
      <FloatingHearts />

      {step < pages.length ? (
        <section className="card" key={step}>
          <p className="eyebrow">A little journey of happiness</p>
          <h1>Suman Web App 💙</h1>
          <div className="progress">
            Question {step + 1} of {pages.length}
          </div>
          <h2>{pages[step].title}</h2>
          <p>{pages[step].text}</p>

          <div className="button-group">
            {pages[step].options.map((option) => (
              <button key={option} onClick={handleClick}>
                {option}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="card">
          <h1>💖 Thank You 💖</h1>
          <p>
            Thank you for walking through this little journey. Life becomes
            beautiful because of trust, kindness, support, and gratitude.
          </p>

          <h3>Stories 📖</h3>
          <p>⭐ Every great story begins with a simple hello.</p>
          <p>⭐ Every smile shared becomes a beautiful memory.</p>
          <p>⭐ Appreciation and gratitude make relationships stronger.</p>

          <p className="final">
            ✨ Wishing happiness, love, and beautiful memories forever ✨
          </p>

          <button onClick={() => setStep(0)}>Start Again 💙</button>
        </section>
      )}
    </main>
  );
}
