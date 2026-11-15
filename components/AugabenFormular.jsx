import { useState } from "react";

export default function AufgabenFormular({
  onHinzufuegen,
}) {
  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [prioritaet, setPrioritaet] = useState("Mittel");
  const [fehler, setFehler] = useState("");

  function formularAbsenden(event) {
    event.preventDefault();

    if (titel.trim() === "") {
      setFehler("Bitte gib einen Titel ein.");
      return;
    }

    const neueAufgabe = {
      id: crypto.randomUUID(),
      titel: titel.trim(),
      beschreibung: beschreibung.trim(),
      prioritaet: prioritaet,
      status: "Offen",
    };

    onHinzufuegen(neueAufgabe);

    setTitel("");
    setBeschreibung("");
    setPrioritaet("Mittel");
    setFehler("");
  }

  return (
    <section className="karte flex flex-col items-center justify-center gap-4 p-6 ">
      <h2 className="text-2xl font-bold">Neue Aufgabe</h2>


      <form onSubmit={formularAbsenden} className="flex w-full max-w-md flex-col gap-3">
        <label htmlFor="titel ">
          Titel
        </label>

        <input
          id="titel"
          type="text"
          placeholder="Was möchtest du erledigen?"
          value={titel}
          onChange={(event) => setTitel(event.target.value)}
          aria-invalid={fehler !== ""}
          aria-describedby={fehler ? "titel-fehler" : undefined}
        />

        {fehler && (
          <p
            id="titel-fehler"
            className="fehler"
            role="alert"
          >
            {fehler}
          </p>
        )}

        <label htmlFor="beschreibung">
          Beschreibung
        </label>

        <textarea
          id="beschreibung"
          placeholder="Weitere Informationen zur Aufgabe"
          rows={4}
          value={beschreibung}
          onChange={(event) =>
            setBeschreibung(event.target.value)
          }
        />

        <label htmlFor="prioritaet">
          Priorität
        </label>

        <select
          id="prioritaet select [&::picker(select)]:max-h-26 "
          value={prioritaet}
          onChange={(event) =>
            setPrioritaet(event.target.value)
          }
        >
          <option value="Hoch">Hoch</option>
          <option value="Mittel">Mittel</option>
          <option value="Niedrig">Niedrig</option>
        </select>

        <button
          type="submit"
          className="haupt-button"
        >
          Aufgabe hinzufügen
        </button>
      </form>
    </section>
  );
}