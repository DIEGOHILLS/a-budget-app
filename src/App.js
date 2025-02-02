import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import FirebaseAuth from "./components/FirebaseAuth";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import Home from "./components/Home";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <Router>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budget App</h1>
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
          <Link to="/signin" className="btn btn-outline-primary">
            Sign In
          </Link>
        </Stack>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Stack direction="horizontal" gap="2" className="mb-4">
                  <Button
                    variant="primary"
                    onClick={() => setShowAddBudgetModal(true)}
                  >
                    Add Budget
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={openAddExpenseModal}
                  >
                    Add Expense
                  </Button>
                </Stack>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  {budgets.map((budget) => {
                    const amount = getBudgetExpenses(budget.id).reduce(
                      (total, expense) => total + expense.amount,
                      0
                    );
                    return (
                      <BudgetCard
                        key={budget.id}
                        name={budget.name}
                        amount={amount}
                        max={budget.max}
                        onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                        onViewExpensesClick={() =>
                          setViewExpensesModalBudgetId(budget.id)
                        }
                      />
                    );
                  })}
                  <UncategorizedBudgetCard
                    onAddExpenseClick={openAddExpenseModal}
                    onViewExpensesClick={() =>
                      setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
                    }
                  />
                  <TotalBudgetCard />
                </div>
              </>
            }
          />
          <Route path="/signin" element={<FirebaseAuth />} />
        </Routes>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </Router>
  );
}

export default App;
