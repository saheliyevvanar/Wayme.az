# Career Test Backend API Documentation

## Overview

This backend system analyzes career test answers using OpenAI's GPT-4 and generates professional PDF reports.

## Setup

### 1. Install Dependencies

```bash
cd career-test-backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 3001)
- `PDF_BASE_URL` - Base URL for PDF downloads

### 3. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

---

## API Endpoints

### POST /api/analyze

Analyzes test answers and generates a PDF report.

#### Request Body

```json
{
  "userInfo": {
    "name": "John Doe",
    "age": 25,
    "education": "Bachelor's in Computer Science",
    "currentField": "Student"
  },
  "selectedCareerField": "Software Development",
  "answers": [
    {
      "questionId": 1,
      "question": "Which activities do you find most enjoyable in your free time?",
      "answer": "Building or fixing things with my hands",
      "value": "A"
    },
    {
      "questionId": 2,
      "question": "What type of content do you consume most online?",
      "answer": "Technology and gadget reviews",
      "value": "A"
    }
  ]
}
```

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "analysis": {
      "primaryCareerField": {
        "name": "Software Engineering & Development",
        "description": "Based on your strong analytical skills, technology enthusiasm, and preference for problem-solving, software engineering aligns perfectly with your profile.",
        "matchPercentage": 94
      },
      "topCareerFields": [
        {
          "rank": 1,
          "name": "Software Engineering & Development",
          "matchPercentage": 94,
          "reason": "Your logical thinking, technology comfort, and enjoyment of building things make this an ideal fit."
        },
        {
          "rank": 2,
          "name": "Data Science & Analytics",
          "matchPercentage": 86,
          "reason": "Your analytical mindset and interest in research translate well to data-driven roles."
        },
        {
          "rank": 3,
          "name": "Product Management",
          "matchPercentage": 78,
          "reason": "Your mix of technical skills and organizational abilities suit product roles."
        }
      ],
      "strengths": [
        "Strong analytical and logical thinking - You naturally break down complex problems into manageable parts",
        "High technology proficiency - You quickly adapt to new tools and platforms",
        "Self-motivated learner - You proactively seek knowledge and skill development",
        "Detail-oriented approach - You ensure quality and accuracy in your work"
      ],
      "areasToImprove": [
        "Communication skills - Practice explaining technical concepts to non-technical audiences",
        "Networking abilities - Expand your professional connections through events and online communities",
        "Leadership experience - Take on small team leadership opportunities to build management skills"
      ],
      "recommendedSkills": [
        {
          "skill": "Cloud Computing (AWS/Azure/GCP)",
          "importance": "High",
          "description": "Cloud skills are essential for modern software development. Start with AWS certifications."
        },
        {
          "skill": "System Design",
          "importance": "High",
          "description": "Understanding how to design scalable systems is crucial for senior engineering roles."
        },
        {
          "skill": "Agile/Scrum Methodologies",
          "importance": "Medium",
          "description": "Most tech companies use agile practices. Familiarity improves team collaboration."
        },
        {
          "skill": "Public Speaking",
          "importance": "Medium",
          "description": "Presenting ideas clearly enhances career growth and leadership opportunities."
        }
      ],
      "suggestedJobRoles": [
        {
          "title": "Full-Stack Developer",
          "description": "Build complete web applications handling both frontend and backend development.",
          "salaryRange": "$70,000 - $150,000",
          "demandLevel": "High"
        },
        {
          "title": "Software Engineer",
          "description": "Design, develop, and maintain software systems and applications.",
          "salaryRange": "$80,000 - $180,000",
          "demandLevel": "High"
        },
        {
          "title": "DevOps Engineer",
          "description": "Bridge development and operations, automating deployment and infrastructure.",
          "salaryRange": "$90,000 - $160,000",
          "demandLevel": "High"
        },
        {
          "title": "Technical Lead",
          "description": "Guide technical decisions and mentor junior developers.",
          "salaryRange": "$120,000 - $200,000",
          "demandLevel": "Medium"
        }
      ],
      "sixMonthRoadmap": {
        "month1": {
          "title": "Foundation & Assessment",
          "tasks": [
            "Assess current skill gaps in target technologies",
            "Set up a learning schedule (2-3 hours daily)",
            "Choose a primary programming language to master",
            "Create accounts on learning platforms (Coursera, Udemy, Pluralsight)"
          ]
        },
        "month2": {
          "title": "Core Skill Building",
          "tasks": [
            "Complete an online course in your chosen technology stack",
            "Start building a personal project",
            "Join developer communities (Discord, Reddit, Stack Overflow)",
            "Practice coding challenges on LeetCode or HackerRank"
          ]
        },
        "month3": {
          "title": "Practical Application",
          "tasks": [
            "Complete your first personal project",
            "Start contributing to open-source projects",
            "Begin learning cloud platforms (AWS Free Tier)",
            "Document your learning journey on a blog or LinkedIn"
          ]
        },
        "month4": {
          "title": "Portfolio Development",
          "tasks": [
            "Build 2-3 portfolio projects showcasing different skills",
            "Create a professional GitHub profile",
            "Design and deploy a personal portfolio website",
            "Get feedback from experienced developers"
          ]
        },
        "month5": {
          "title": "Networking & Visibility",
          "tasks": [
            "Attend virtual or local tech meetups",
            "Connect with professionals in your target companies",
            "Start technical writing or content creation",
            "Prepare for technical interviews with mock sessions"
          ]
        },
        "month6": {
          "title": "Job Search & Applications",
          "tasks": [
            "Update resume with new skills and projects",
            "Apply to 5-10 positions weekly",
            "Practice behavioral and technical interviews",
            "Follow up on applications and network referrals"
          ]
        }
      },
      "motivationalMessage": "John, your unique combination of analytical thinking and technology enthusiasm positions you perfectly for a rewarding career in software development. Remember, every expert was once a beginner. Your willingness to learn and build things puts you ahead of many. Stay curious, keep coding, and don't be afraid to fail—each bug you fix makes you a better developer. The tech industry needs problem-solvers like you. Your future in technology is bright!",
      "selectedFieldComparison": {
        "selectedField": "Software Development",
        "isGoodFit": true,
        "fitPercentage": 94,
        "comparison": "Your selection of Software Development aligns excellently with our analysis. Your logical thinking patterns, high comfort with technology, and preference for building solutions are hallmarks of successful software developers. The field matches your personality traits of independent work preference while offering opportunities for the team collaboration you indicated interest in.",
        "recommendation": "Your instinct is correct! Software Development is an excellent choice for you. We recommend focusing on full-stack development initially, then specializing based on which area excites you most—whether that's frontend user experiences, backend systems, or infrastructure/DevOps."
      },
      "analyzedAt": "2026-02-18T10:30:00.000Z",
      "userInfo": {
        "name": "John Doe",
        "age": 25,
        "education": "Bachelor's in Computer Science"
      }
    },
    "pdfUrl": "http://localhost:3001/pdfs/career-report-a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf",
    "pdfFilename": "career-report-a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf",
    "generatedAt": "2026-02-18T10:30:05.000Z"
  }
}
```

