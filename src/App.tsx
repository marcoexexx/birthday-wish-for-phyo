import CakeAnimation from "@/assets/cake.json";
import Phyo1 from "@/assets/photos/phyo1.jpg";
import Phyo2 from "@/assets/photos/phyo2.jpg";
import Phyo3 from "@/assets/photos/phyo3.jpg";
import { useCountdown } from "@/hooks";
import styles from "@/styles/App.module.css";
import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

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

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function App() {
  const { timeLeft } = useCountdown(
    new Date("2024-04-22T00:00:00"),
  );

  const timeIntervel = useRef<number | null>(null);
  const timeOut = useRef<number | null>(null);

  const checkIsDone = timeLeft.days === 0 && timeLeft.hours === 0
    && timeLeft.minutes === 0
    && timeLeft.seconds === 0;

  useEffect(() => {
    return () => {
      if (timeIntervel.current) clearInterval(timeIntervel.current);
      if (timeOut.current) clearTimeout(timeOut.current);
    };
  }, []);

  useEffect(() => {
    if (checkIsDone) {
      console.log("show");
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
  }, [checkIsDone]);

  return (
    <>
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
          }}
        >
          <h2>🎂 HAPPY BIRTHDAY 🎉 `PHYO PYAE THU`</h2>
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
              <div className={styles.page}>
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
                  May your day be filled with laughter, love, and all the
                  joy you bring into my life. Cheers to another fabulous
                  year ahead!
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
    </>
  );
}

export default App;
