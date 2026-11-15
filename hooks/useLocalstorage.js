import { useEffect, useState } from "react";

export default function useLocalStorage(schluessel, startwert) {
  const [wert, setWert] = useState(() => {
    try {
      const gespeicherterWert = localStorage.getItem(schluessel);

      if (gespeicherterWert !== null) {
        return JSON.parse(gespeicherterWert);
      }

      return startwert;
    } catch {
      return startwert;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        schluessel,
        JSON.stringify(wert)
      );
    } catch {
      console.error(
        "Die Daten konnten nicht im Browser gespeichert werden."
      );
    }
  }, [schluessel, wert]);

  return [wert, setWert];
}