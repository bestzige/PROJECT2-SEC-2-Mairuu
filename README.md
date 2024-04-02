# PROJECT1-SEC-2-Mairuu

## Member List:

| รหัสนักศึกษา | ชื่อ - นามสกุล       | อีเมล                        | สัดส่วนเปอร์เซ็นต์การทำงาน |
|-----------------|----------------------|-------------------------------|-------------|
| 65130500073    | Watchara Santawee    | watchara.sant@kmutt.ac.th    | 0%         |
| 65130500105    | Natthaphol Nirattsaikul | natthaphol.nira@kmutt.ac.th | 0%         |
| 65130500124    | Pasit Winyan         | pasit.winy@kmutt.ac.th        | 0%         |

## รายละเอียดงานแต่ละส่วน
1. **Watchara Santawee**
   - Page: Home, Customer(Order), Login
   - Presentation video

2. **Natthaphol Nirattsaikul**
   - Page: Employee(TableOperation, OrderManagement)
   - README.md

3. **Pasit Winyan**
   - Page: Admin(TableManament, ProductManagement)
   - Diagram

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
   - Press service-call to call the staff if assistance is needed
 
- Order history
   - Press the Order-history button in the lower right corner of the screen to view your order history.
   
### For Admin
- Table Management
   - Press the plus button at the bottom to add tables.
   - To view details of each table, toggle down the table details.
   - Modify table details or delete specific tables as needed.
 - Product Management
   -

### For Employee
1. *************

## Video demo features:

[PresentationFeatureGame](https://drive.google.com/file/d/13A-dnV3qxfUE1h_pC-i49TGI2Oe3JQVE/view?pli=1)

## References:

- POS (https://pos-restaurantprogram.blogspot.com/2013/06/ipad-take-order.html) : Customer page(การสั่งออเดอร์)
- Chokdeedimsum (https://www.chokdeedimsum.com/menu) : Main idea


  