#### Error Response (400)

```json
{
  "success": false,
  "error": {
    "message": "Answers are required and must be a non-empty array"
  }
}
```

#### Error Response (500)

```json
{
  "success": false,
  "error": {
    "message": "AI Analysis failed: Invalid API key",
    "stack": "Error: AI Analysis failed..."
  }
}
```

---

### GET /api/questions

Returns all test questions.

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": 1,
        "category": "interests",
        "question": "Which activities do you find most enjoyable in your free time?",
        "options": [
          { "value": "A", "text": "Building or fixing things with my hands" },
          { "value": "B", "text": "Reading, researching, or learning new concepts" }
        ]
      }
    ],
    "totalQuestions": 25
  }
}
```

---

### GET /health

Health check endpoint.

#### Success Response (200)

```json
{
  "status": "ok",
  "timestamp": "2026-02-18T10:30:00.000Z"
}
```

---

## AI Prompt Used for Analysis

The system uses a detailed prompt to analyze career test answers. Here's the core structure:

```text
You are an expert career counselor and psychologist with 20+ years of experience. 
Analyze the following career test answers and provide a comprehensive career assessment.

USER INFORMATION:
- Name: [User Name]
- Age: [Age]
- Education: [Education]
- Current Field: [Current Field]

[If user selected a career field]:
IMPORTANT: The user has manually selected "[Field]" as their preferred career field. 
Please analyze if this is a good fit based on their answers. 
If another field would be more suitable, explain why and provide a comparison.

TEST ANSWERS:
Q1: [Question Text]
Answer: [Answer Text]

Q2: [Question Text]
Answer: [Answer Text]
...

Based on these answers, provide a detailed analysis including:
- Primary career field with match percentage
- Top 3 career fields with reasons
- Strengths (4 items)
- Areas to improve (3 items)
- Recommended skills with importance levels
- Suggested job roles with salary ranges
- 6-month roadmap with monthly tasks
- Personalized motivational message
- Selected field comparison (if applicable)

IMPORTANT: 
- Return ONLY valid JSON
- Be specific and personalized
- Provide actionable advice
- Be encouraging but realistic
```

---

## Folder Structure

```
career-test-backend/
├── src/
│   ├── config/
│   │   └── index.js          # Environment configuration
│   ├── controllers/
│   │   └── analyzeController.js  # Request handlers
│   ├── data/
│   │   └── questions.js      # Test questions (25 questions)
│   ├── routes/
│   │   └── analyze.js        # API routes
│   ├── services/
│   │   ├── openaiService.js  # OpenAI integration
│   │   └── pdfService.js     # PDF generation
│   ├── templates/
│   │   └── pdfTemplate.js    # HTML template for PDF
│   └── server.js             # Express application
├── pdfs/                     # Generated PDF storage
├── .env                      # Environment variables
├── .env.example              # Example environment file
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## Frontend Integration Example

```javascript
// Example API call from frontend
const analyzeCareerTest = async (answers, userInfo, selectedField) => {
  try {
    const response = await fetch('http://localhost:3001/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers,
        userInfo,
        selectedCareerField: selectedField,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Access analysis results
      console.log('Career Analysis:', data.data.analysis);
      
      // Download PDF
      window.open(data.data.pdfUrl, '_blank');
    } else {
      console.error('Error:', data.error.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};
```

---

## Error Handling

The API handles various error scenarios:

| Error | Status | Message |
|-------|--------|---------|
| Missing answers | 400 | Answers are required and must be a non-empty array |
| Missing user info | 400 | User info with name is required |
| Invalid OpenAI key | 500 | Invalid OpenAI API key |
| OpenAI quota exceeded | 500 | OpenAI API quota exceeded |
| PDF generation failed | 500 | PDF generation failed |

---

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a proper domain for `PDF_BASE_URL`
3. Consider using cloud storage (S3, GCS) for PDFs
4. Set up proper logging and monitoring
5. Use PM2 or similar for process management
6. Enable HTTPS

```bash
# Example PM2 deployment
pm2 start src/server.js --name career-test-backend
```
