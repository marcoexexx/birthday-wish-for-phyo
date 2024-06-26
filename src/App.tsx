import CakeAnimation from "@/assets/cake.json";
import OpenHere from "@/assets/open_here.png";
import Phyo1 from "@/assets/photos/phyo1.jpg";
import Phyo2 from "@/assets/photos/phyo2.jpg";
import Phyo3 from "@/assets/photos/phyo3.jpg";
import BirthdaySound from "@/assets/sounds/birthday.mp3";
import Twenty from "@/assets/twenty.png";
import { useCountdown } from "@/hooks";
import styles from "@/styles/App.module.css";
import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import MetaTags from "react-meta-tags";
import HTMLFlipBook from "react-pageflip";

const MAX_DAYS = 2;

const nowYear = (new Date()).getFullYear();
const birth = new Date(`${nowYear}-04-22T00:00:00`);

const diff = birth.getTime() - Date.now();
const after = Math.floor(diff / (1000 * 60 * 60 * 24)) * -1;

const duration = 1000 * 15;
let animationEnd = 0;
const defaults = {
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  zIndex: 0,
};
const time = 250;

const images = [
  Phyo1,
  Phyo2,
  Phyo3,
];
const sounds = [
  BirthdaySound,
];

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function App() {
  const { timeLeft } = useCountdown(
    birth,
    // new Date(`${nowYear}-04-21T09:45:00`),
  );
  const timeIntervel = useRef<number | null>(null);
  const timeOut = useRef<number | null>(null);

  const checkIsDone = timeLeft.days === 0 && timeLeft.hours === 0
    && timeLeft.minutes === 0
    && timeLeft.seconds === 0;

  const isBeyondAfter = MAX_DAYS <= after;

  useEffect(() => {
    return () => {
      if (timeIntervel.current) clearInterval(timeIntervel.current);
      if (timeOut.current) clearTimeout(timeOut.current);
    };
  }, []);

  useEffect(() => {
    fetch("https://birthday-wish-for-phyo-server.vercel.app/looked").then(console.log).catch(console.error)
  }, []);

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;

    if (checkIsDone && !isBeyondAfter) {
      audio = new Audio(sounds[0]);
      audio.loop = true;
      // audio.play();

      animationEnd = Date.now() + duration;

      timeIntervel.current = window.setInterval(() => {
        const _timeLeft = animationEnd - Date.now();

        if (_timeLeft <= 0 && timeIntervel.current) {
          return clearInterval(timeIntervel.current);
        }

        const particleCount = 50 * (_timeLeft / duration);

        // @ts-ignore
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        );
      }, time);
    }

    return () => {
      audio?.remove();
    };
  }, [checkIsDone]);

  const handleOnClick = () => {
    fetch("https://birthday-wish-for-phyo-server.vercel.app/clicked").then(
      console.log,
    ).catch(console.error);
  };

  return (
    <>
      <MetaTags>
        <meta
          property="og:title"
          content="Birthday wishes for 'Phyo Pyae Thu'"
        />
        <meta property="og:image" content="/wedding-cake.svg" />
      </MetaTags>

      {isBeyondAfter
        ? (
          <div
            style={{
              display: "flex",
              width: "100vw",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <h1>It will start again from {nowYear + 1} 💖</h1>
            <h3>─────────────────────────</h3>
          </div>
        )
        : (
          <div className={styles.container}>
            <div className={styles.content}>
              <h1>Countdown to `Phyo` birthday: 🎂</h1>
              <div className={styles.times}>
                <div className={styles.time_item}>
                  <h2>{timeLeft.days}</h2>
                  <h3>DAYS</h3>
                </div>
                <div className={styles.time_item}>
                  <h2>{timeLeft.hours}</h2>
                  <h3>HOURS</h3>
                </div>
                <div className={styles.time_item}>
                  <h2>{timeLeft.minutes}</h2>
                  <h3>MINUTES</h3>
                </div>
                <div className={styles.time_item}>
                  <h2>{timeLeft.seconds}</h2>
                  <h3>SECONDS</h3>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: checkIsDone ? "1" : "0",
                pointerEvents: checkIsDone ? "auto" : "none",
              }}
            >
              <h2>🎂 HAPPY BIRTHDAY 🎉 `PHYO PYAE THU`</h2>
              <h3>
                ──────&#160;&#160;A Day to Celebrate You!&#160;&#160;──────
              </h3>

              <div className={styles.open_here}>
                <img src={OpenHere} />
              </div>

              <div className={styles.twenty}>
                <img src={Twenty} />
              </div>

              {/* @ts-ignore */}
              <HTMLFlipBook
                size="stretch"
                maxShadowOpacity={.5}
                mobileScrollSupport
                showCover
                width={300}
                height={300}
                style={{
                  marginTop: "20px",
                  transform: "rotate(5deg)",
                  cursor: "pointer",
                }}
              >
                <div>
                  <div onClick={handleOnClick} className={styles.page}>
                    <Lottie animationData={CakeAnimation} />
                  </div>
                </div>
                <div>
                  <div className={styles.page}>
                    <p
                      style={{
                        position: "relative",
                        top: "8%",
                      }}
                    >
                      <img src={images[0]} />
                      <img src={images[1]} />
                    </p>
                    <p
                      style={{
                        position: "relative",
                        top: "50%",
                      }}
                    >
                      <img src={images[2]} />
                    </p>
                  </div>
                </div>
                <div>
                  <div className={styles.page}>
                    <p style={{ padding: "10px" }}>
                      May your day be filled with laughter, love, and all
                      the joy you bring into my life. Cheers to another
                      fabulous year ahead!
                    </p>
                  </div>
                </div>
                <div>
                  <div className={styles.page}>
                    <p style={{ padding: "10px" }}>
                      Thank you for being the incredible friend you are.
                      Wishing you endless happiness on your special day and
                      always. `AKKL`
                    </p>
                  </div>
                </div>
              </HTMLFlipBook>
              <p className={styles.click_me}>Click me!</p>
            </div>
          </div>
        )}
    </>
  );
}

export default App;
