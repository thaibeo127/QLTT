/*
    Người tạo: Thái.
    Ngày tạo: 12-11-2018.
    Nội dung:
       - Đăng ký, đăng nhập.
*/

import 'bootstrap';
import 'popper.js';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/signin.css';
import * as $ from 'jquery';
import swal from 'sweetalert2';
import { UserServices } from '../Services/UserSV';
import { User } from '../Models/User';

$(document).ready(() => {
    let userSV = new UserServices();

    //---FUNC Sign IN---
    let signIn = () => {
        let account: string = $('#taiKhoan').val();
        let password: string = $('#matKhau').val();
        userSV.SignIn(account, password).done((result) => {
            if (typeof (result) !== 'string') {
                localStorage.setItem('currentUser', JSON.stringify(result[0]));
                window.location.assign('index.html');
                swal({
                    type: 'success',
                    title: `Xin chào <b>${account}</b> !!!`,
                    timer: 2000
                });
            } else {
                swal({
                    type: 'error',
                    title: 'Thông tin không chính xác',
                    timer: 2000
                });
            };
        });
    };
    $('#btnDangNhap').click(signIn);

    //---FUNC Sign UP---
    let signUp = () => {
        let account = $('#TaiKhoan').val();
        let password = $('#MatKhau').val();
        let name = $('#HoTen').val();
        let email = $('#Email').val();
        let phoneNumber = $('#SoDienThoai').val();
        let typeUser = $('#LoaiNguoiDung').val();

        let NewUser = new User(account, password, name, email, phoneNumber, typeUser);

        userSV.SignUp(NewUser).done((res) => {
            if (res) {
                swal({
                    type: 'success',
                    title: `Xin chào <b>${account}</b>!`,
                    text: 'Mời bạn đăng nhập.',
                    timer: 3000
                });
                $('.close').trigger('click');
            } else {
                swal({
                    type: 'error',
                    title: 'Đăng ký không thành công',
                    timer: 2000
                });
            };
        });
    };
    $('#btnHoanTat').click(signUp);
})