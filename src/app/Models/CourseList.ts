import { Course } from "./Course";

export class CourseList{
    ArrCourse: Course[] = [];
    
    AddCourse = (newCourse) =>{
        this.ArrCourse.push(newCourse);
    };
}