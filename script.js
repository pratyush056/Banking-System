console.log("JS Loaded");

const API = "http://localhost:3000";

/* ================= LOAD ACCOUNTS ================= */
async function loadAccounts() {
  const res = await fetch(API + "/accounts");
  const data = await res.json();

  const table = document.getElementById("accountRows");
  const dropdown = document.getElementById("transactionAccount");

  table.innerHTML = "";
  dropdown.innerHTML = "";

  data.forEach(acc => {
    // Table
    table.innerHTML += `
      <tr>
        <td>${acc.account_number}</td>
        <td>${acc.customer_id}</td>
        <td>${acc.branch_id}</td>
        <td>${acc.account_type}</td>
        <td>₹${acc.balance}</td>
        <td>-</td>
      </tr>
    `;

    // Dropdown
    dropdown.innerHTML += `
      <option value="${acc.id}">
        ${acc.account_number} (₹${acc.balance})
      </option>
    `;
  });
}

/* ================= ADD CUSTOMER ================= */
async function addCustomer(e) {
  e.preventDefault();

  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;

  await fetch(API + "/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, phone, address })
  });

  alert("✅ Customer Added");
  loadCustomers();
}

/* ================= LOAD CUSTOMERS ================= */
async function loadCustomers() {
  const res = await fetch(API + "/customers");
  const data = await res.json();

  const table = document.getElementById("customerRows");
  table.innerHTML = "";

  data.forEach(c => {
    table.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.address || ""}</td>
      </tr>
    `;
  });
}

/* ================= TRANSACTION ================= */
async function transaction(account_id, type, amount) {
  await fetch(API + "/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ account_id, type, amount })
  });

  alert("✅ Transaction Done");
  loadAccounts();
}

/* ================= INIT ================= */
window.onload = () => {
  loadAccounts();
  loadCustomers();
};