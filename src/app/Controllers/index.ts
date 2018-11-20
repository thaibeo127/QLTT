/*
    Người tạo: Thái.
    Ngày tạo: 10-11-2018.
    Nội dung:
        - Quản lý người dùng: thêm, xóa, sửa , tìm kiếm người dùng (theo tài khoản và tên), lọc list HV và GV, hiển thị list khóa học mà người dùng đó đã ghi danh.
        - Quản lý khóa học: thêm, xóa(ko cho xóa các khóa học đã có người đăng ký), sửa khóa học, hiển thị list khóa học, thông tin chi tiết, ghi danh cho người dùng.
        - Đăng ký, đăng nhập, đăng xuất, clear local khi đăng xuất.
        - Lớp đối tượng và api theo như file đặc tả api để làm.
    PS: vì API ko có trả về dữ liệu nào để trực tiếp căn cứ vào mà kiểm tra khóa học đã đc đăng ký trước khi xóa khóa học đó, nên chức năng đó thử đi vòng bằng = Promise.
*/

import "bootstrap";
import "popper.js";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/style.css";
import { UserServices } from "../Services/UserSV";
import { User } from "../Models/User";
import { UserList } from "../Models/UserList";
import * as $ from "jquery";
import swal from "sweetalert2";
import { CourseServices } from "../Services/CourseSV";
import { CourseList } from "../Models/CourseList";
import { Course } from "../Models/Course";

//---Instance Global---
let userSV = new UserServices();
let userList = new UserList();

let courseSV = new CourseServices();
let courseList = new CourseList();

let arrTitle = [
  "Thêm Người Dùng",
  "Cập Nhập Người Dùng",
  "Thêm Khóa Học",
  "Cập Nhập Khóa Học"
];

//---FUNC ShowSwal---
let showSwal = result => {
  if (result === "done") {
    swal({
      type: "success",
      title: "Success!",
      timer: 2000
    });
  } else {
    swal({
      type: "error",
      title: "Can't!!!",
      timer: 2000
    });
  }
};

//---FUNC ShowPopup---
let showPopup = (title, btn) => {
  $(".modal-title").html(title);
  $(".modal-footer").html(btn);
};

//---FUNC ConvertVietnamese Text---
let convertVietnamese = str => {
  if (str != null) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
      "-"
    );
    str = str.replace(/-+-/g, "-");
    str = str.replace(/^\-+|\-+$/g, "");
    return str;
  } else {
    return "";
  }
};

/* ***START CODE FOR USER*** */
//---FUNC Get Data API---
let getDataUser = () => {
  userSV.GetUserList().done(result => {
    userList.ArrUser = result;
    renderUserList(result);
    signIn();
  });
};

//---FUNC SignIn SignOut---
let signIn = () => {
  let accSignIn = JSON.parse(localStorage.getItem("currentUser"));
  if (accSignIn !== null) {
    $("#spanTKDangNhap").html(`Xin chào <b> ${accSignIn.TaiKhoan} </b> ! `);
    $("#comeBack").html(`, Đăng xuất.`);
  } else {
    $("#spanTKDangNhap").html(`Xin chào, mời bạn`);
    $("#comeBack").html(`Đăng nhập hoặc Đăng ký.`);
  }
};

//---FUNC Clear Local Save---
let clearLocal = () => {
  localStorage.removeItem("currentUser");
};

//---FUNC AddUser---
let addUser = () => {
  let account = $("#TaiKhoan").val();
  let password = $("#MatKhau").val();
  let name = $("#HoTen").val();
  let email = $("#Email").val();
  let phoneNumber = $("#SoDienThoai").val();
  let typeUser = $("#LoaiNguoiDung").val();

  let NewUser = new User(account, password, name, email, phoneNumber, typeUser);

  userSV
    .AddUser(NewUser)
    .done(() => {
      userList.AddUser(NewUser);
      renderUserList(userList.ArrUser);
      showSwal("done");
    })
    .fail(() => showSwal("fail"));
  $(".close").trigger("click");
};

