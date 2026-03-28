# RESTful Blog API - Bài tập lớn Node.js

## Giới thiệu

Đây là một RESTful API cho hệ thống Blog cá nhân được xây dựng bằng Node.js, Express và MongoDB. API này cho phép người dùng đăng ký, đăng nhập, quản lý bài viết, upload ảnh và nhiều tính năng khác.

Dự án được thực hiện nhằm đáp ứng yêu cầu của bài tập lớn môn Lập trình Web với Node.js.

## Các tính năng chính

*   **Xác thực người dùng:** Đăng ký, đăng nhập sử dụng JWT (JSON Web Token).
*   **Quản lý bài viết (Posts):**
    *   Tạo, đọc, cập nhật, xóa (CRUD) bài viết.
    *   Chỉ chủ sở hữu bài viết hoặc `admin` mới có quyền sửa/xóa.
    *   Xem tất cả bài viết của mọi người (có phân trang).
    *   Xem tất cả bài viết của cá nhân.
*   **Upload file:** Upload ảnh đại diện cho bài viết.
*   **Tìm kiếm & Lọc:**
    *   Tìm kiếm bài viết theo `title` và `content`.
    *   Lọc bài viết theo `tags`.
*   **Phân quyền:**
    *   `user`: Có các quyền cơ bản trên bài viết của mình.
    *   `admin`: Có quyền quản lý tất cả bài viết.
*   **Validation:** Dữ liệu đầu vào được kiểm tra cẩn thận.
*   **Xử lý lỗi:** Middleware xử lý lỗi tập trung.

## Công nghệ sử dụng

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (với Mongoose)
*   **Xác thực:** JSON Web Token (jsonwebtoken), bcryptjs
*   **Upload file:** Multer
*   **Validation:** Joi
*   **Môi trường:** dotenv
*   **Rate Limiting:** express-rate-limit

## Hướng dẫn cài đặt và chạy dự án

1.  **Clone repository:**
    ```bash
    git clone <your-repo-link>
    cd textblog-api
    ```

2.  **Cài đặt dependencies:**
    ```bash
    npm install
    ```

3.  **Tạo file môi trường `.env`:**
    Tạo một file `.env` ở thư mục gốc của dự án và cấu hình các biến sau.
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

4.  **Chạy dự án ở chế độ development:**
    ```bash
    npm run dev
    ```
    Server sẽ khởi động tại `http://localhost:3000`.

## Cấu trúc API Endpoints

*   **POST** `/api/auth/register`
    *   **Mô tả:** Đăng ký người dùng mới.
    *   **Authentication:** Không yêu cầu.

*   **POST** `/api/auth/login`
    *   **Mô tả:** Đăng nhập, trả về JWT token.
    *   **Authentication:** Không yêu cầu.

*   **GET** `/api/posts`
    *   **Mô tả:** Lấy tất cả bài viết (hỗ trợ phân trang `?page` & `limit`).
    *   **Authentication:** Không yêu cầu.

*   **GET** `/api/posts/:id`
    *   **Mô tả:** Lấy chi tiết 1 bài viết.
    *   **Authentication:** Không yêu cầu.

*   **POST** `/api/posts`
    *   **Mô tả:** Tạo bài viết mới (có thể upload ảnh).
    *   **Authentication:** Yêu cầu JWT token.
    *   **Quyền:** `user` hoặc `admin`.

*   **PUT** `/api/posts/:id`
    *   **Mô tả:** Sửa bài viết.
    *   **Authentication:** Yêu cầu JWT token.
    *   **Quyền:** Chủ bài viết (`owner`) hoặc `admin`.

*   **DELETE** `/api/posts/:id`
    *   **Mô tả:** Xóa bài viết.
    *   **Authentication:** Yêu cầu JWT token.
    *   **Quyền:** Chủ bài viết (`owner`) hoặc `admin`.

*   **GET** `/api/posts/my-posts`
    *   **Mô tả:** Lấy tất cả bài viết của người dùng đang đăng nhập.
    *   **Authentication:** Yêu cầu JWT token.
    *   **Quyền:** `user` hoặc `admin`.

*   **GET** `/api/posts/search`
    *   **Mô tả:** Tìm kiếm bài viết theo `title`, `content` (với `?q=keyword`) và `tags` (với `?tag=tên_tag`).
    *   **Authentication:** Không yêu cầu.
