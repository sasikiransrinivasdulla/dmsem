# 📚 Data Mining Learning Tracker

A comprehensive web-based study tracker for Data Mining course with progress tracking, YouTube integration, and PDF notes viewer.

## 🚀 Features

- ✅ Complete syllabus coverage for all 5 units
- 📊 Real-time progress tracking (overall & per unit)
- 🎨 Light/Dark theme toggle
- 📄 Integrated PDF viewer for unit notes
- 🎥 Direct YouTube search for each topic
- 💾 Browser localStorage - progress persists after refresh
- ⭐ Important topics highlighted
- 📱 Fully responsive design

## 📁 Folder Structure

```
dmexp/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── pdfs/              # Add your PDF notes here
    ├── unit1.pdf      # Unit 1 notes
    ├── unit2.pdf      # Unit 2 notes
    ├── unit3.pdf      # Unit 3 notes
    ├── unit4.pdf      # Unit 4 notes
    └── unit5.pdf      # Unit 5 notes
```

## 📄 Adding PDF Notes

1. Create a `pdfs` folder in the same directory as `index.html`
2. Add your unit notes with these **exact names**:
   - `unit1.pdf`
   - `unit2.pdf`
   - `unit3.pdf`
   - `unit4.pdf`
   - `unit5.pdf`

## 🌐 How to Use Locally

### Option 1: Simple HTTP Server (Recommended)

**Using Python:**
```bash
cd dmexp
python -m http.server 8000
# or for Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

**Using Node.js (http-server):**
```bash
npx http-server dmexp -p 8000
```

**Using PHP:**
```bash
cd dmexp
php -S localhost:8000
```

### Option 2: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## 🚀 Hosting Options

### 1. **GitHub Pages** (Free & Easy)

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Data Mining Tracker"

# Create a GitHub repository and push
git remote add origin https://github.com/YOUR-USERNAME/data-mining-tracker.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
# Your site will be at: https://YOUR-USERNAME.github.io/data-mining-tracker/
```

### 2. **Netlify** (Drag & Drop)

1. Go to [netlify.com](https://www.netlify.com/)
2. Drag the `dmexp` folder to Netlify
3. Done! Get instant URL

### 3. **Vercel** (Quick Deploy)

```bash
npx vercel
```

### 4. **Surge.sh** (Command Line)

```bash
npm install -g surge
cd dmexp
surge
```

## 🎯 Important Topics Marked

The following topics are marked as important (⭐) based on exam relevance:

**Unit 1:**
- Data Cube and OLAP Operations
- Data Objects & Attribute Types
- Basic Statistical Descriptions
- Similarity and Dissimilarity Measures

**Unit 2:**
- All preprocessing techniques (Cleaning, Integration, Reduction, Transformation, Discretization)

**Unit 3:**
- Decision Tree & Attribute Selection Measures
- Bayesian Classification (Bayes Theorem, Naïve Bayes)
- Model Evaluation

**Unit 4:**
- Frequent Itemset Generation
- Apriori Algorithm
- FP-Growth Algorithm

**Unit 5:**
- K-Means Algorithm
- Hierarchical Clustering
- DBSCAN Algorithm

## 💡 Tips

- Check topics as you complete them
- Use the PDF viewer to review notes
- Click YouTube buttons for video tutorials
- Progress is automatically saved in your browser
- Switch themes for comfortable studying

## 🔧 Troubleshooting

**PDFs not loading?**
- Make sure you're running a local server (not opening directly as file://)
- Check PDF file names match exactly (case-sensitive)
- Ensure PDFs are in the `pdfs/` folder

**Progress not saving?**
- Check if browser cookies/localStorage is enabled
- Don't use incognito/private mode

## 📝 License

Free to use for educational purposes.

---

**Good luck with your Data Mining exams!** 🎓✨
