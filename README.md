# PROJECT1-SEC-2-Mairuu

## Member List:

| รหัสนักศึกษา | ชื่อ - นามสกุล       | อีเมล                        | สัดส่วนเปอร์เซ็นต์การทำงาน |
|-----------------|----------------------|-------------------------------|-------------|
| 65130500073    | Watchara Santawee    | watchara.sant@kmutt.ac.th    | 40%         |
| 65130500105    | Natthaphol Nirattsaikul | natthaphol.nira@kmutt.ac.th | 30%         |
| 65130500124    | Pasit Winyan         | pasit.winy@kmutt.ac.th        | 30%         |

## รายละเอียดงานแต่ละส่วน
1. **Watchara Santawee**
   - Page: Home, Customer(Order), Login.
   - Presentation video.

2. **Natthaphol Nirattsaikul**
   - Page: Employee(TableOperation, OrderManagement).
   - README.md

3. **Pasit Winyan**
   - Page: Admin(TableManament, ProductManagement).
   - Diagram.

## Features List:

1. **Customer**

   - Change languange : สามารถกดเปลี่ยนภาษาได้(ไทย-อังกฤษ)
   - Category list : เลือกหมวดหมู่อาหาร
   - Menu list : เลือกเมนูอาหาร
   - Order button : กดสั่งอาหาร
   - Service-call : กดเรียกพนักงาน(ไม่สามารถเรียกซ้ำได้ถ้าหากพนักงานยังไม่มา)
   - Order history : ดูประวัติการสั่งอาหารได้

2. **Login**
   - Login : มีระบบล็อกอินเพื่อแยกสิทธิ์การเข้าถึงของระบบระหว่างแอดมินและพนักงานทั่วไป 

4. **Admin**
   - Full access : สามารถเข้าถึงได้ทุกส่วนของแอพ รวมถึงในส่วนของพนักงานทั่วไป 
   - Table Management : การจัดการโต๊ะในส่วนของแอดมิน
     - ADD NEW Table : เพิ่มโต๊ะใหม่เข้าสู่ระบบ
     - UPDATE Table : แก้ไขรายละเอียดของโต๊ะ(ชื่อโต๊ะ, ขนาดโต๊ะ)
     - DELETE Table : ลบโต๊ะออกจากระบบ
   - Product Management : การจัดการสินค้า
     - ADD NEW Product : เพิ่มสินค้าเข้าในระบบ
     - UPDATE Product : แก้ไขรายละเอียดของสินค้า (ชื่อสินค้า, หมวดหมู่สินค้า, ราคาสินค้า, รูปสินค้า, สถานะ)
     - DELETE Product : ลบสินค้าออกจากระบบ
  
5. **Employee**
   - Table Operation : การจัดการโต๊ะในส่วนของพนักงานหน้าร้าน
     - Table availability : เปิด/ปิด/เปลี่ยนโต๊ะสำหรับลูกค้า
     - Table Detail : แสดงรายละเอียดของออเดอร์ของโต๊ะนั้นๆ
     - Change Order-items Status : เปลี่ยนสาถานะของออเดอร์ที่หน้าร้านได้เมื่อมีรายการออเดอร์ไม่ตรงกับที่ลูกค้าได้รับ(pending, cancelled, completed)
     - Submit Order : กดปิดออเดอร์เพื่อคอนเฟิร์มการจ่ายเงินของลูกค้า 
   - Order Management : เป็นระบบภายในครัว ไว้สำหรับจัดการสถานะของออเดอร์(ยืนยัน/ยกเลิก)
     - Order list : แสดงจำนวนออเดอร์ที่ลูกค้าสั่งเข้ามาตามลำดับ
     - Change Order-items Status : เปลี่ยนสาถานะของออเดอร์ที่ลูกค้าสั่งว่าถูกยกเลิอกหรือจัดส่งแล้ว (cancelled, completed)
    
## Instruction Manual:

### For customer

- Order food
   - Scan the QR code
   - Select the desired food category
   - Choose the desired menu item
   - Place the order
   - Wait for the food to be served
- Service-call
   - Enter the category or menu selection page. 
   - Press service-call to call the staff if assistance is needed
- View food order history
   - Press the Order-history button in the lower right corner of the screen to view your order history.
   
### For Admin
- Choose task to be done
   - Table Management
      - Add new Table.
         - Press the plus button at the bottom of table list to add tables.
      - Update table detail.
         - To view details of each table, toggle down the table details.
         - Modify table details or delete specific tables as needed.
    - Product Management
      - Add new Product.
         - Press the Add Product button at the right side of a category.
         - Insert details of product.
         - Press the Add button to add a new product in that category.
         - Press the Cancel button to cancel.
      - Update product detail.
         - Choose product to edit products within each category.
         - If press the Edit button Product details modal will be show.
         - Edit details of product.
         - Press the Save button to save a product.
         - Press the Cancel button to cancel.
       - Delete product.
         - Choose product to delete products within each category.

### For Employee
- Choose task to be done
  - Table Operation
    - Open table for customer.
       - Press on an available table to open it for customers.
       - Press the Get Bill button to generate QR code.
       - Give the QR code to the customer.
    - View table details.
       - Press on the opened table(there's a person icon in the top right).
    - Change table for customer.
       - Press on the table of their order to view table details.
       - Press the
    - Customers pay their bills.
       - Press on the table of their order to view table details.
       - Verify the accuracy of the menu list. If it's uncorrect you can change it.
       - Receive money from customers (cash or scan payment)
       - Press the Submit Order button.
    - Change status of order items.
       - Press on the table of their order to view table details.
       - Press the Edit icon at right side of each order items.
       - Change status.
    - Change table for customer.
       - Press on the table of their order to view table details.
       - Press on the change table at bottom to view available table.
       - Choose the desired table for customer.
  - Order Management
    - Confirm order items
       - Press the green icon at right side of each order items to confirm order and change it's status to completed.
       - Press the red icon at right side of each order items to cancel order and change it's status to cancelled.

## Video demo features:

[PresentationFeatureGame](https://drive.google.com/file/d/13A-dnV3qxfUE1h_pC-i49TGI2Oe3JQVE/view?pli=1)

## References:

- POS (https://pos-restaurantprogram.blogspot.com/2013/06/ipad-take-order.html) : Customer page(การสั่งออเดอร์).
- Chokdeedimsum (https://www.chokdeedimsum.com/menu) : Main idea, Menu images.
- QR code (https://goqr.me/api/doc/create-qr-code/) : Get bill(fuction that generated QR code of order).

  
