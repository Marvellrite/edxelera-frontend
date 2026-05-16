- will check the layout config of the auth screens
- implement the input + error message combination
- retry auth sign up without inserting otp type


export type ApiResponse<T=null> = {
  success?: boolean;
  message?: string;
  data?: T;
  course_id?: string;
  module_id?: string;
    lesson_id?: string
};