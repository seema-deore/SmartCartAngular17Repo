📄 SmartCart – E-commerce Application (Angular 17)

🚀 Project Overview

SmartCart is a modern E-commerce web application built with Angular 17.
It showcases features like product browsing, cart management, user authentication, and order checkout, designed to provide a real-world shopping experience.



✨ Key Features

🛒 Product Listing – Browse products with categories & filters

📦 Cart Management – Add, remove, and update product quantities

🔑 Authentication – Login/Signup using JWT-based authentication

👨‍💻 Role-based Access – Admin & Customer modules with Angular route guards

💳 Checkout Process – Review cart and place orders

🔍 Search & Sort – Quickly find products by name or category

📱 Responsive Design – Optimized for desktop and mobile



🛠️ Tech Stack

Frontend: Angular 17, Bootstrap 5, CSS, HTML 5 

Backend: [API Source / Mock API]

Authentication: JWT with role-based access

Deployment: [Vercel / Netlify / GitHub Pages]

📂 Project Structure:

SmartCart
    .angular/
    .git/
    .vscode/
    .backend/
    ├── node_module/
    ├── .env
    ├── server.js
    ├── ........
    ├── ........
            
    src/
    ├── app/
    |    ├── admin/   
    │          ├── (category-management, dashboard, orders, overview, product-management, admin.routes.ts)
    │    ├── auth/      
    │           ├── (login, register)  
    │    ├── customer/           
    │           ├── (banner, cart, chatbot, checkout, home, product-details, product-list, wishlist, customer.routes.ts)
    │    ├── filters/     
    │           ├── (product-search.pipe.ts)    
    │    ├── guards/ 
    │           ├── (admin, customer, auth)           
    │    ├── services/
    │           ├── (auth, cart, chat, dashboard, product, store-location, wishlist)  
    │    ├── shared/
    │           ├── (header, footer, store-map)      
    ├── assets/                 # images, icons, .json files                
    ├── proxy.conf.json         # To resove Cross-Origin Resource Sharing error
    ├── README.md 
    ├── ............
    ├── ...........

⚡ Angular 17 Learnings

✅ Standalone Components & Signals for state management

✅ Optimized change detection for better performance

✅ Lazy Loading & Route Guards for modular architecture

✅ Reactive Forms with validations

✅ REST API integration for authentication & product data

📸 Screenshots (Optional)

Add screenshots of Home Page, Product Page, Cart, Checkout for better visualization.
[Home-page](home-page.png)
[Home-page-scroll-content](image-1.png)
[Login-page](image-2.png)
[Product-detail-page](image-3.png)
[Chatbot](image-4.png)
[Order-summary-page](image-5.png)
[Admin-dashboard](image-6.png)

▶️ Run Locally: 


# Clone repository
git clone https://github.com/seema-deore/SmartCartAngular17Repo

# Navigate to project folder
cd smartcart

# Install dependencies
npm install

# Start development server
ng serve -o

🌍 Live Demo

🔗 Deployed SmartCart App Link: 


📧 Contact:  seema.ideore@gmail.com

🔗 LinkedIn Profile: https://www.linkedin.com/in/seema-ideore/
