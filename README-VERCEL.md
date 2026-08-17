# Quantrex Solutions — Vercel Static Package

This archive is a pre-built static deployment bundle for Vercel. It does not require a Node.js server or runtime API.

## Deploy with Vercel

1. Extract the ZIP file.
2. Import the extracted folder into Vercel, or run `vercel --prod` from that folder.
3. If Vercel asks for a framework, choose **Other** or **Vite**.
4. Set the output directory to `.` if prompted.

The included `vercel.json` provides SPA fallback routing so the site continues to work when a visitor opens a direct URL.