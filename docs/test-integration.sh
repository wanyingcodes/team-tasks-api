#!/bin/bash

# Integration Test Script - Testing auth/user/project/task/comment modules

BASE_URL="http://localhost:3000"
# Generate unique email address (using timestamp)
TIMESTAMP=$(date +%s%N | cut -b1-13)
TEST_EMAIL="test_${TIMESTAMP}@example.com"

echo "================================"
echo "Team Tasks API Integration Test"
echo "================================"
echo "Test Email: $TEST_EMAIL"
echo ""

# Color definitions
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Test counters
PASS=0
FAIL=0

# Check if response contains error
check_response() {
  local response=$1
  local name=$2
  
  if echo "$response" | jq -e '.error' > /dev/null 2>&1; then
    echo -e "${RED}❌ Failed${NC}"
    ((FAIL++))
    return 1
  else
    echo -e "${GREEN}✅ Succeeded${NC}"
    ((PASS++))
    return 0
  fi
}

# ============================
# 1. AUTH Module Test
# ============================
echo -e "${YELLOW}========== AUTH Module Test ==========${NC}"
echo ""

echo -e "${GREEN}1.1 User Registration - $TEST_EMAIL${NC}"
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$TEST_EMAIL'",
    "password": "Password123!",
    "name": "Test User"
  }')
echo "$REGISTER_RESPONSE" | jq '.'
USER_ID=$(echo "$REGISTER_RESPONSE" | jq -r '.user.id // empty')
echo ""

echo -e "${GREEN}1.2 User Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$TEST_EMAIL'",
    "password": "Password123!"
  }')
echo "$LOGIN_RESPONSE" | jq '.'
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token // empty')
echo "Got Token: $TOKEN"
echo ""

if [ ! -z "$TOKEN" ]; then
  ((PASS++))
else
  echo -e "${RED}❌ Failed to get Token${NC}"
  ((FAIL++))
fi
echo ""

# ============================
# 2. USER Module Test
# ============================
echo -e "${YELLOW}========== USER Module Test ==========${NC}"
echo ""

echo -e "${GREEN}2.1 Get All Users${NC}"
curl -s -X GET $BASE_URL/user | jq '.'
echo ""

echo -e "${GREEN}2.2 Get User Details (ID: $USER_ID)${NC}"
curl -s -X GET $BASE_URL/user/$USER_ID | jq '.'
echo ""

echo -e "${GREEN}2.3 Find User by Email${NC}"
curl -s -X GET "$BASE_URL/user/email/$TEST_EMAIL" | jq '.'
echo ""

echo -e "${GREEN}2.4 Update User Information${NC}"
if [ ! -z "$USER_ID" ]; then
  curl -s -X PATCH $BASE_URL/user/$USER_ID \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"name":"Updated Test User","email":"updated_'${TIMESTAMP}'@example.com"}' | jq '.'
fi
echo ""

# ============================
# 3. PROJECT Module Test
# ============================
echo -e "${YELLOW}========== PROJECT Module Test ==========${NC}"
echo ""

echo -e "${GREEN}3.1 Create Project${NC}"
PROJECT_RESPONSE=$(curl -s -X POST $BASE_URL/project \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Team Tasks Project",
    "description": "Manage team tasks efficiently"
  }')
echo "$PROJECT_RESPONSE" | jq '.'
PROJECT_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.id // empty')
echo "Project ID: $PROJECT_ID"
echo ""

echo -e "${GREEN}3.2 Get All Projects${NC}"
curl -s -X GET $BASE_URL/project | jq '.'
echo ""

echo -e "${GREEN}3.3 Get Project Details (ID: $PROJECT_ID)${NC}"
curl -s -X GET $BASE_URL/project/$PROJECT_ID | jq '.'
echo ""

echo -e "${GREEN}3.4 Update Project${NC}"
curl -s -X PATCH $BASE_URL/project/$PROJECT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Updated Project Name",
    "description": "Updated description"
  }' | jq '.'
