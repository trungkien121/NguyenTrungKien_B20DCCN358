-- Bảng thuoc
CREATE TABLE thuoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_thuoc VARCHAR(255) NOT NULL,
    ma_thuoc VARCHAR(255) UNIQUE NOT NULL,
    ma_vach VARCHAR(255),
    loai_thuoc_id INT,
    nha_san_xuat_id INT,
    danh_muc_thuoc_id INT,
    don_vi VARCHAR(50),
    che_bao VARCHAR(100),
    quy_cach VARCHAR(255),
    so_dang_ky VARCHAR(100),
    han_su_dung DATE,
    gia_nhap DECIMAL(10, 2),
    gia_ban DECIMAL(10, 2),
    so_luong_ton INT,
    nguong_canh_bao INT,
    hinh_anh VARCHAR(255),
    cong_dung TEXT,
    chi_dinh TEXT,
    chong_chi_dinh TEXT,
    doi_tuong_sd TEXT,
    huong_dan_su_dung TEXT,
    mo_ta_ngan TEXT,
    trang_thai BOOLEAN DEFAULT TRUE,
    ghi_chu TEXT,
    FOREIGN KEY (loai_thuoc_id) REFERENCES loai_thuoc(id),
    FOREIGN KEY (nha_san_xuat_id) REFERENCES nha_san_xuat(id),
    FOREIGN KEY (danh_muc_thuoc_id) REFERENCES danh_muc_thuoc(id)
);

-- Bảng danh_muc_thuoc
CREATE TABLE danh_muc_thuoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_danh_muc VARCHAR(255) NOT NULL,
    mo_ta TEXT
);

-- Bảng loai_thuoc
CREATE TABLE loai_thuoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_loai VARCHAR(255) NOT NULL,
    mo_ta TEXT
);

-- Bảng thanh_phan_thuoc
CREATE TABLE thanh_phan_thuoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thuoc_id INT,
    ten_thanh_phan VARCHAR(255),
    ham_luong VARCHAR(100),
    don_vi VARCHAR(50),
    FOREIGN KEY (thuoc_id) REFERENCES thuoc(id)
);

-- Bảng doi_tuong_sd_thuoc
CREATE TABLE doi_tuong_sd_thuoc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thuoc_id INT,
    doi_tuong_id INT,
    FOREIGN KEY (thuoc_id) REFERENCES thuoc(id),
    FOREIGN KEY (doi_tuong_id) REFERENCES doi_tuong(id)
);

-- Bảng doi_tuong
CREATE TABLE doi_tuong (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_doi_tuong VARCHAR(255),
    mo_ta TEXT
);

-- Bảng nha_cung_cap
CREATE TABLE nha_cung_cap (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_nha_cung_cap VARCHAR(255) NOT NULL,
    dia_chi VARCHAR(255),
    so_dien_thoai VARCHAR(20),
    email VARCHAR(255)
);

-- Bảng nha_san_xuat
CREATE TABLE nha_san_xuat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_nha_san_xuat VARCHAR(255) NOT NULL,
    nuoc_san_xuat VARCHAR(100),
    dia_chi VARCHAR(255),
    so_dien_thoai VARCHAR(20),
    email VARCHAR(255)
);

-- Bảng ton_kho
CREATE TABLE ton_kho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thuoc_id INT,
    ngay_nhap_kho DATE,
    han_su_dung DATE,
    so_luong INT,
    vi_tri VARCHAR(100),
    FOREIGN KEY (thuoc_id) REFERENCES thuoc(id)
);

-- Bảng nguoi_dung
CREATE TABLE nguoi_dung (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_dang_nhap VARCHAR(255) UNIQUE NOT NULL,
    mat_khau VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    dia_chi VARCHAR(255),
    so_dien_thoai VARCHAR(20),
    trang_thai BOOLEAN DEFAULT TRUE,
    ngay_tao DATE DEFAULT CURRENT_DATE
);

-- Bảng gio_hang
CREATE TABLE gio_hang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    khach_hang_id INT,
    ngay_tao DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (khach_hang_id) REFERENCES nguoi_dung(id)
);

-- Bảng chi_tiet_gio_hang
CREATE TABLE chi_tiet_gio_hang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gio_hang_id INT,
    thuoc_id INT,
    so_luong INT,
    don_gia DECIMAL(10, 2),
    FOREIGN KEY (gio_hang_id) REFERENCES gio_hang(id),
    FOREIGN KEY (thuoc_id) REFERENCES thuoc(id)
);

-- Bảng don_hang
CREATE TABLE don_hang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    khach_hang_id INT,
    nguoi_dung_id INT,
    ten_khach_hang VARCHAR(255),
    so_dien_thoai VARCHAR(20),
    dia_chi VARCHAR(255),
    email VARCHAR(255),
    ngay_lap DATE,
    tong_tien DECIMAL(10, 2),
    trang_thai_giao_hang ENUM('Đang xử lý', 'Đang giao', 'Đã giao', 'Đã hủy', 'Trả hàng'),
    ngay_giao DATE,
    FOREIGN KEY (khach_hang_id) REFERENCES nguoi_dung(id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id)
);

