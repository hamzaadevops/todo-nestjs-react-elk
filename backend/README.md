# Todo-App (NestJS + Mongo + ELK)

A minimal CRUD API that logs every operation in JSON and ships the logs to Elasticsearch via Logstash. A Kibana dashboard visualises create/update/delete counts over time.

## 🏃‍♂️ Run locally

```bash
git clone https://github.com/<you>/todo-app.git
cd todo-app
docker compose up --build
