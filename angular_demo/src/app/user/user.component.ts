import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  //định nghĩa
  users = [
    {
      id: 1,
      name: 'thangtv',
      age: 18,
      phone: '0426494214',
      avatar: 'https://tincongnghe24h.net/wp-content/uploads/2021/02/giai-nen-file-img.jpg'
    },
    {
      id: 2,
      name: 'dongtv',
      age: 19,
      phone: '088888888',
      avatar: 'https://tincongnghe24h.net/wp-content/uploads/2021/02/giai-nen-file-img.jpg'
    },
    {
      id: 3,
      name: 'thuannd',
      age: 20,
      phone: '0333333333',
      avatar: 'https://tincongnghe24h.net/wp-content/uploads/2021/02/giai-nen-file-img.jpg'
    }
  ];
  //định nghĩa 1 mảng trung gian lưu kết quả search
  //để k bị ảnh hưởng đến kết quả gốc
  usersFilter = this.users;
  //Định nghĩa hàm xóa khi click nút Delete
  remove(userId :number){
    this.usersFilter = this.usersFilter.filter(function (user){
      return user.id !== userId 
    });
  }
  //Định nghĩa hàm search
  onSearch(event :any){
    //1. Xu ly việc tìm kiếm chữ hoa thường
    //Đua cả value và name về đạng chữ thg
    //2. Khoảng trắng đầu và cuối value của input
    //sử dụng phương thức .trim()
    const value = event.target.value;
    const LowerCaseInputValue = value.toLowerCase();
    const LowerCaseTrimInputValue = LowerCaseInputValue.trim();
    //Gán cho usersFilter để k thay đổi users gốc nữa
    //Đổi hiện thị ds 
    this.usersFilter = this.users.filter(function(user){
      const LowerCaseName = user.name.toLowerCase();
      return LowerCaseName.indexOf(LowerCaseTrimInputValue) !== -1;
    });
    
  }

  //Thêm mới user
  // 1. Định nghĩa 1 obj newUser trung gian
  // Nhận gtri input đầu vào, sau khi submit sẽ gắn về gtri gốc
  newUser = {
    id: 0,
    name: '',
    age: 0,
    phone: '',
    avatar: ''
  };

  onChange(event :any, key :string){
      // id: this.users.length + 1, //Để khi submit ms làm
      // js spread operator ...
      this.newUser = {
        ...this.newUser,
        [key]: event.target.value
      };
      console.log(this.newUser);
      
  }

  onSubmit() {
    //0 Validate
    if (!this.onValidate(this.newUser)){
      //thông báo
      return;
    }
    //1.1 kiểm tra xem có phải đang sửa k 
    if (this.isEdit){
      //gán gtri mới cho mảng
      for (let i = 0; i < this.users.length; i++){
        if(this.users[i].id === this.newUser.id){
          this.users[i] = this.newUser;
        }
      }
      //đưa isEdit về gtri gốc là false để có thể thêm mới
      this.isEdit = false;
    } else {
      //1.2 gán thêm id bằng độ dài mảng + 1
    this.newUser.id = this.users.length + 1;
    //2 Push phần tử mới vào mảng users
    this.users.push(this.newUser)
    }
    
    //3 Gắn lại gtri gốc cho newUser
    this.newUser = {
      id: 0,
      name: '',
      age: 0,
      phone: '',
      avatar: ''
    };
  }
  onValidate(obj: any) {
    if (!obj.name || !obj.age || obj.age <= '0' || !obj.phone || !obj.avatar){
      return false;
    }

    return true;
  }

  //Sửa
  //Mặc định sẽ k phải đang sửa
  isEdit = false;
  onEdit(obj :any) {
    //gắn dữ liệu cần sửa vào newUser
    this.newUser = obj;
    //chuyển trạng thái đang sửa thành true
    this.isEdit = true;
    //Sau đó sẽ xử lý tiếp ở onSubmit nếu isEdit true
  }
}
