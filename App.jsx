import { useState } from "react";

import { NavbarPublic } from "./components/Navbar";
import { HeroPublic } from "./components/hero";
import Dashboard from "./components/Dashboard";
import AufgabenFormular from "./components/AugabenFormular";
import AufgabenFilter from "./components/AufgabenFilter";
import AufgabenListe from "./components/AufgabenListe";

import useLocalStorage from "./hooks/useLocalstorage";
import { beispielAufgaben } from "./data/beispielAufgaben";

export default function App() {
  const [aufgaben, setAufgaben] = useLocalStorage(
    "meine-aufgaben",
    beispielAufgaben
  );

  const [filter, setFilter] = useState("Alle");
  const [suche, setSuche] = useState("");

  function aufgabeHinzufuegen(neueAufgabe) {
    setAufgaben((bisherigeAufgaben) => [
      ...bisherigeAufgaben,
      neueAufgabe,
    ]);

    setFilter("Alle");
    setSuche("");
  }

  function statusAendern(id) {
    setAufgaben((bisherigeAufgaben) =>
      bisherigeAufgaben.map((aufgabe) => {
        if (aufgabe.id === id) {
          return {
            ...aufgabe,
            status:
              aufgabe.status === "Offen"
                ? "Erledigt"
                : "Offen",
          };
        }

        return aufgabe;
      })
    );
  }

  function aufgabeLoeschen(id) {
    setAufgaben((bisherigeAufgaben) =>
      bisherigeAufgaben.filter(
        (aufgabe) => aufgabe.id !== id
      )
    );
  }

  const sichtbareAufgaben = aufgaben.filter((aufgabe) => {
    const passtZumFilter =
      filter === "Alle" ||
      aufgabe.status === filter;

    const passtZurSuche = aufgabe.titel
      .toLowerCase()
      .includes(suche.trim().toLowerCase());

    return passtZumFilter && passtZurSuche;
  });

  return (
    <div className="app">
      <NavbarPublic/>
      <header className="seiten-kopf">

        <h1 className="flex items-center justify-center mb-5 text-3xl font-bold p-6">Meine Aufgaben</h1>

      </header>

      <main>
        <HeroPublic/>

        <Dashboard aufgaben={aufgaben} />

        <div className="haupt-layout">
          <AufgabenFormular
            onHinzufuegen={aufgabeHinzufuegen}
          />

          <section className="karte mx-auto my-6 w-full max-w-4xl rounded-2xl bg-white p-6 text-gray-900 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold">Aufgabenübersicht</h2>

            <div className="mb-6">
              <AufgabenFilter
              filter={filter}
              onFilterAendern={setFilter}
              suche={suche}
              onSucheAendern={setSuche}
            />
            </div>

            <AufgabenListe
              aufgaben={sichtbareAufgaben}
              hatAufgaben={aufgaben.length > 0}
              onStatusAendern={statusAendern}
              onLoeschen={aufgabeLoeschen}
            />
          </section>
        </div>
      </main>

      <footer className="seiten-fuss">
        Deine Aufgaben werden automatisch in diesem Browser
        gespeichert, sofern lokaler Speicher verfügbar ist.
      </footer>
    </div>
  );
}