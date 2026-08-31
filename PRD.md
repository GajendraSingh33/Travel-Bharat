# Product Requirement Document (PRD) - Travel Bharat

## 1. Project Title & Overview
**Project Name:** Travel Bharat – India Temple Heritage & Pilgrimage Portal  
**Target Domain:** Cultural Tourism, Sacred Heritage Digital Preservation & Pilgrimage Travel Facilitation.

---

## 2. Problem Statement
Pilgrims and cultural heritage enthusiasts visiting temples across India face significant challenges:
- Difficulty finding authentic, complete, and verified temple history.
- Lack of clarity regarding darshan timings, morning/evening Aarti schedules, special poojas, and annual festivals.
- Limited visibility into pilgrimage circuits (e.g. 12 Jyotirlinga, Char Dham, Shakti Peethas) and nearby facilities (dharamshalas, vehicle parking, free prasadam halls).
- Absence of a centralized, trusted, digital preservation source.

---

## 3. Primary Objectives
1. **Centralized Repository:** Archive comprehensive temple heritage information across all Indian states.
2. **Accurate Pilgrim Details:** Display daily pooja timetables, darshan slot guidelines, dress code rules, and nearby amenities.
3. **Location-Based Discovery:** Multi-layered search and filter system by state, city, deity category, and pilgrimage circuit tag.
4. **Cultural Preservation:** Highlight architectural era, sacred legends, and visitor conduct etiquette.

---

## 4. Scope of Work

### In-Scope (Phase 1)
- **Responsive Web Portal:** Desktop and mobile optimized layout built with React and Tailwind CSS.
- **State & City Directory:** Interactive search and filters.
- **Temple Details Page:** Tabbed interface featuring History, Deity Significance, Ritual Timetable, Darshan Dress Code, Festivals, and Nearby Facilities.
- **Sacred Circuits Guide:** Curated itinerary routes (12 Jyotirlinga, Char Dham, South India Golden Circuit).
- **Admin Management System (CMS):** Content submission, approval workflows, featured status toggle, and full CRUD.
- **Itinerary Planner:** Save temples locally and generate printable visit guides.

### Out of Scope
- Online monetary donation or commercial puja booking gateway.
- Live streaming of darshan feeds.
- Native mobile applications (iOS / Android binaries).
- Multilingual voice bot.

---

## 5. Functional Requirements

### 5.1 Temple Information Management
- Temple Name, Slug, State, City, Coordinates.
- Historical Background, Construction Era, Architectural Style (Nagara, Dravidian, Solanki, Kalinga).
- Presiding Deity Details & Category (Shaivism, Vaishnavism, Shaktism, Sikhism, Surya).

### 5.2 Pilgrimage & Visitor Information
- Aarti & Pooja Schedules (Mangala Aarti, Bhog Aarti, Shringar Aarti, Sandhya Aarti).
- General vs VIP Darshan Slot Timings.
- Dress Code & Conduct Guidelines (compulsory attire, shoe deposit rules, leather restrictions).
- Camera & Mobile Policy.
- Nearby Facilities: Dharamshalas & Hotels, Rail/Airport Connectivity, Multi-level Parking, Prasadam Canteens.

### 5.3 Admin Content Management System (CMS)
- Secure JWT-based Admin authentication.
- Approval Workflow: Approve or reject submitted temple entries.
- Toggle Featured Status for homepage highlights.
- Database Seed trigger endpoint (`/api/seed`).

---

## 6. Non-Functional Requirements
- **Performance:** Page load time ≤ 3 seconds via Vite bundle optimization.
- **Usability:** Culturally respectful design system with saffron/gold gradients, Cinzel typography, and intuitive UX.
- **Security:** Password hashing with `bcryptjs`, JWT bearer authentication, and input sanitization.
- **Scalability:** Mongoose schema structured to support scaling to all 28 states and 8 union territories.

---

## 7. Technology Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion, React Router v7, React Icons.
- **Backend:** Node.js, Express.js (ES Modules).
- **Database:** MongoDB (Mongoose ORM) with in-memory fallback.
