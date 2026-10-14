import { useEffect, useState } from 'react';

export default function useVitals() {
  const [vitals, setVitals] = useState({
    hr: 73, spo2: 98, temp: 36.6, battery: 92, wifi: 94,
    wave: Array(60).fill(0).map((_, i) => Math.sin(i / 3) * 10),
  });

  useEffect(() => {
    const id = setInterval(() => {
      setVitals(v => ({
        ...v,
        hr: 70 + Math.round(Math.random() * 6),
        wave: [...v.wave.slice(1), Math.sin(Date.now() / 150) * 10 + Math.random() * 4],
      }));
    }, 200);
    return () => clearInterval(id);
  }, []);

  return vitals;
}
// TODO: setInterval ki jagah ws://<esp32-ip>:81 onmessage -> setVitals