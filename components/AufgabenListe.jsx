export default function AufgabenListe({
  aufgaben,
  hatAufgaben,
  onStatusAendern,
  onLoeschen,
}) {
  if (aufgaben.length === 0) {
    return (
      <p className="leere-liste">
        {hatAufgaben
          ? "Keine Aufgaben passen zu deiner Suche oder deinem Filter."
          : "Noch keine Aufgaben vorhanden. Erstelle deine erste Aufgabe!"}
      </p>
    );
  }

  return (
    <ul className="aufgaben-liste m-0 list-none space-y-4 p-0">
      {aufgaben.map((aufgabe) => (
        <li
          key={aufgabe.id}
          className={`rounded-xl border p-4 shadow-sm sm:p-6 ${
            aufgabe.status === "Erledigt"
              ? "aufgabe erledigt"
              : "aufgabe"
           }`}
        >
          <div className="aufgaben-kopf flex flex-wrap items-center justify-between gap-3">
            <h3  className={`min-w-0 break-words text-lg font-bold ${
            aufgabe.status === "Erledigt"
              ? "text-gray-500 line-through"
              : "text-gray-900"
          }`}>
            {aufgabe.titel}</h3>

            <span
              className={`prioritaet ${aufgabe.prioritaet.toLowerCase()}`}
            >
              {aufgabe.prioritaet}
            </span>
          </div>

          <p className="beschreibung">
            {aufgabe.beschreibung}
          </p>

          <p className="status">
            Status: {aufgabe.status}
          </p>

          <div className="aufgaben-aktionen">
            <label className="status-auswahl">
              <input
                type="checkbox"
                checked={aufgabe.status === "Erledigt"}
                onChange={() =>
                  onStatusAendern(aufgabe.id)
                }
              />

              Erledigt
            </label>

            <button
              type="button"
              className="loeschen-button"
              onClick={() => onLoeschen(aufgabe.id)}
              aria-label={`Aufgabe „${aufgabe.titel}“ löschen`}
            >
              Löschen
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}