
# 🧺 SaafBazzar – Empowering Street Food Vendors Through Smart Sourcing

> **"Connecting India’s local food heroes to affordable, trusted, and tech-driven supply chains."**

**SaafBazzar** is a full-stack web application built during **Tutedude’s Web Development Hackathon 1.0** to solve a real-world problem — the raw material sourcing struggle faced by India’s street food vendors. It’s designed to bridge the gap between small-scale vendors and reliable suppliers using technology, AI, and community-driven logistics.

---

## 🔍 Problem Statement

In India, over 2 million street food vendors operate daily without structured supply chains. Our research identified that:

- 83% buy raw materials daily at inconsistent prices  
- Most rely on word-of-mouth or distant markets  
- No unified platform exists to verify quality, pricing, or supplier reliability  
- Vendors often operate in cash, with no tracking, scheduling, or inventory planning  

These inefficiencies increase cost, reduce profits, and limit scalability.

---

## 🎯 Our Solution: SaafBazzar

SaafBazzar is a dual-role marketplace built for:

- 🧑‍🍳 **Street Vendors** – to discover affordable, verified suppliers, place group orders, track deliveries, and forecast needs.  
- 🏪 **Suppliers** – to showcase inventory, reach hyperlocal markets, manage logistics, and grow visibility.

---

## ✨ Features

| Module                | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| 🔍 Supplier Discovery | Browse by product, price, location, or ratings                             |
| 💬 Verified Profiles  | Supplier profiles include reviews, verification tags, trust ratings        |
| 🧾 Smart Price Engine | Auto-compares supplier prices in real-time                                 |
| 🤝 Group Ordering     | Vendors nearby can form groups for bulk discounts                          |
| 🚚 Order Tracking     | Track order status, dispatch, and expected arrival                         |
| 🤖 AI Assistant       | Suggests quantities based on past trends, festival cycles, and weather     |
| 🔐 Firebase Auth      | Secure role-based access for suppliers and vendors                         |
| 📊 Analytics Panel    | Suppliers get insights into order frequency, product demand, and revenue   |
| 📱 Mobile Responsive  | Works seamlessly on low-end smartphones and slow networks                  |

---

## 🧠 Research & Validation

We conducted:

- ✅ Field Interviews with 12 vendors in 3 urban slums and market areas  
- ✅ Surveys about buying habits, pricing issues, and trust gaps  
- ✅ Mock tests with a clickable prototype to gauge usability  

**Key Insight:** Vendors are eager for better sourcing but fear tech complexity. Hence, we focused on **ease, local language support (coming soon), and mobile-first design.**

---

## 🏗️ Tech Stack

| Layer         | Tools / Technologies                            |
|---------------|--------------------------------------------------|
| Frontend      | React.js, Tailwind CSS, React Router            |
| Backend       | Node.js, Express.js, REST APIs                  |
| Database      | MongoDB Atlas (Mongoose)                        |
| Auth & Roles  | Firebase Authentication                         |
| Hosting       | Vercel (frontend), Render (backend)             |
| AI Integration| OpenAI GPT-4 API (predictive assistant)         |
| DevOps        | GitHub, Postman, Insomnia, Railway              |
| UI/UX Design  | Figma, Whimsical, Canva,lovableAI                        |

---

## 📐 Architecture Overview

```
React (Vendor/Supplier UI)
   ↓
Express.js API (Node.js)
   ↓
MongoDB Atlas ←→ Firebase Auth
   ↓
GPT-4 Assistant (Order Forecasting, Chat Help)
```

---

## 📦 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/saafbazzar.git
cd saafbazzar

# Backend
cd server
npm install
# Set environment variables: MongoDB_URI, Firebase config, OpenAI_KEY
npm run dev

# Frontend
cd ../client
npm install
npm start
```

---

## 🚀 Future Enhancements

- 📱 Android App via React Native or PWA  
- 🌐 Local language support (Hindi, Tamil, Bengali, etc.)  
- 💸 Integrated UPI/Digital Payments for cashless operations  
- 📦 Inventory auto-reminders based on AI predictions  
- 🛺 Last-mile delivery coordination via WhatsApp or IVR  
- 🧾 GST-compliant invoicing for suppliers  

---

## 👨‍👩‍👧‍👦 Team SaafBazzar

| Name         | Role                  | Responsibility                         |
|--------------|-----------------------|----------------------------------------|
| Faisal Kittur| Backend Developer     | APIs, Database, Firebase Integration   |
| Gagan Halmath| Frontend Developer    | UI/UX, Routing, State Management       |
| Anant Inamdar| Research & UX Testing | Vendor interviews, surveys, validation |


---

## 📽️ Project Links

- 🔗 **Live Web App**: [(https://saaf-bazaar-26gf.vercel.app/)](https://saaf-bazaar-26gf.vercel.app/)  
---

## 🏁 Submission Checklist

- ✅ Functional Web App (Live and tested)  
- ✅ Demo Video (under 5 minutes)  
- ✅ GitHub with all source code  
- ✅ Team roles, problem explanation, feature demo  
- ✅ LinkedIn post with reflection  

---

## 📢 LinkedIn Reflection

> We shared our build journey, vendor conversations, AI integration trials, and what it meant to solve a hyperlocal real-world problem. Read more here:

🔗 [Our LinkedIn Hackathon Reflection Post]((https://www.linkedin.com/in/anantinamdar77/))

---

## 📝 License

This project is under the MIT License.  
Created as a learning and social good initiative for **Tutedude’s Hackathon 2025**.

---

> “When local food vendors thrive, cities eat better. SaafBazzar is our step towards that future.”  
> – Team SaafBazzar 🇮🇳
