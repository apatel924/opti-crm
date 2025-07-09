# 👁️ OptiVue – Optometry Management System

![OptiVue Hero](./src/dashboard.png)

**OptiVue** is a modern, full-stack clinic management system for optometrists and clinic staff. It streamlines patient workflows—appointments, exams, lab orders, billing, and communications—all in a single Next.js + TypeScript + Tailwind CSS app.

---

## 🚀 Live Demo

Deployed on Netlify:  
**https://optivue.netlify.app/dashboard**  
_(No public demo yet—contact the team for a walkthrough.)_

---

## 📸 Screenshots

|             Dashboard             |              Patient List               |            Patient Profile            |             Appointment Calendar             |
| :-------------------------------: | :-------------------------------------: | :-----------------------------------: | :------------------------------------------: |
| ![Dashboard](./src/dashboard.png) | ![Patient List](./src/patient-list.png) | ![Profile](./src/patient-profile.png) | ![Appointments](./src/appointments-page.png) |

|             Examinations             |          Lab Management          |                Billing                |                 Communication Log                 |
| :----------------------------------: | :------------------------------: | :-----------------------------------: | :-----------------------------------------------: |
| ![Exams](./src/examination-page.png) | ![Lab](./src/lab-management.png) | ![Billing](./src/patient-billing.png) | ![Communication](./src/patient-communication.png) |

| Staff Roles (AI Assistant)  |                 Reports                  |       Inventory (Lab Order Detail)       |
| :-------------------------: | :--------------------------------------: | :--------------------------------------: |
| ![Roles](./src/ai-chat.png) | ![Reports](./src/dashboard-extended.png) | ![Inventory](./src/lab-order-detail.png) |

|              New Patient              |           Patient Orders            |                   Quick Billing                   |                 Mobile View (Coming Soon)                 |
| :-----------------------------------: | :---------------------------------: | :-----------------------------------------------: | :-------------------------------------------------------: |
| ![New Patient](./src/new-patient.png) | ![Orders](./src/patient-orders.png) | ![Quick Billing](./src/invoice-quick-billing.png) | _Additional modules and screens under active development_ |

---

## ✨ Features

- **📊 Dashboard:** Real-time metrics for appointments, lab orders, and billing
- **👥 Patient Management:** Advanced search, medical & visit history, profile view
- **📅 Appointments:** Day/calendar view, check-in/out workflow, status tracking
- **🧪 Exams & Lab:** Assign, filter, and complete exams & lab orders
- **💵 Billing:** Quick billing, invoice generation, payment tracking
- **🔐 Role-Based Access:** Custom dashboards for front-desk, optometrists, admins
- **📈 Reporting:** Patient visits, revenue analytics, staff performance
- **⚙️ Settings:** Clinic info, user management, notifications, and more
- **💾 Auto-Save:** Data stored locally as you work, ready for backend sync
- **🛠️ Modular Architecture:** Decoupled components, ready for API/database integration

---

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **React 19** & **TypeScript**
- **Tailwind CSS** & **ShadCN UI**
- **NextAuth.js** (planned)
- **PostgreSQL** or **MongoDB** (backend TBD)
- **class-variance-authority**, **clsx**, **tailwind-merge**

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/optivue.git
   cd optivue
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env.local` file**  
   (You can skip this for local demo, but for API/backend integration you'll need it.)

   ```
   NEXT_PUBLIC_API_URL=https://api.optivue.app
   DATABASE_URL=your_database_url_here
   NEXTAUTH_URL=https://your-optivue-site.netlify.app
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

#### 🔧 Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Run production build locally
- `npm run lint` – Run ESLint

---

#### 📂 Project Structure
