# ImageAlchemy – Neural Style Transfer Demonstrator App  
**© CC BY-NC-ND 4.0**  


## 📖 Über das Projekt  
Diese App ist der praktische Teil meiner Bachelorarbeit mit dem Titel:  
**"Entwicklung einer Demonstrator-App für KI-basierte Bildmanipulation am Beispiel des Neural Style Transfer"**  
*(engl.: "Development of a demonstrator app for AI-based image manipulation using the example of Neural Style Transfer")*  

![grafik](https://github.com/user-attachments/assets/772575ba-bd67-416a-95a5-d4212b48b8ae)

Die mobile Anwendung ermöglicht Nutzern:  
- Aufnahme oder Upload von Fotos  
- Auswahl künstlerischer Stile (z.B. Monet, Picasso)  
- KI-gestützten Style-Transfer in Echtzeit  

## 🛠 Technologien  
- **Frontend**: React.js (Mobile-optimiert)  
- **Backend**: Python (Flask/PyTorch für NST-Modell)  
- **KI-Modell**: Pretrained Neural Style Transfer (z.B. VGG19)  

## 🚀 Lokale Installation  
### Voraussetzungen  
- Python 3.8+  
- Node.js 16+  
- npm/yarn  

### Schritt-für-Schritt  
1. **Backend starten** (Style-Transfer-Server):  
   ```bash
   cd ImageAlchemy/Servercode
   pip install -r requirements.txt  # Abhängigkeiten installieren
   python server.py                # Server starten (kann mehrere Minuten dauern)
   ```

2. **Frontend starten** (in separatem Terminal):  
   ```bash
   cd ImageAlchemy
   npm install   # Dependencies installieren
   npm run dev   # App unter http://localhost:3000 starten
   ```

3. **App nutzen**:  
   - Öffne `http://localhost:3000` im Browser
   - Foto hochladen → Stil wählen → KI-Verarbeitung abwarten   

## 📜 Bachelorarbeit  
Zielsetzung:
Diese Arbeit untersucht die Verwendung von generischen Merkmalsrepräsentationen, die von leistungsfähigen CNNs gelernt wurden, um den Inhalt und den Stil natürlicher Bilder unabhängig voneinander zu verarbeiten und zu manipulieren. Konkret wird die Frage untersucht, ob neuronale Netze mit mehr Schichten sich besser für den Style Transfer eignen als neuronale Netze mit weniger Schichten. Darüber hinaus werden die Auswirkungen von Veränderungen an den Hyperparametern des Algorithmus auf das visuelle Erscheinungsbild des transformierten Bildes überprüft. Ein weiteres Ziel dieser Arbeit ist die Entwicklung einer Demonstrator-App, die es dem Benutzer ermöglicht, einen Stiltransfer auf ein selbst erstelltes Bild durchzuführen. Die App erfordert lediglich Grundkenntnisse in der Bedienung von Smartphones. Vorkenntnisse im Bereich der KI werden nicht benötigt. Die Anwendung soll dazu dienen, der interessierten Öffentlichkeit einige Möglichkeiten der KI und die Funktionsweise des Stiltransfers aufzuzeigen und praktisch zu demonstrieren. Ein konkreter Anwendungsbereich ist die Verwendung im Rahmen der Öffentlichkeitsarbeit der Hochschule, beispielsweise während des Tags der offenen Tür oder der langen Nacht der Wissenschaften. Dazu wird die App durch ein Poster ergänzt, das den KI-Prozess erklärt. Es wird so gestaltet, dass keine Vorkenntnisse auf dem Gebiet der KI erforderlich sind.
