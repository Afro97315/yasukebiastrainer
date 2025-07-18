// Import jsPDF
const { jsPDF } = window.jspdf;

// Données clés pour l'analyse
const afroKeywords = [
  "afrofuturisme", "panafricanisme", "ubuntu", "kemet", "griot", "sankofa", 
  "négritude", "wakanda", "lumumba", "kwame nkrumah", "fanon", "queen nzinga",
  "cheveux crépus", "black joy", "afroféminisme", "diaspora", "black skin white masks",
  "yoruba", "ashanti", "bantou", "kongo", "bambara", "coupes protectrices", "nom africain",
  "nefretiti", "thomas sankara", "mansa musa", "harriet tubman", "marcus garvey", "assata shakur", "angela davis", "cheikh anta diop",
  "swahili", "lingala", "wolof", "adinkra", "textile kente", "scarification symbolique", "masques dogon",
  "frantz fanon", "aimé césaire", "bell hooks", "w.e.b. du bois", "ngũgĩ wa thiong'o",
  "black excellence", "black joy", "résilience afro", "mémoire des ancêtres", "cosmologie africaine", "leadership communautaire"
];

const bannedPatterns = [
  /\bcheveux\s+(sales|incontrôlables)\b/i,
  /\bquartiers\s+dangereux\b/i,
  /\bpeau\s+foncée\s+comme\s+(négatif|menaçant)\b/i,
  /\bafrique\s*=\s*(pauvreté|corruption)\b/i
];

const correctiveExamples = {
  "Afrique = pauvreté": "Afrique = diversité de cultures, savoirs, innovations, spiritualités.",
  "cheveux crépus = incontrôlables": "Les cheveux crépus ont une grande richesse de styles et significations culturelles."
};

function analyzeText() {
  const text = document.getElementById("inputText").value.trim();
  if (!text) {
    alert("Merci d'entrer un texte à analyser !");
    return;
  }

  let biasesFound = [];
  bannedPatterns.forEach(pattern => {
    if (pattern.test(text)) {
      biasesFound.push(pattern.source);
    }
  });

  const foundKeywords = afroKeywords.filter(kw => text.toLowerCase().includes(kw.toLowerCase()));
  const missingInclusion = foundKeywords.length === 0;

  // Score simple = % de mots afroKeywords présents sur total afroKeywords
  let score = ((foundKeywords.length / afroKeywords.length) * 100).toFixed(1);

  // Affichage résultats
  document.getElementById("score").innerText = `Score d'afrocentrage : ${score} %`;
  document.getElementById("biases").innerHTML = `<strong>Biais détectés :</strong> ${biasesFound.length ? biasesFound.join(", ") : "Aucun"}`;
  document.getElementById("missing").innerHTML = missingInclusion ? "<em>Manque de référents afrocentrés</em>" : "";

  // Reformulation simple auto (exemple)
  let reformulation = "";
  biasesFound.forEach(bias => {
    for (const [key, value] of Object.entries(correctiveExamples)) {
      if (bias.includes(key.split(" = ")[0].toLowerCase())) {
        reformulation += `<p><em>Suggestion :</em> ${value}</p>`;
      }
    }
  });
  if (!reformulation) reformulation = "<p>Aucune reformulation automatique disponible.</p>";
  document.getElementById("reformulation").innerHTML = reformulation;

  document.querySelector(".results-section").hidden = false;
}

// Export Markdown
function exportMarkdown() {
  const text = document.getElementById("inputText").value.trim();
  if (!text) return alert("Rien à exporter !");
  const score = document.getElementById("score").innerText;
  const biases = document.getElementById("biases").innerText;
  const missing = document.get