-- Bảng chi_tiet_don_hang
CREATE TABLE chi_tiet_don_hang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    don_hang_id INT,
    thuoc_id INT,
    so_luong INT,
    don_gia DECIMAL(10, 2),
    FOREIGN KEY (don_hang_id) REFERENCES don_hang(id),
    FOREIGN KEY (thuoc_id) REFERENCES thuoc(id)
);

-- Bảng hoa_don
CREATE TABLE hoa_don (
    id INT AUTO_INCREMENT PRIMARY KEY,
    don_hang_id INT,
    khach_hang_id INT,
    nguoi_dung_id INT,
    ngay_lap DATE DEFAULT NOW(),
    tong_tien DECIMAL(10, 2),
    tien_thue DECIMAL(10, 2),
    giam_gia DECIMAL(10, 2),
    tong_tien_thanh_toan DECIMAL(10, 2),
    phuong_thuc_thanh_toan ENUM('Tiền mặt', 'Chuyển khoản', 'Thẻ ngân hàng', 'Ví điện tử'),
    trang_thai_thanh_toan ENUM('Chưa thanh toán', 'Đã thanh toán', 'Thanh toán một phần'),
    ngay_thanh_toan DATETIME,
    ghi_chu TEXT,
    FOREIGN KEY (don_hang_id) REFERENCES don_hang(id),
    FOREIGN KEY (khach_hang_id) REFERENCES nguoi_dung(id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id)
);

-- Bảng phieu_nhap
CREATE TABLE phieu_nhap (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nha_cung_cap_id INT,
    nguoi_dung_id INT,
    ngay_nhap DATE,
    tong_tien DECIMAL(10, 2),
    FOREIGN KEY (nha_cung_cap_id) REFERENCES nha_cung_cap(id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id)
);

-- Bảng chi_tiet_phieu_nhap
CREATE TABLE chi_tiet_phieu_nhap (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phieu_nhap_id INT,
    thuoc_id INT,
    so_luong INT,
    don_gia DECIMAL(10, 2),
    FOREIGN KEY (phieu_nhap_id) REFERENCES phieu_nhap(id),
    FOREIGN KEY (thuoc_id) REFERENCES thuoc(id)
);

-- Bảng danh_gia
CREATE TABLE danh_gia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thuoc_id INT,
    nguoi_dung_id INT,
    danh_gia_id INT,
    danh_gia TEXT,
    diem_so INT CHECK (diem_so BETWEEN 1 AND 5),
    ngay_danh_gia DATE,
    FOREIGN KEY (thuoc_id) REFERENCES thuoc(id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id),
    FOREIGN KEY (danh_gia_id) REFERENCES danh_gia(id)
);

-- Bảng thong_bao
CREATE TABLE thong_bao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT,
    tieu_de VARCHAR(255) NOT NULL,
    noi_dung TEXT NOT NULL,
    loai_thong_bao VARCHAR(50),
    ngay_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    trang_thai ENUM('Chưa đọc', 'Đã đọc'),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id)
);

-- Bảng khuyen_mai
CREATE TABLE khuyen_mai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_khuyen_mai VARCHAR(255),
    mo_ta TEXT,
    ngay_bat_dau DATE,
    ngay_ket_thuc DATE,
    trang_thai BOOLEAN DEFAULT TRUE
);

-- Bảng chi_tiet_khuyen_mai
CREATE TABLE chi_tiet_khuyen_mai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    khuyen_mai_id INT,
    thuoc_id INT,
    phan_tram_giam DECIMAL(5, 2),
    ngay_bat_dau DATE,
    ngay_ket_thuc DATE,
    trang_thai BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (khuyen_mai_id) REFERENCES khuyen_mai(id),
    FOREIGN KEY (thuoc_id) REFERENCES thuoc(id)
);



-- Bảng phan_quyen
CREATE TABLE nhom_quyen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_nhom_quyen VARCHAR(255) NOT NULL,
    mo_ta TEXT
);

-- Bảng chi_tiet_nguoi_dung
CREATE TABLE chi_tiet_nguoi_dung (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT,
    nhom_quyen_id INT,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id),
    FOREIGN KEY (nhom_quyen_id) REFERENCES nhom_quyen(id)
);

-- Bảng chuc_nang
CREATE TABLE chuc_nang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_chuc_nang VARCHAR(255) NOT NULL,
    mo_ta TEXT
);

-- Bảng chi_tiet_chuc_nang
CREATE TABLE chi_tiet_chuc_nang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nhom_quyen_id INT,
    chuc_nang_id INT,
    FOREIGN KEY (nhom_quyen_id) REFERENCES nhom_quyen(id),
    FOREIGN KEY (chuc_nang_id) REFERENCES chuc_nang(id)
);