//---FUNC RenderUserList---
let renderUserList = arrayInput => {
  let contentTable: string = "";
  for (let i = 0; i < arrayInput.length; i++) {
    let { TaiKhoan, MatKhau, HoTen, Email, SoDT, MaLoaiNguoiDung } = arrayInput[
      i
    ];
    contentTable += `
            <tr>
                <td>${i + 1}</td>
                <td>${TaiKhoan}</td>
                <td>${MatKhau}</td>
                <td>${HoTen}</td>
                <td>${Email}</td>
                <td>${SoDT}</td>
                <td>${MaLoaiNguoiDung}</td>
                <td>
                    <button data-taikhoan="${TaiKhoan}" class="btn btn-danger btn-xoaND">Xóa</button>
                    <button 
                        data-taikhoan="${TaiKhoan}"
                        data-matkhau="${MatKhau}"
                        data-hoten="${HoTen}"
                        data-email="${Email}"
                        data-sodt="${SoDT}"
                        data-maloainguoidung="${MaLoaiNguoiDung}"
                        data-toggle="modal" data-target="#myModal"
                    class="btn btn-info btn-suaND">Sửa</button>
                </td>
            </tr>
        `;
  }
  $("#tblDanhSachNguoiDung").html(contentTable);
};

//---FUNC EditUser---
let editUser = () => {
  let account = $("#TaiKhoan").val();
  let password = $("#MatKhau").val();
  let name = $("#HoTen").val();
  let email = $("#Email").val();
  let phoneNumber = $("#SoDienThoai").val();
  let typeUser = $("#LoaiNguoiDung").val();

  let UserEdited = new User(
    account,
    password,
    name,
    email,
    phoneNumber,
    typeUser
  );

  userSV
    .EditUser(UserEdited)
    .done(() => {
      getDataUser();
      showSwal("done");
    })
    .fail(() => showSwal("fail"));
  $(".close").trigger("click");
};

//---FUNC Search User---
let searchUser = () => {
  let keyword: string = $("#txtSearchUser").val();
  let str = convertVietnamese(keyword);
  let userListNeedSearch = [];
  for (let user of userList.ArrUser) {
    let acc = convertVietnamese(user.TaiKhoan);
    let name = convertVietnamese(user.HoTen);
    if (acc.indexOf(str) != -1 || name.indexOf(str) != -1) {
      userListNeedSearch.push(user);
    }
  }
  renderUserList(userListNeedSearch);
};

//---FUNC Get Student List---
let getStudentList = () => {
  userSV
    .GetStudentList()
    .done(result => {
      renderUserList(result);
    })
    .fail(() => showSwal("fail"));
};
/* ***END CODE FOR USER*** */

/* ***START CODE FOR COURSE*** */
//---FUNC Get Data Course---
let getDataCourse = () => {
  courseSV.GetCourseList().done(result => {
    courseList.ArrCourse = result;
    renderCourseList(result);
  });
};

//---FUNC RenderCourseList---
let renderCourseList = arrayInput => {
  let contentTable: string = "";
  for (let i = 0; i < arrayInput.length; i++) {
    let {
      MaKhoaHoc,
      TenKhoaHoc,
      MoTa,
      HinhAnh,
      LuotXem,
      NguoiTao
    } = arrayInput[i];
    contentTable += `
            <tr>
                <td>${i + 1}</td>
                <td>${MaKhoaHoc}</td>
                <td>${TenKhoaHoc}</td>
                <td><div class="shortMota">${MoTa}</div></td>
                <td><img src="${
      HinhAnh ? HinhAnh : ""
      }" width="200px" height="200px"></td>
                <td>${LuotXem}</td>
                <td>${NguoiTao}</td>
                <td>
                    <button data-makhoahoc="${MaKhoaHoc}" class="btn btn-danger mt-5 btn-xoaKH">Xóa</button>
                    <button 
                        data-makhoahoc="${MaKhoaHoc}"
                        data-tenkhoahoc="${TenKhoaHoc}"
                        data-mota="${MoTa}"
                        data-hinhanh="${HinhAnh}"
                        data-luotxem="${LuotXem}"
                        data-nguoitao="${NguoiTao}"
                        data-toggle="modal" data-target="#myModalCourse"
                    class="btn btn-info mt-4 btn-suaKH">Sửa</button>
                </td>
            </tr>
        `;
  }
  $("#tblDanhSachKhoaHoc").html(contentTable);
};

//---FUNC CourseDetails---
let renderCourseDetails = () => {
  let idCourse: string = $("#txtSearchCourse").val();
  courseSV
    .GetCourseDetails(idCourse)
    .done(result => {
      let courseNeed: Course[] = [];
      courseNeed.push(result);
      renderCourseList(courseNeed);
    })
    .fail(() => showSwal("fail"));
};

