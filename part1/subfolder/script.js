// Get income input fields
const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');

// Get expense input fields
const expenseDescription = document.getElementById('expense-description');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');

// Transaction history table
const transactionHistory = document.getElementById('transaction-history');

// Budget summary elements
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const balanceEl = document.getElementById('balance');

let transactions = [];

// Function to add income
function addIncome() {
    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    transactions.push({ description, category: 'Income', amount, type: 'Income' });
    updateTransactionHistory();
    updateSummary();
    clearIncomeInputs();
}

// Function to add expense
function addExpense() {
    const description = expenseDescription.value.trim();
    const category = expenseCategory.value;
    const amount = parseFloat(expenseAmount.value.trim());

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    transactions.push({ description, category, amount, type: 'Expense' });
    updateTransactionHistory();
    updateSummary();
    clearExpenseInputs();
}

// Update the transaction table
function updateTransactionHistory() {
    transactionHistory.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td><button onclick="deleteTransaction(${index})">Delete</button></td>
        `;
        transactionHistory.appendChild(row);
    });
}

// Update budget summary
function updateSummary() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'Income') {
            totalIncome += transaction.amount;
        } else if (transaction.type === 'Expense') {
            totalExpenses += transaction.amount;
        }
    });

    totalIncomeEl.textContent = totalIncome.toFixed(2);
    totalExpensesEl.textContent = totalExpenses.toFixed(2);
    balanceEl.textContent = (totalIncome - totalExpenses).toFixed(2);
}

// Delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateTransactionHistory();
    updateSummary();
}

// Clear income input fields
function clearIncomeInputs() {
    incomeDescription.value = '';
    incomeAmount.value = '';
}

// Clear expense input fields
function clearExpenseInputs() {
    expenseDescription.value = '';
    expenseAmount.value = '';
    expenseCategory.value = 'Housing';
}

// Clear all data
function clearAll() {
    transactions = [];
    updateTransactionHistory();
    updateSummary();
}