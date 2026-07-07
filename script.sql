CREATE DATABASE BankingSystem;
USE BankingSystem;
-- 1. Branch Table
CREATE TABLE branch (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL
);

-- 2. Customer Table
CREATE TABLE customer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT
);

-- 3. Employee Table (Linked to Branch)
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    branch_id INT,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    FOREIGN KEY (branch_id) REFERENCES branch(id) ON DELETE SET NULL
);

-- 4. Account Table (Linked to Customer and Branch)
CREATE TABLE account (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    branch_id INT,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    account_type ENUM('Savings', 'Current', 'Fixed Deposit') NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (branch_id) REFERENCES branch(id)
);

-- 5. Transaction Table (Linked to Account)
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT,
    transaction_type ENUM('Deposit', 'Withdrawal', 'Transfer') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- 6. Cards Table (Linked to Account)
CREATE TABLE cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT,
    card_number VARCHAR(16) UNIQUE NOT NULL,
    card_type ENUM('Debit', 'Credit') NOT NULL,
    expiration_date DATE NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- 7. Loan Table (Linked to Customer)
CREATE TABLE loan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    loan_type VARCHAR(50) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('Active', 'Paid', 'Defaulted') DEFAULT 'Active',
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);

-- 8. EMI Table (Linked to Loan)
CREATE TABLE emi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    loan_id INT,
    emi_amount DECIMAL(15, 2) NOT NULL,
    due_date DATE NOT NULL,
    status ENUM('Paid', 'Pending', 'Overdue') DEFAULT 'Pending',
    FOREIGN KEY (loan_id) REFERENCES loan(id) ON DELETE CASCADE
);

-- 9. Account_Holder Table (Associative Entity for Joint Accounts)
CREATE TABLE account_holder (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT,
    customer_id INT,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);
INSERT INTO branch (name, address, phone) VALUES ('Main Downtown', '123 Wall St', '555-0101');
INSERT INTO customer (name, email, phone) VALUES ('John Doe', 'john@example.com', '555-0202');
INSERT INTO account (customer_id, branch_id, account_number, account_type, balance) 
VALUES (1, 1, 'ACC1001', 'Savings', 5000.00);