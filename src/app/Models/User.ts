export class User{
    public TaiKhoan:string;
    public MatKhau:string;
    public HoTen:string;
    public Email:string;
    public SoDT:string;
    public MaLoaiNguoiDung:string;

    constructor(taikhoan:string, matkhau:string, hoten:string, email:string, sdt:string, loainguoidung:string){
        this.TaiKhoan = taikhoan;
        this.MatKhau = matkhau;
        this.HoTen = hoten;
        this.Email = email;
        this.SoDT = sdt;
        this.MaLoaiNguoiDung = loainguoidung;
    };
}