// src/routes/askAi.routes.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// =============== Helper Functions =================
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const EDUCATION_KEYWORDS = [
  // common words / actions
  "exam",
  "exams",
  "study",
  "syllabus",
  "curriculum",
  "chapter",
  "homework",
  "assignment",
  "quiz",
  "mock",
  "practice",
  "notes",
  "revision",
  "question",
  "solve",
  "problem",
  "formula",
  "theorem",
  "proof",
  "derivation",
  "explain",
  "example",
  "concept",
  "tutorial",
  "lecture",
  "class",
  "lesson",
  "paper",
  "past paper",
  "sample paper",
  "mcq",
  "subject",
  "topic",
  "topicwise",
  "tips",
  "strategy",
  "timetable",
  "study plan",
  "study-plan",
  "revision plan",

  // subjects & branches
  "physics",
  "chemistry",
  "mathematics",
  "math",
  "biology",
  "botany",
  "zoology",
  "english",
  "hindi",
  "history",
  "geography",
  "political science",
  "economics",
  "accounting",
  "commerce",
  "business studies",
  "statistics",
  "computer",
  "computer science",
  "programming",
  "data structures",
  "algorithms",
  "dbms",
  "operating system",
  "networks",
  "ai",
  "artificial intelligence",
  "machine learning",
  "deep learning",
  "datascience",
  "data science",
  "calculus",
  "algebra",
  "geometry",
  "trigonometry",
  "linear algebra",
  "probability",
  "statistics",
  "organic chemistry",
  "inorganic chemistry",
  "physical chemistry",
  "biochemistry",
  "anatomy",
  "physiology",
  "microbiology",

  // degrees / courses / levels
  "btech",
  "be",
  "mtech",
  "bsc",
  "msc",
  "bca",
  "mca",
  "bcom",
  "mcom",
  "mba",
  "phd",
  "doctorate",
  "masters",
  "postgraduate",
  "undergraduate",
  "graduate",
  "diploma",
  "certificate",
  "degree",
  "md",
  "mbbs",
  "bds",
  "bnursing",
  "m.pharm",
  "pharmd",
  "allied health",
  "diploma",
  "certificate course",
  "short term course",

  // entrances & popular exams
  "jee",
  "jee mains",
  "jee advanced",
  "neet",
  "neet ug",
  "upsc",
  "upsc cse",
  "cse prelims",
  "cse mains",
  "gate",
  "cat",
  "xat",
  "mat",
  "snap",
  "nmims",
  "clat",
  "ailet",
  "ssc",
  "ssc cgl",
  "bank po",
  "ibps",
  "sbi po",
  "railways",
  "state psc",
  "ugc net",
  "csir net",
  "sat",
  "act",
  "gre",
  "gmat",
  "toefl",
  "ielts",
  "ap",
  "ib",
  "alevel",
  "a-level",
  "a levels",
  "ias",
  "ips",
  "ias exam",
  "nda",
  "cds",
  "afcat",
  "ssc je",
  "neet pg",
  "aiims",
  "aiims mbbs",
  "pmcet",
  "neet pg",

  // career & higher studies
  "career",
  "career guidance",
  "career options",
  "job",
  "jobs",
  "internship",
  "internships",
  "placement",
  "placements",
  "salary",
  "scope",
  "prospects",
  "higher studies",
  "ms",
  "m.s.",
  "masters abroad",
  "study abroad",
  "scholarship",
  "fellowship",
  "admissions",
  "admission",
  "eligibility",
  "eligibility criteria",
  "cutoff",
  "cut-off",
  "rank",
  "percentile",
  "merit",
  "application",
  "registration",
  "form",
  "counselling",
  "counseling",
  "seat allotment",
  "seat matrix",

  // institutions / streams
  "iit",
  "nit",
  "iim",
  "aiims",
  "iisc",
  "du",
  "university",
  "college",
  "institute",
  "school",
  "coaching",
  "coaching centre",
  "mentor",
  "tutor",
  "online course",
  "mooc",
  "coursera",
  "edx",
  "udemy",
  "khan academy",
  "nptel",

  // practicals / projects
  "practical",
  "lab",
  "laboratory",
  "experiment",
  "project",
  "dissertation",
  "thesis",
  "viva",
  "project report",
  "assignment submission",
  "grading",
  "marks",
  "marksheet",
  "score",
  "grade",
  "gpa",
  "cgpa",
  "transcript",
  "rubric",

  // certification
  "aws",
  "azure",
  "ccna",
  "cisco",
  "oracle",
  "cfa",
  "ca",
  "cs",
  "cma",
  "acca",
  "chartered",
  "certification",
  "certified",

  // programming
  "python",
  "java",
  "c++",
  "c#",
  "javascript",
  "sql",
  "r programming",
  "matlab",
  "excel",
  "pandas",
  "numpy",
  "tensorflow",
  "pytorch",
  "scikit-learn",
  "data visualization",
  "tableau",
  "power bi",

  // misc study
  "how to prepare",
  "how to study",
  "which course",
  "which college",
  "which university",
  "scope of",
  "is it good",
  "should i",
  "can i",
  "after 12th",
  "after 10th",
  "after graduation",
  "best books",
  "reference books",
  "textbook",
  "previous year",
  "previous-year",
  "previousyears",
  "past-year",
  "past year paper",
];

const EDUCATION_PATTERNS = [
  /\bhow to prepare\b/i,
  /\bhow to study\b/i,
  /\bhow (do i|should i|can i)\b/i,
  /\b(what is|what's|define|explain)\b/i,
  /\b(difference between|compare)\b/i,
  /\b(scope of|career after|career in)\b/i,
  /\b(which (course|college|university|exam|career|stream|specialisation|specialization))\b/i,
  /\b(previous year|past paper|sample paper|mock test|mock exam|practice paper)\b/i,
  /\b(admission|admissions|eligibility|cutoff|cut-off|rank|percentile|counseling|counselling)\b/i,
  /\b(scholarship|fellowship|internship|placement|jobs|job opportunities)\b/i,
];

function isStudyOrCareerQuery(q) {
  if (!q || typeof q !== "string") return false;
  const s = q.trim().toLowerCase();

  for (const re of EDUCATION_PATTERNS) {
    if (re.test(s)) return true;
  }
  for (const kw of EDUCATION_KEYWORDS) {
    const re = new RegExp("\\b" + escapeRegExp(kw) + "\\b", "i");
    if (re.test(s)) return true;
  }
  return false;
}

// --- Gemini API config ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// =============== API Route =================
router.post("/ask-ai", async (req, res) => {
  console.log("✅ /api/ask-ai hit");
  try {
    const { question } = req.body || {};
    if (!question?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Question is required." });
    }

    if (!isStudyOrCareerQuery(question)) {
      return res.json({
        success: true,
        answer:
          "🙏 I can only help with study, exam prep, and career guidance. Please ask something in those areas!",
      });
    }

    console.log("✅ askAi route loaded");
console.log("Using Gemini Model:", "gemini-1.5-flash-latest");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    // Call Gemini
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are Learnex AI, a helpful mentor. ONLY answer questions about study, exams, or career guidance. 
Be concise, structured (bullets/steps), and include formulas when relevant.\n\nQuestion: ${question}`,
            },
          ],
        },
      ],
    });

    console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);
    const answer =
      result.response.text() ||
      "Sorry, I couldn't generate an answer right now.";

    return res.json({ success: true, answer });
  } catch (err) {
    console.error("Gemini error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "AI service error." });
  }
});

export default router;
