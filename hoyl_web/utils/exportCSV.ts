import { saveAs } from "file-saver";

export function exportCSV(players: any[]) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });

  let csvContent = "Usuario,Edad," + Array.from({ length: 27 }, (_, i) => `P${i + 1}`).join(",") + ",Total\n";

  players.forEach((player) => {
    const answers: number[] = player.answers.map((a: { answer: number }) => a.answer); // Respuestas del jugador
    const total: number = answers.reduce((acc: number, val: number) => acc + val, 0); // Calcular el total
    const row = [player.username, `${player.age} años`, ...answers, total].join(",");
    csvContent += row + "\n";
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `ResultadosJuegos_${formattedDate}.csv`);
}