//---FUNC AddCourse---
let addCourse = () => {
  let idCourse = $("#MaKhoaHoc").val();
  let name = $("#TenKhoaHoc").val();
  let details = $("#MoTa").val();
  let img = $("#HinhAnh").val();
  let view = $("#LuotXem").val();
  let creators = $("#NguoiTao").val();

  let NewCourse = new Course(idCourse, name, details, img, view, creators);

  courseSV
    .AddCourse(NewCourse)
    .done(() => {
      getDataCourse();
      showSwal("done");
    })
    .fail(() => showSwal("fail"));
  $(".close").trigger("click");
};

//---FUNC EditCourse---
let editCourse = () => {
  let idCourse = $("#MaKhoaHoc").val();
  let name = $("#TenKhoaHoc").val();
  let details = $("#MoTa").val();
  let img = $("#HinhAnh").val();
  let view = $("#LuotXem").val();
  let creators = $("#NguoiTao").val();

  let CourseEdited = new Course(idCourse, name, details, img, view, creators);

  courseSV
    .EditCourse(CourseEdited)
    .done(() => {
      getDataCourse();
      showSwal("done");
    })
    .fail(() => showSwal("fail"));
  $(".close").trigger("click");
};

//---FUNC EnrollInCourse---
let enrollInCourse = () => {
  let idCourse = $("#maKhoaHocGhiDanh").val();
  let accountUser = $("#taiKhoanGhiDanh").val();
  courseSV
    .EnrollInCourse(idCourse, accountUser)
    .done(res => {
      if (res === "Sucessfully") {
        showSwal("done");
      } else {
        showSwal("fail");
      }
    })
    .fail(() => showSwal("fail"));
};

//---FUNC Search Course---
let searchCourse = () => {
  let keyword: string = $("#txtSearchCourse").val();
  let str = convertVietnamese(keyword);
  let courseListNeedSearch = [];
  for (let course of courseList.ArrCourse) {
    let name = convertVietnamese(course.TenKhoaHoc);
    if (name.indexOf(str) != -1) {
      courseListNeedSearch.push(course);
    }
  }
  renderCourseList(courseListNeedSearch);
};

// ---FUNC Get List Course Registered---
let getListCourseRegistered = async () => {
  let arrIdCourse: Array<string> = [];
  for (let acc of userList.ArrUser) {
    await userSV.GetEnrolledCourses(acc.TaiKhoan).done(res => {
      if (typeof res == "object") {
        for (let course of res) {
          if (arrIdCourse.indexOf(course.MaKhoaHoc) < 0) {
            arrIdCourse.push(course.MaKhoaHoc);
          }
        }
      }
    });
  }
  return arrIdCourse;
};
/* ***END CODE FOR COURSE*** */

