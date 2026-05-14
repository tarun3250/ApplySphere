import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenerativeAI } from '@google/genai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.resolve();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'apex-apply-ai-secret-key-2026';

// AI Initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  
  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'UP', timestamp: new Date().toISOString() });
  });

  // Auth Endpoints (Simplified for Demo)
  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    // In a real app, query DB. Here we simulate a successful login.
    const token = jwt.sign({ email, role: 'USER' }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { email, name: 'Demo Candidate', role: 'USER' } });
  });

  // AI Resume Analyzer Endpoint
  app.post('/api/ai/analyze-resume', async (req, res) => {
    try {
      const { resumeText, jobDescription } = req.body;
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        Analyze this resume against the job description.
        Resume: ${resumeText}
        Job Description: ${jobDescription}
        
        Provide a JSON response with:
        1. Match Score (0-100)
        2. MISSING Keywords
        3. Skills to highlight
        4. Suggested Resume Enhancements
        5. A professional cover letter draft.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      res.json({ analysis: response.text() });
    } catch (error) {
      console.error('AI Analysis Error:', error);
      res.status(500).json({ error: 'Failed to analyze resume' });
    }
  });

  // Job Tracker Endpoints (Memory Mock)
  const jobs: any[] = [];
  app.get('/api/jobs', (req, res) => res.json(jobs));
  app.post('/api/jobs', (req, res) => {
    const job = { id: Date.now(), ...req.body, status: 'Applied', createdAt: new Date() };
    jobs.push(job);
    res.status(201).json(job);
  });

  // Vite Middleware for Dev, Static Files for Prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 APEX ApplyAI Server running at http://localhost:${PORT}`);
  });
}

startServer();
