#Bài 2: Các Chiến Lược Phân Mảnh Dữ Liệu (Database Partitioning Strategies)

Trong thiết kế hệ thống lớn, việc quản lý một bảng dữ liệu khổng lồ trong duy nhất một kho lưu trữ thường dẫn đến nghẽn cổ chai. Phân mảnh (Partitioning) là giải pháp chia nhỏ dữ liệu để tối ưu hiệu suất và khả năng mở rộng.

---

## 1. Phân mảnh theo chiều ngang (Horizontal Partitioning / Sharding)

### 🔹 Khái niệm
Đây là kỹ thuật chia tách dữ liệu dựa trên các **hàng (Rows)**. Mỗi phân vùng (Partition) giữ nguyên cấu trúc bảng (Schema) nhưng chỉ chứa một tập hợp các bản ghi nhất định dựa trên một "khóa phân mảnh" (Shard Key).

### 🔹 Minh họa dữ liệu
Giả sử hệ thống quản lý người dùng toàn cầu với bảng `Users`. Chúng ta thực hiện Sharding dựa trên cột `Country`.

**Bảng gốc (Conceptual View):**
| ID | Username | Country | Email |
|:---|:---|:---|:---|
| 1 | minh_quan | Vietnam | quan@dev.vn |
| 2 | alex_smith | USA | alex@dev.us |
| 3 | thu_ha | Vietnam | ha@dev.vn |

**Sau khi phân mảnh:**

* **Phân vùng 1 (Vietnam Shard):**
    | ID | Username | Country | Email |
    |:---|:---|:---|:---|
    | 1 | minh_quan | Vietnam | quan@dev.vn |
    | 3 | thu_ha | Vietnam | ha@dev.vn |

* **Phân vùng 2 (USA Shard):**
    | ID | Username | Country | Email |
    |:---|:---|:---|:---|
    | 2 | alex_smith | USA | alex@dev.us |

### 🔹 Ưu điểm & Ứng dụng
* **Mở rộng (Scalability):** Dễ dàng bổ sung thêm server mới khi lượng người dùng tăng trưởng.
* **Tối ưu truy vấn:** Query chỉ quét trên một phân vùng cụ thể thay vì bảng hàng tỷ dòng.
* **Cô lập rủi ro:** Sự cố tại một phân vùng không làm sập toàn bộ hệ thống.

---

## 2. Phân mảnh theo chiều dọc (Vertical Partitioning)

### 🔹 Khái niệm
Tập trung vào việc chia tách dữ liệu theo các **cột (Columns)**. Một bảng ban đầu được rã thành nhiều bảng nhỏ hơn, liên kết với nhau qua khóa chính (Primary Key).

### 🔹 Minh họa dữ liệu
Tách bảng `Users` dựa trên tần suất sử dụng: **Core Data** (Dùng liên tục) và **Extended Data** (Dữ liệu nặng/Ít dùng).

**Bảng gốc (Conceptual View):**
`Users(ID, Username, Password, Email, Bio, Avatar_Blob, Address)`

**Sau khi phân mảnh:**

* **Bảng `User_Core` (Nhẹ & Nhanh):**
    | ID | Username | Password | Email |
    |:---|:---|:---|:---|
    | 1 | minh_quan | hash_abc | quan@dev.vn |

* **Bảng `User_Metadata` (Dữ liệu nặng):**
    | ID | Bio | Avatar_Blob | Address |
    |:---|:---|:---|:---|
    | 1 | "Backend Developer" | [Binary Data] | "Hanoi, VN" |

### 🔹 Ưu điểm & Ứng dụng
* **Tốc độ truy xuất:** Giảm dung lượng dữ liệu nạp vào RAM (I/O) khi chỉ cần thông tin cơ bản.
* **Bảo mật:** Dễ dàng kiểm soát truy cập riêng cho các cột nhạy cảm.
* **Tối ưu Cache:** Các thông tin quan trọng dễ dàng được giữ trong bộ nhớ đệm của DB.

---

## 3. Phân mảnh theo chức năng (Functional / Service-based)

### 🔹 Khái niệm
Chia tách dữ liệu dựa trên **nghiệp vụ hệ thống (Business Logic)**. Mỗi nhóm chức năng hoặc dịch vụ sở hữu cơ sở dữ liệu riêng biệt.

### 🔹 Minh họa dữ liệu (Hệ thống E-commerce)
Dữ liệu không nằm chung một chỗ mà được chia theo Service.

* **Database: User_Service_DB**
    | ID | Username | Role |
    |:---|:---|:---|
    | 1 | minh_quan | Admin |

* **Database: Inventory_Service_DB**
    | ID | Product_Name | Price | Stock |
    |:---|:---|:---|:---|
    | 101 | Laptop Dell | 1500 | 10 |

* **Database: Order_Service_DB**
    | ID | User_ID | Total_Amount | Status |
    |:---|:---|:---|:---|
    | 5001 | 1 | 1500 | Pending |

### 🔹 Ưu điểm & Ứng dụng
* **Tính độc lập:** Xương sống của kiến trúc **Microservices**, giúp các team làm việc song song.
* **Scale linh hoạt:** Dịch vụ nào tải cao (như Order) có thể nâng cấp tài nguyên DB riêng.
* **Giảm Coupling:** Thay đổi cấu trúc dữ liệu ở mảng này không ảnh hưởng đến mảng khác.

---

## Tổng kết so sánh

| Chiến lược | Trọng tâm | Mục đích chính | Quan hệ dữ liệu |
| :--- | :--- | :--- | :--- |
| **Horizontal** | Dòng (Rows) | Gánh tải dữ liệu lớn, mở rộng vật lý. | Độc lập (cùng cấu trúc). |
| **Vertical** | Cột (Columns) | Tối ưu tốc độ đọc, bảo mật cột. | Quan hệ 1-1 qua ID. |
| **Functional** | Nghiệp vụ | Tách biệt trách nhiệm (Microservices). | Liên kết qua API/Events. |