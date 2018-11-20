import * as $ from 'jquery';

export class CourseServices{
    GetCourseList(){
        return $.ajax({
            type:'GET',
            url:'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc',
        });
    };

    GetCourseDetails(idCourse){
        return $.ajax({
            type:'GET',
            url:`http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/${idCourse}`
        });
    };

    AddCourse(newCourse){
        return $.ajax({
            type:'POST',
            url:'http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc',
            dataType:'json',
            data:newCourse
        });
    };

    EditCourse(editCourse){
        let str = JSON.stringify(editCourse);
        return $.ajax({
            type:'PUT',
            url:'http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc',
            contentType:'application/json',
            dataType:'json',
            data:str
        });
    };

    DelCourse(idCourseDel){
        return $.ajax({
            type:'DELETE',
            url:`http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${idCourseDel}`
        });
    };

    EnrollInCourse(idCourse, accountUser){
        let str = JSON.stringify({MaKhoaHoc:idCourse, TaiKhoan:accountUser});
        return $.ajax({
            type:'POST',
            url:'http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc',
            contentType:'application/json',
            dataType:'json',
            data:str
        })
    }
}