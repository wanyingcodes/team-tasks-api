
# User Module

# Registration Test
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"1234567890"}'

# Login Test
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"1234567890"}'

------------------------------

# Project Module

# Create Project
curl -X POST http://localhost:3000/project \
  -H "Content-Type: application/json" \
  -d '{"name":"Project1","description":"Test project"}'

# Get All Projects
curl http://localhost:3000/project

# Get Single Project
curl http://localhost:3000/project/1

# Update Project
curl -X PATCH http://localhost:3000/project/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"New Project Name"}'

# Delete Project
curl -X DELETE http://localhost:3000/project/1

------------------------------

# Task Module

# Create Task
curl -X POST http://localhost:3000/task \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Global Test",
    "description": "Complete this task today",
    "projectId": 1,
    "assignedUserId": 1
  }'

# Get All Tasks Under a Project
curl http://localhost:3000/task/project/1

# Get My Tasks
curl http://localhost:3000/task/my

# Get Single Task (assuming id is 1)
curl http://localhost:3000/task/1

# Update Task (can update only specific fields)
# Update title and status
curl -X PATCH http://localhost:3000/task/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New title",
    "status": "ongoing"
  }'

# Or update only assigned user
curl -X PATCH http://localhost:3000/task/1 \
  -H "Content-Type: application/json" \
  -d '{
    "assignedUserId": 3
  }'

# Delete Task
curl -X DELETE http://localhost:3000/task/1

------------------------------

# Comment Module

# Create Comment
curl -X POST http://localhost:3000/comment \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a test comment",
    "taskId": 1
  }'

# Get Comments for a Task
curl http://localhost:3000/comment/task/1

# Delete Comment
curl -X DELETE http://localhost:3000/comment/1