//---GET FUNC---
$(document).ready(() => {
  /* ***START CODE GET USER*** */
  //---Get Data User---
  getDataUser();

  //---Clear Local Save---
  $("#comeBack").click(clearLocal);

  //---Show Popup---
  $("#btnThemNguoiDung").click(() => {
    $('#TaiKhoan').attr('disabled', false);
    let btnAddUser = `<button class="btn btn-success" id="btnThemND">Thêm</button>`;
    $(".modal-body input").val("");
    showPopup(arrTitle[0], btnAddUser);
  });

  //---Add User---
  $("body").delegate("#btnThemND", "click", addUser);

  //---Del User---
  $("body").delegate(".btn-xoaND", "click", function () {
    let accNeedDel = $(this).attr("data-taikhoan");
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        userSV
          .DelUser(accNeedDel)
          .done(() => {
            userList.DelUser(accNeedDel);
            renderUserList(userList.ArrUser);
            showSwal("done");
          })
          .fail(() => showSwal("fail"));
      }
    });
  });

  //---Edit User---
  $("body").delegate(".btn-suaND", "click", function () {
    let account = this.getAttribute("data-taikhoan");
    let password = this.getAttribute("data-matkhau");
    let name = this.getAttribute("data-hoten");
    let email = this.getAttribute("data-email");
    let phoneNumber = this.getAttribute("data-sodt");
    let typeUser = this.getAttribute("data-maloainguoidung");

    $('#TaiKhoan').attr('disabled', true);
    let btnEditUser = `<button class="btn btn-info" id="btnCapNhapND">Lưu Thay Đổi</button>`;
    showPopup(arrTitle[1], btnEditUser);

    $("#TaiKhoan").val(account);
    $("#MatKhau").val(password);
    $("#HoTen").val(name);
    $("#Email").val(email);
    $("#SoDienThoai").val(phoneNumber);
    $("#LoaiNguoiDung").val(typeUser);
  });
  $("body").delegate("#btnCapNhapND", "click", editUser);

  //---Search User---
  $("#txtSearchUser").keyup(searchUser);

  //---Show Student List---
  $("#DanhSachNguoiDung select").change(function () {
    let valOption: string = $(this).val();
    if (valOption === "Giáo Vụ") {
      userSV.GetUserList().done(result => {
        let arrayTeacher = result.filter(user => {
          return user.MaLoaiNguoiDung === "GV";
        });
        renderUserList(arrayTeacher);
      });
    } else if (valOption === "Học Viên") {
      getStudentList();
    } else {
      getDataUser();
    }
  });

  //---Show List Enrolled Courses form Account---
  $("#btnTimDSKHTheoTK").click(() => {
    let ACC: string = $("#txtSearchUser").val();
    userSV
      .GetEnrolledCourses(ACC)
      .done(res => {
        if (typeof res == "object") {
          $("#taga_DSKhoaHoc").click();
          renderCourseList(res);
          showSwal("done");
        } else {
          swal({
            type: "error",
            title: "Did not find the course.",
            timer: 2000
          });
        }
      })
      .fail(() => showSwal("fail"));
  });
  /* ***END CODE GET USER*** */

  /* ***START CODE GET COURSE*** */
  //---Get Data Course---
  getDataCourse();

  //---Show Full Mô tả---
  $("body").delegate(".shortMota", "click", function () {
    $(this).toggleClass("fullMota");
  });

  //---Search CourseDetails---
  $("#btnTimTheoMaKH").click(renderCourseDetails);

  //---Show Popup---
  $("#btnThemKhoaHoc").click(() => {
    $('#MaKhoaHoc').attr('disabled', false);
    let btnAddCourse = `<button class="btn btn-success" id="btnThemKH">Thêm</button>`;
    $(".modal-body input").val("");
    showPopup(arrTitle[2], btnAddCourse);
  });

  //---Add Course---
  $("body").delegate("#btnThemKH", "click", addCourse);

  //---Edit Course---
  $("body").delegate(".btn-suaKH", "click", function () {
    let idCourse = this.getAttribute("data-makhoahoc");
    let name = this.getAttribute("data-tenkhoahoc");
    let details = this.getAttribute("data-mota");
    let img = this.getAttribute("data-hinhanh");
    let view = this.getAttribute("data-luotxem");
    let creators = this.getAttribute("data-nguoitao");

    $('#MaKhoaHoc').attr('disabled', true);
    let btnEditCourse = `<button class="btn btn-info" id="btnCapNhapKH">Lưu Thay Đổi</button>`;
    showPopup(arrTitle[3], btnEditCourse);

    $("#MaKhoaHoc").val(idCourse);
    $("#TenKhoaHoc").val(name);
    $("#MoTa").val(details);
    $("#HinhAnh").val(img);
    $("#LuotXem").val(view);
    $("#NguoiTao").val(creators);
  });
  $("body").delegate("#btnCapNhapKH", "click", editCourse);

  // ---Del Course---
  $("body").delegate(".btn-xoaKH", "click", function () {
    let courseNeedDel = $(this).attr("data-makhoahoc");
    getListCourseRegistered()
      .then(res => {
        for (let idCourse of res) {
          if (idCourse == courseNeedDel) {
            swal({
              type: "error",
              title: "Can not delete!. The course has been registered.",
              timer: 3000
            });
            break;
          } else {
            swal({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then(result => {
              if (result.value) {
                courseSV
                  .DelCourse(courseNeedDel)
                  .done(result => {
                    getDataCourse();
                    showSwal("done");
                  })
                  .fail(() => showSwal("fail"));
              }
            });
          }
        }
      })
      .catch(not_data => {
        console.log(not_data);
      });
  });

  //---Enroll Course----
  $("#btnXacNhanGhiDanh").click(enrollInCourse);

  //---Search Course---
  $("#txtSearchCourse").keyup(searchCourse);
  /* ***END CODE GET COURSE*** */
});