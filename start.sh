cd ~/spotify-server

cd backend

docker build -t backend .
docker run -d -p 8000:8000 backend

cd ..

cd frontend

docker build -t frontend .
docker run -d -p 3000:80 frontend
