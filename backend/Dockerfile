# Use an official Python runtime as a base image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /backend

# Copy the backend code to the /backend directory inside the container
COPY . /backend

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir "fastapi[standard]"
# Expose the port FastAPI will run on
EXPOSE 8000

# Command to run the FastAPI app
CMD ["fastapi", "run", "main.py"]