export default function AufgabenFilter({
  filter,
  onFilterAendern,
  suche,
  onSucheAendern,
}) {
  const filterOptionen = [
    {
      wert: "Alle",
      text: "Alle Aufgaben",
    },
    {
      wert: "Offen",
      text: "Offene Aufgaben",
    },
    {
      wert: "Erledigt",
      text: "Erledigte Aufgaben",
    },
  ];

  return (
    <div className="filter-bereich mb-6 flex flex-col gap-3">
      <label htmlFor="suche" className="font-semibold text-gray-800">
        Aufgaben suchen
      </label>

      <input
        id="suche"
        type="search"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Nach einem Titel suchen ..."
        value={suche}
        onChange={(event) =>
          onSucheAendern(event.target.value)
        }
      />

      <div
        className="filter-buttons flex flex-wrap gap-2"
        role="group"
        aria-label="Nach Status filtern"
      >
        {filterOptionen.map((option) => (
          <button
            key={option.wert}
            type="button"
            className={`rounded-lg border px-4 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              filter === option.wert
                ? "filter-button aktiv"
                : "filter-button"
            }`}
            aria-pressed={filter === option.wert}
            onClick={() =>
              onFilterAendern(option.wert)
            }
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}