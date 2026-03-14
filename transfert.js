const user = JSON.parse(sessionStorage.getItem("current user"));

document.addEventListener("DOMContentLoaded", function () {

const transferBtn = document.getElementById("transferBtn");

if (!user) {
console.log("Utilisateur non connecté");
return;
}

if (transferBtn) {

transferBtn.addEventListener("click", function () {
console.log("clicked");

const amount = Number(document.getElementById("amount").value);
const beneficiaire = document.getElementById("beneficiaire").value.trim();
const result = document.getElementById("transferResult");

result.textContent = "Checking amount...";

setTimeout(() => {

if (amount <= 0 || isNaN(amount)) {
result.textContent = "Montant invalide";
return;
}

result.textContent = "Checking solde...";

setTimeout(() => {

if (user.wallet.balance < amount) {
result.textContent = "Solde insuffisant";
return;
}

result.textContent = "Checking bénéficiaire...";

setTimeout(() => {

if (!beneficiaire) {
result.textContent = "Bénéficiaire invalide";
return;
}

result.textContent = "Création transaction...";

setTimeout(() => {

/* création transaction */
const debit = {
id: Date.now(),
type: "debit",
amount: amount,
date: new Date().toLocaleDateString(),
from: user.name,
to: beneficiaire
};

/* ajout transaction */
user.wallet.transactions.push(debit);

/* update balance */
user.wallet.balance -= amount;

/* sauvegarde session */
sessionStorage.setItem("current user", JSON.stringify(user));

result.textContent = "Transfert réussi ✅";

/* update solde affiché */
const balance = document.getElementById("availableBalance");

if (balance) {
balance.textContent =
user.wallet.balance + " " + user.wallet.currency;
}

}, 1000);

}, 1000);

}, 1000);

}, 1000);

});

}

});