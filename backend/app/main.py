from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .crud import seed_initial_customers
from .routers import predict, customers, dashboard

# Create SQLite DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="JULI - Customer Churn Prediction Platform API",
    description="Production-ready REST API for churn risk predictions, SHAP explanations, and customer retention analytics.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows Vite dev server & production frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed database on startup if empty
@app.on_event("startup")
def startup_db_seed():
    db = SessionLocal()
    try:
        seed_initial_customers(db, count=150)
    finally:
        db.close()

# Include Routers
app.include_router(predict.router)
app.include_router(customers.router)
app.include_router(dashboard.router)

@app.get("/health", tags=["Health"])
def health_check():
    """Health check endpoint for Docker & CI monitoring."""
    return {"status": "healthy", "service": "JULI Backend API", "version": "1.0.0"}