echo ""

# ============================
# 4. TASK Module Test
# ============================
echo -e "${YELLOW}========== TASK Module Test ==========${NC}"
echo ""

echo -e "${GREEN}4.1 Create Task${NC}"
TASK_RESPONSE=$(curl -s -X POST $BASE_URL/task \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Complete API Documentation",
    "description": "Write comprehensive API documentation",
    "projectId": '$PROJECT_ID',
    "assignedUserId": '$USER_ID'
  }')
echo "$TASK_RESPONSE" | jq '.'
TASK_ID=$(echo "$TASK_RESPONSE" | jq -r '.id // empty')
echo "Task ID: $TASK_ID"
echo ""

echo -e "${GREEN}4.2 Get Tasks for Project (Project ID: $PROJECT_ID)${NC}"
curl -s -X GET $BASE_URL/task/project/$PROJECT_ID | jq '.'
echo ""

echo -e "${GREEN}4.3 Get My Tasks${NC}"
curl -s -X GET $BASE_URL/task/my \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

echo -e "${GREEN}4.4 Get Single Task (ID: $TASK_ID)${NC}"
curl -s -X GET $BASE_URL/task/$TASK_ID | jq '.'
echo ""

echo -e "${GREEN}4.5 Update Task Status${NC}"
curl -s -X PATCH $BASE_URL/task/$TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Updated Task Title",
    "status": "ongoing",
    "description": "Updated description"
  }' | jq '.'
echo ""

# ============================
# 5. COMMENT Module Test
# ============================
echo -e "${YELLOW}========== COMMENT Module Test ==========${NC}"
echo ""

echo -e "${GREEN}5.1 Create Comment${NC}"
if [ ! -z "$TASK_ID" ]; then
  COMMENT_RESPONSE=$(curl -s -X POST $BASE_URL/comment \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"content":"Great progress on this task!","taskId":'$TASK_ID'}')
else
  COMMENT_RESPONSE='{"message":"Cannot create comment without task ID"}'
fi
echo "$COMMENT_RESPONSE" | jq '.'
COMMENT_ID=$(echo "$COMMENT_RESPONSE" | jq -r '.id // empty')
echo "Comment ID: $COMMENT_ID"
echo ""

echo -e "${GREEN}5.2 Get Task Comments (Task ID: $TASK_ID)${NC}"
curl -s -X GET $BASE_URL/comment/task/$TASK_ID | jq '.'
echo ""

# ============================
# 6. Cleanup Test - Delete Resources
# ============================
echo -e "${YELLOW}========== Cleanup Test ==========${NC}"
echo ""

echo -e "${GREEN}6.1 Delete Comment (ID: $COMMENT_ID)${NC}"
curl -s -X DELETE $BASE_URL/comment/$COMMENT_ID \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

echo -e "${GREEN}6.2 Delete Task (ID: $TASK_ID)${NC}"
curl -s -X DELETE $BASE_URL/task/$TASK_ID \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

echo -e "${GREEN}6.3 Delete Project (ID: $PROJECT_ID)${NC}"
curl -s -X DELETE $BASE_URL/project/$PROJECT_ID \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

echo -e "${GREEN}6.4 Delete User Account (ID: $USER_ID)${NC}"
curl -s -X DELETE $BASE_URL/user/$USER_ID \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

echo "================================"
echo -e "${GREEN}✅ Integration Test Complete!${NC}"
echo "================================"
echo ""
echo "📊 Test Summary:"
echo -e "  ${GREEN}✅ Passed: $PASS${NC}"
echo -e "  ${RED}❌ Failed: $FAIL${NC}"
echo -e "  📝 Total: $((PASS + FAIL))"
echo ""

if [ $FAIL -eq 0 ]; then
  echo -e "${GREEN}🎉 All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}⚠️  $FAIL test(s) failed${NC}"
  exit 1
fi
