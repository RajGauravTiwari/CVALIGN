# app/mongodb.py
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL ="mongodb+srv://rajt4656:Raj%40mongo@clusterraj.xvhsrzx.mongodb.net/?retryWrites=true&w=majority&appName=ClusterRaj"

client = AsyncIOMotorClient(MONGO_URL)
db = client.cv_align  # your database name
collection = db.uploads  # your collection (like a table)
