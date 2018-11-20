import * as $ from "jquery";

export class UserServices {
  GetUserList() {
    return $.ajax({
      type: "GET",
      url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
      dataType: "json"
    });
  }

  AddUser(newUser) {
    return $.ajax({
      type: "POST",
      url: "http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
      dataType: "json",
      data: newUser
    });
  }

  DelUser(accNeedDel) {
    return $.ajax({
      type: "DELETE",
      url: `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${accNeedDel}`
    });
  }

  EditUser(userNeedEdit) {
    let userString = JSON.stringify(userNeedEdit);
    return $.ajax({
      type: "PUT",
      url: "http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung",
      contentType: "application/json",
      dataType: "json",
      data: userString
    });
  }

  GetStudentList() {
    return $.ajax({
      type: "GET",
      url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachHocvien",
      dataType: "json"
    });
  }

  SignIn(account, password) {
    return $.ajax({
      type: "GET",
      url: `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${account}&matkhau=${password}`,
      dataType: "json"
    });
  }

  SignUp(newUser) {
    return $.ajax({
      type: "POST",
      url: "http://sv.myclass.vn/api/QuanLyTrungTam/DangKy",
      dataType: "json",
      data: newUser
    });
  }

  GetEnrolledCourses(account) {
    return $.ajax({
      type: "GET",
      url: `http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=${account}`,
      dataType: "json"
    });
  }
}
