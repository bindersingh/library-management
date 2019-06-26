import Dexie from 'dexie';

const db = new Dexie('Library Management');
db.version(1).stores({
  users: "++id, name,classes",
  books:"++id, isbn,title,edition,author,category,publisher,language,quantity"
});
db.version(2).stores({
  books:"++id,isbn,ubn,title,edition,author,category,publisher,language"
});
db.version(3).stores({
    books:"++id,ubn,title,edition,author,category,publisher,language"
});
db.version(4).stores({
    books:"++id,&ubn,title,edition,author,category,publisher,language"

});

db.version(5).stores({
  members:"++id,name,username,email,password,role_id,group_id,faculity_id,profile_image,theme_color,token,android_device,wallet,login_otp,otp_phone,otp_lock,main_otp,expense_report_lock,expense_report_otp,active,online,secret,moderator,voucher_approve,created,modified"

});
db.version (6).stores ({
    members: null

});
db.version(7).stores({
  admissions:"id,first_name,middle_name,last_name,guardian_name,relationship_with_guardian,guardian_qualification,guardian_org_desig,guardian_off_phone,guardian_off_address,mother_qualification,mother_off_address,mother_mobile,mother_off_phone,mother_name,dob,age,sex,religion,occupation,aadhaar_no,cast,category,avail_transport,avail_mess,avail_hostel,course_id,course_schedule_id,address1,address2,distt_id,state_id,city_id,pincode,nationality,student_mobile,father_mobile,home_landline,student_email,father_email,parents_marriage_anniversary,annual_income_family,applicant_proficiency,lang_english,lang_hindi,lang_punjabi,field_medical,field_cultural,field_sports,field_teacher,field_substitution,profile_image,registration_id,bg,rollno,section_id,csession_from,csession_to,next_installment_date,member_id,passout,active,update_class,dor,created,modified,balance,visitor1,visitor1_r,visitor2,visitor2_r,visitor1_mobile,visitor2_mobile,visitor1_aadhar,visitor2_aadhar,type,stuck_of,stuck_of_by,stuck_of_date,unstuck_attachment,eligible_for_scholarship,disability,disability_per,old_admission_date,registration_no,father_aadhar_no,mother_aadhar_no,general_con,doa,reason_leave,ao_remark,leave_sno,reference,student,faculity_id"
});
db.version(8).stores({
  bookissues:"++id,book_ubn,studen_id,from_date,to_date,status"
});
db.version(9).stores({
  bookissues:null
});
db.version(10).stores({
    bookissues: '++id, [book_ubn+studen_id],from_date,to_date,status'
});
db.version(11).stores({
    books:null

});
db.version(12).stores({
  book:null
});
db.version(13).stores({
  books:'++id,&ubn,title,edition,author,category,publisher,language,parent_id'

});
db.version(14).stores({

  bookissues:'++id,date_time,[book_ubn+student_id],return,return_date'
});
db.version(15).stores({
  bookissues:'++id,date_time,[book_ubn+student_id+return],return_date'
});
db.version(16).stores({
  bookissues:'++id,date_time,[book_ubn+return],student_id,return_date'
});
db.version(17).stores({

  bookissues:'++id,date_time,[book_ubn+return],[return+student_id],return_date'
});
db.version(18).stores({
  admissions:null
});
db.version(19).stores({
admissions:"id,first_name,middle_name,last_name,guardian_name,relationship_with_guardian,guardian_qualification,guardian_org_desig,guardian_off_phone,guardian_off_address,mother_qualification,mother_off_address,mother_mobile,mother_off_phone,mother_name,dob,age,sex,religion,occupation,aadhaar_no,cast,category,avail_transport,avail_mess,avail_hostel,course_id,course_schedule_id,address1,address2,distt_id,state_id,city_id,pincode,nationality,student_mobile,father_mobile,home_landline,student_email,father_email,parents_marriage_anniversary,annual_income_family,applicant_proficiency,lang_english,lang_hindi,lang_punjabi,field_medical,field_cultural,field_sports,field_teacher,field_substitution,profile_image,registration_id,bg,rollno,section_id,csession_from,csession_to,next_installment_date,member_id,passout,active,update_class,dor,created,modified,balance,visitor1,visitor1_r,visitor2,visitor2_r,visitor1_mobile,visitor2_mobile,visitor1_aadhar,visitor2_aadhar,type,stuck_of,stuck_of_by,stuck_of_date,unstuck_attachment,eligible_for_scholarship,disability,disability_per,old_admission_date,registration_no,father_aadhar_no,mother_aadhar_no,general_con,doa,reason_leave,ao_remark,leave_sno,reference,student,faculity_id"
});
db.version(20).stores({
admissions:"id,first_name,middle_name,last_name,guardian_name,relationship_with_guardian,guardian_qualification,guardian_org_desig,guardian_off_phone,guardian_off_address,mother_qualification,mother_off_address,mother_mobile,mother_off_phone,mother_name,dob,age,sex,religion,occupation,aadhaar_no,cast,category,avail_transport,avail_mess,avail_hostel,course_id,course_schedule_id,address1,address2,distt_id,state_id,city_id,pincode,nationality,student_mobile,father_mobile,home_landline,student_email,father_email,parents_marriage_anniversary,annual_income_family,applicant_proficiency,lang_english,lang_hindi,lang_punjabi,field_medical,field_cultural,field_sports,field_teacher,field_substitution,profile_image,registration_id,bg,rollno,section_id,csession_from,csession_to,next_installment_date,member_id,passout,active,update_class,dor,created,modified,balance,visitor1,visitor1_r,visitor2,visitor2_r,visitor1_mobile,visitor2_mobile,visitor1_aadhar,visitor2_aadhar,type,stuck_of,stuck_of_by,stuck_of_date,unstuck_attachment,eligible_for_scholarship,disability,disability_per,old_admission_date,registration_no,father_aadhar_no,mother_aadhar_no,general_con,doa,reason_leave,ao_remark,leave_sno,reference,student,faculity_id,course_name,course_schedule_name"
});
db.version(21).stores({
settings:"++id,day_limit,book_limit,fine_per_day"
});
db.version(22).stores({
  fine_details:"++id,student_id,book_ubn,fine,bookissue_id"
});
export default db;
