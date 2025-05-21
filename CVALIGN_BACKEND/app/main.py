from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import cloudinary.uploader
import uuid
from bson import ObjectId

from app import rag_model, utils, config
from app.mongodb import collection

import cloudinary

# Configure Cloudinary
cloudinary.config(
    cloud_name="dyicnb8vr",
    api_key="419838291771888",
    api_secret="IkRx_Ak939_AkhdFBuSSbh72rfE"
)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Utility function to fix ObjectId ---

def fix_mongo_ids(doc):
    if "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

# --- Upload CV Endpoint ---

@app.post("/upload/")
async def upload_cv(
    job_role: str = Form(...),
    job_description: str = Form(...),
    uploader_email: str = Form(...),
    file: UploadFile = File(...)
):
    # Read file content into memory
    contents = await file.read()

    # Upload to Cloudinary
    cloud_result = cloudinary.uploader.upload(contents, resource_type="raw")
    file_url = cloud_result.get("secure_url")

    # Reset file pointer for text extraction
    file_stream = BytesIO(contents)

    # Extract CV text
    cv_text = await utils.extract_text_from_bytes(file_stream, file.filename)

    # Get dummy score and feedback (use RAG later)
    score, feedback = rag_model.evaluate_cv(cv_text, job_description)

    # Create record
    record = {
        "id": str(uuid.uuid4()),
        "job_role": job_role,
        "job_description": job_description,
        "uploader_email": uploader_email,
        "file_url": file_url,
        "file_name": file.filename,
        "score": score,
        "feedback": feedback,
        "cv_text": cv_text,
    }

    # Insert into MongoDB
    result = await collection.insert_one(record)

    record["_id"] = str(result.inserted_id)


    # Return sanitized response
    return {
        "message": "Uploaded successfully",
        "data": record
    }

# --- Get All Job Roles ---

@app.get("/job_roles/")
async def get_job_roles():
    roles = await collection.distinct("job_role")
    return roles

# --- Get All Uploads (for admin) ---

@app.get("/uploads/")
async def get_all_uploads():
    docs = await collection.find().to_list(length=100)
    return [fix_mongo_ids(doc) for doc in docs]

# --- Get Uploads for Specific Job Role (for recruiter) ---

@app.get("/scores/")
async def get_scores(job_role: str):
    docs = await collection.find({"job_role": job_role}).to_list(length=100)
    return [fix_mongo_ids(doc) for doc in docs]
