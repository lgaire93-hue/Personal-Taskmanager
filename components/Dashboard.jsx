export default function Dashboard({ aufgaben }) {
  const gesamt = aufgaben.length;

  const offen = aufgaben.filter(
    (aufgabe) => aufgabe.status === "Offen"
  ).length;

  const erledigt = aufgaben.filter(
    (aufgabe) => aufgabe.status === "Erledigt"
  ).length;

  return (
    <section
      className="dashboard flex items-center justify-center m-4 gap-4 p-6"
      aria-label="Aufgabenstatistik"
    >
      <div className="statistik stats shadow stat place-items-center">
        <div class="stat-title">Alle Aufgaben</div>                                       
        <strong>{gesamt}</strong>
      </div>

      <div className="statistik stats shadow stat place-items-center">
        <div class="stat-title">Offen</div>
        <strong>{offen}</strong>
      </div>

      <div className="statistik stats shadow stat place-items-center">
        <div class="stat-title">Erledigt</div>
        <strong>{erledigt}</strong>
      </div>
    </section>
  );
}