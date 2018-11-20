export class Course{
    public MaKhoaHoc:string;
    public TenKhoaHoc:string;
    public MoTa:string;
    public HinhAnh:string;
    public LuotXem:string;
    public NguoiTao:string;

    constructor(makhoahoc:string, tenkhoahoc:string, mota:string, hinhanh:string, luotxem:string, nguoitao:string){
        this.MaKhoaHoc = makhoahoc;
        this.TenKhoaHoc = tenkhoahoc;
        this.MoTa = mota;
        this.HinhAnh = hinhanh;
        this.LuotXem = luotxem;
        this.NguoiTao = nguoitao;
    };
}