from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Document, StorageContext
from llama_index.core.node_parser import SimpleNodeParser
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_cpp import Llama
from llama_index.embeddings import SentenceTransformerEmbedding


import re


# Branch priority list
BRANCH_PRIORITY = [
    "CSE", "DSAI", "MNC", "ECE", "EEE", "ME", 
    "EP", "CHEMICAL", "CHEMICAL SCIENCE AND TECHNOLOGY", 
    "CIVIL ENGINEERING", "BIOSCIENCE AND BIOENGINEERING"
]

def score_branch(branch):
    branch = branch.upper()
    return 100 - BRANCH_PRIORITY.index(branch)*10 if branch in BRANCH_PRIORITY else 0

def evaluate_cv(cv_text: str, job_description: str):
    # 1. Create a Document object from CV text
    document = Document(text=cv_text)

    # 2. Node parsing
    parser = SimpleNodeParser.from_defaults()
    nodes = parser.get_nodes_from_documents([document])

    # 3. Embeddings + Index
    embed_model = SentenceTransformerEmbedding(model_name="all-MiniLM-L6-v2")  # Fast & decent
    index = VectorStoreIndex(nodes, embed_model=embed_model)

    # 4. Load Local LLaMA Model
    llm = Llama(
        model_path = "C:/Users/rajt4/Desktop/TECHSTACKS/CapybaraHermes-2.5-Mistral-7B-GPTQ/llama-2-7b-chat.Q4_K_M.gguf",
        temperature=0.7,
        max_new_tokens=512,
        context_window=4096,
    )

    # 5. RAG Query Engine
    query_engine = index.as_query_engine(llm=llm, similarity_top_k=3)

    # 6. Ask for relevant fields
    branch = query_engine.query("What is the candidate's branch or department?").response
    cpi = query_engine.query("What is the candidate's CPI or CGPA?").response
    tech_skills = query_engine.query("List all the candidate's technical skills.").response
    positions = query_engine.query("What positions of responsibility has the candidate held?").response
    achievements = query_engine.query("List the candidate's notable achievements.").response

    # 7. Scoring
    score = 0
    score += score_branch(branch)
    try:
        score += min(10, int(float(cpi))) if cpi else 0
    except:
        pass
    score += len(tech_skills.split(',')) * 2
    score += len(positions.split(',')) * 2
    score += len(achievements.split(',')) * 2
    score = min(100, score)

    # 8. Feedback generation
    feedback_prompt = f"""
    Job Description: {job_description}
    Candidate CV: {cv_text[:2000]}

    Please give feedback on how well this candidate fits the job role. Mention strengths and weaknesses.
    """
    feedback = llm.complete(feedback_prompt).text.strip()

    return score, feedback

  

# using the openAI
#     from langchain_community.vectorstores import FAISS
# from langchain.chains import RetrievalQA
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain.docstore.document import Document
# from langchain_community.llms import OpenAI
# from langchain_community.embeddings import OpenAIEmbeddings

# import re

# # Branch priority list (highest to lowest)
# BRANCH_PRIORITY = [
#     "CSE", "DSAI", "MNC", "ECE", "EEE", "ME",
#     "EP", "CHEMICAL", "CHEMICAL SCIENCE AND TECHNOLOGY",
#     "CIVIL ENGINEERING", "BIOSCIENCE AND BIOENGINEERING"
# ]

# def extract_field_from_cv(cv_text, field):
#     """Rough extractor based on keywords for simplicity."""
#     match = re.findall(fr"{field}[:\-]?\s*(.*)", cv_text, re.IGNORECASE)
#     return match[0] if match else ""

# def score_branch(branch):
#     branch = branch.upper()
#     return 100 - BRANCH_PRIORITY.index(branch)*10 if branch in BRANCH_PRIORITY else 0

# def evaluate_cv(cv_text: str, job_description: str):
#     # 1. Split CV into chunks
#     splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
#     chunks = splitter.split_documents([Document(page_content=cv_text)])

#     # 2. Embed chunks and build FAISS index
#     embeddings = OpenAIEmbeddings (put your key here  )
#     vectorstore = FAISS.from_documents(chunks, embeddings)
#     retriever = vectorstore.as_retriever()

#     # 3. Setup RetrievalQA chain
#     qa = RetrievalQA.from_chain_type(
#         llm=OpenAI(),
#         retriever=retriever,
#         return_source_documents=False
#     )

#     # 4. Query for scoring fields
#     branch = qa.run("What is the candidate's branch or department?")
#     cpi = qa.run("What is the candidate's CPI or CGPA?")
#     tech_skills = qa.run("List all the candidate's technical skills.")
#     positions = qa.run("What positions of responsibility has the candidate held?")
#     achievements = qa.run("List the candidate's notable achievements.")

#     # 5. Score calculation
#     score = 0
#     score += score_branch(branch)
#     try:
#         score += min(10, int(float(cpi)))
#     except:
#         pass
#     score += len(tech_skills.split(',')) * 2 if tech_skills else 0
#     score += len(positions.split(',')) * 2 if positions else 0
#     score += len(achievements.split(',')) * 2 if achievements else 0
#     score = min(100, score)  # Cap at 100

#     # 6. Generate feedback
#     feedback_prompt = f"""
#     Given the job description:\n{job_description}\n
#     And the CV:\n{cv_text[:2000]}...\n
#     Generate feedback on the candidate's fit for the role, focusing on strengths and weaknesses.
#     """
#     feedback = OpenAI(temperature=0.7).predict(feedback_prompt)

#     return int(score), feedback.strip()

