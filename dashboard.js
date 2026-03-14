import "./transfert.js";

/* Récupération de l'utilisateur */
const user = JSON.parse(sessionStorage.getItem("current user"));

/* Vérification */
if (!user) {
    alert("Utilisateur non connecté");
    window.location.href = "../login.html";
}

/* Greeting */
document.getElementById("greetingName").textContent = user.name;

const wallet = user.wallet;

/* Solde disponible */
document.getElementById("availableBalance").textContent =
wallet.balance + " " + wallet.currency;

/* Revenus */
const revenus = wallet.transactions
.filter(t => t.type === "credit")
.reduce((total, t) => total + t.amount, 0);

/* Dépenses */
const depenses = wallet.transactions
.filter(t => t.type === "debit")
.reduce((total, t) => total + t.amount, 0);

/* Affichage revenus */
document.getElementById("monthlyIncome").textContent =
revenus + " " + wallet.currency;

/* Affichage dépenses */
document.getElementById("monthlyExpenses").textContent =
depenses + " " + wallet.currency;

/* Cartes actives */
document.getElementById("activeCards").textContent =
wallet.cards.length;


/* Tableau des transactions */

const table = document.getElementById("transactionsTable");

if (table) {

for (let i = 0; i < wallet.transactions.length; i++) {

const t = wallet.transactions[i];

const row = document.createElement("tr");

row.innerHTML = `
<td class="${t.type}">${t.type}</td>
<td>${t.amount} ${wallet.currency}</td>
<td>${t.from}</td>
<td>${t.to}</td>
<td>${t.date}</td>
`;

table.appendChild(row);

}

}