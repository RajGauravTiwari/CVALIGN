
# CVAlign: AI-Powered CV Evaluator

CVAlign is a web platform that evaluates CVs using a RAG (Retrieval-Augmented Generation) pipeline with a local LLaMA-based LLM. It scores CVs based on branch priority, CPI, technical skills, positions of responsibility, and achievements—giving both a score and detailed feedback on candidate suitability.

## 🚀 Features

- Upload job role descriptions and CVs (PDF format)
- Evaluate CVs using RAG + LLaMA model
- Score and provide feedback on candidates automatically
- Role-based dashboards (Admin, Recruiter)
- Persistent storage of CVs
- Frontend built in React + TailwindCSS
- Backend powered by FastAPI

## 📁 Project Structure

```
CVAlign/
├── app/                    # FastAPI backend
│   ├── main.py             # Main API entry point
│   ├── rag_model.py        # RAG + LLaMA pipeline logic
│   └── utils.py            # CV parsing utilities
├── frontend/               # React frontend
│   └── ...                 # Admin/Recruiter dashboards
├── storage/                # Uploaded CVs
├── README.md
└── requirements.txt
```

## 🧠 Scoring Logic

The LLaMA-based RAG model evaluates each CV based on:
1. **Branch** (using a priority list)
2. **CPI / CGPA**
3. **Number of technical skills**
4. **Positions of responsibility**
5. **Achievements**

The model returns a final score (max 100) and feedback.

## 🖥️ Setup Instructions

### 🔧 Backend

1. **Install Python dependencies**

```bash
pip install -r requirements.txt
```

2. **Download a GGUF LLaMA model**

You can use a model like `CapybaraHermes-2.5-Mistral-7B-GGUF` from HuggingFace:

```bash
git lfs install
git clone https://huggingface.co/TheBloke/CapybaraHermes-2.5-Mistral-7B-GGUF
```

Place the `.gguf` file inside a folder and configure `rag_model.py` to use the correct path.

3. **Start the backend server**

```bash
cd app
uvicorn main:app --reload
```

Server will run on: `http://localhost:8000`

### 🌐 Frontend

1. **Navigate to frontend**

```bash
cd frontend
```

2. **Install packages and start dev server**

```bash
npm install
npm run dev
```

App runs on: `http://localhost:5173`

## 📊 Example Evaluation Flow

1. Admin adds a job role.
2. Recruiter posts a job description.
3. Candidate uploads a CV.
4. Backend parses, indexes, and evaluates CV using LLaMA.
5. Scores + feedback displayed on dashboard.

## ⚠️ Troubleshooting

- **Model loading error**: Ensure path to `.gguf` is correct and system is 64-bit with AVX2 support.
- **PDF not parsing**: Ensure valid PDF format and PyMuPDF is installed.
- **`llama.dll` error**: Only 64-bit Python is supported.

## 📄 License

MIT

---

For questions or collaboration, contact:

- Name: Raj gaurav Tiwari
- Email: raj.tiwari@iitg.ac.in
