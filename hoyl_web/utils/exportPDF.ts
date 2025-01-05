import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPDF(players: any[], startDate: string | null, endDate: string | null) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const img = new Image();
  img.src = "/Logo.png";

  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });

  img.onload = () => {
    doc.addImage(img, "PNG", 85, 2, 130, 60);
    doc.setFontSize(12);
    doc.text(`Fecha: ${formattedDate}`, 16, 40);
    //doc.text("Usuario(s) seleccionados: Todos", 16, 50);
    //doc.text(`Fecha: ${startDate || "N/A"} ---- ${endDate || "N/A"}`, 16, 45);

    const headers = [["Usuario", "Edad", ...Array.from({ length: 27 }, (_, i) => `P ${i + 1}`), "Total"]];
    const rows = players.map((player) => {
      const answers: number[] = player.answers.map((a: { answer: number }) => a.answer); // Respuestas del jugador
    const total: number = answers.reduce((acc: number, val: number) => acc + val, 0); // Calcular el total
      return [player.username, `${player.age} años`, ...answers, total];
    });

    autoTable(doc, { head: headers, body: rows, startY: 60, theme: "grid" });
    doc.save(`ResultadosJuegos_${formattedDate}.pdf`);
  };

  img.onerror = (err) => {
    console.error("Error al cargar la imagen:", err);
  };
}
