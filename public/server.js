import express from "express";
import cors from "cors";
import { exec } from "child_process";
const app = express();
const port = 3001;

app.use(cors()); // Aktiviert CORS für alle Anfragen

app.get("/start-jupyter", (req, res) => {
  exec("jupyter notebook", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.send("Fehler beim Starten des Jupyter Notebook Servers");
    }
    res.send("Jupyter Notebook Server gestartet");
  });
});

app.listen(port, () => {
  console.log(`Backend-Server läuft auf http://localhost:${port}`);
});
