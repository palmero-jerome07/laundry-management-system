#  Overview

The **Laundry Management System API** is a backend service built using **Javascript**, and **MySQL**.  
This system automates customer records, order tracking, and payment management for laundry shop operations.

---

##  Features

-  Manage customer records
-  Display available services and rates
-  Create and track laundry orders
-  Handle payments and status updates
-  Retrieve complete order summaries
-  Real-time API testing using **Thunder Client/Postman**

---
## Main API routes (summary)
- Customers: /api/customers — list, create, update, get by id/name  
- Services: /api/services — list, create, get by id/name  
- Orders: /api/orders — list, create, get by id, status updates, filters  
- Order Items: /api/order-items — add, update items  
- Payments: /api/payments — list, create, update status

Refer to src/routes/* and Swagger UI for full request/response specs.

Swagger UI: [http://localhost:PORT/api-docs](http://localhost:3000/api-docs/)

---

Developed by: **`GitDefenders`**
