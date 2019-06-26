import db from './db';
import {AdmissionData} from './AdmissionData';
var CronJob = require('cron').CronJob;

const job = new CronJob('0 */1 * * * *', function() {

check();

});

function check()
{
db.table('admissions')
     .toArray()
     .then((admissions) => {
			 console.log("Total students are "+admissions.length)
			data(admissions.length);
		 });
}


function data(len)
{
	var obj;
  var token=sessionStorage.getItem('userData');
  AdmissionData(len,token).then((result)=>{
		let responseJson=result;
    if(responseJson.data.length===0)
    {
		console.log("You are not Authorized");
    }
  else {
    if(responseJson.data.data.length===0)
		{
			console.log("There are no new students on server.");
		}
		else {
			for(var i = 0; i < responseJson.data.data.length; i++) {

       var course_name='';
       var course_schedule_name='';
       if(responseJson.data.data[i].course===null)
       {
         course_name="No Course";
       }
       else {
         course_name=responseJson.data.data[i].course.name;
      }
      if(responseJson.data.data[i].course_schedule===null)
      {
        course_schedule_name="No Semester";
      }
      else {
        course_schedule_name=responseJson.data.data[i].course_schedule.name;
      }
       const student_details = {
         id:responseJson.data.data[i].id,
         first_name:responseJson.data.data[i].first_name,
         middle_name:responseJson.data.data[i].middle_name,
         last_name:responseJson.data.data[i].last_name,
         guardian_name:responseJson.data.data[i].guardian_name,
         relationship_with_guardian:responseJson.data.data[i].relationship_with_guardian,
         guardian_qualification:responseJson.data.data[i].guardian_qualification,
         guardian_org_desig:responseJson.data.data[i].guardian_org_desig,
         guardian_off_phone:responseJson.data.data[i].guardian_off_phone,
         guardian_off_address:responseJson.data.data[i].guardian_off_address,
         mother_qualification:responseJson.data.data[i].mother_qualification,
         mother_off_address:responseJson.data.data[i].mother_off_address,
         mother_mobile:responseJson.data.data[i].mother_mobile,
         mother_off_phone:responseJson.data.data[i].mother_off_phone,
         mother_name:responseJson.data.data[i].mother_name,
         dob:responseJson.data.data[i].dob,
         age:responseJson.data.data[i].age,
         sex:responseJson.data.data[i].sex,
         religion:responseJson.data.data[i].religion,
         occupation:responseJson.data.data[i].occupation,
         aadhaar_no:responseJson.data.data[i].aadhaar_no,
         cast:responseJson.data.data[i].cast,
         category:responseJson.data.data[i].category,
         avail_transport:responseJson.data.data[i].avail_transport,
         avail_mess:responseJson.data.data[i].avail_mess,
         avail_hostel:responseJson.data.data[i].avail_hostel,
         course_id:responseJson.data.data[i].course_id,
         course_schedule_id:responseJson.data.data[i].course_schedule_id,
         address1:responseJson.data.data[i].address1,
         address2:responseJson.data.data[i].address2,
         distt_id:responseJson.data.data[i].distt_id,
         state_id:responseJson.data.data[i].state_id,
         city_id:responseJson.data.data[i].city_id,
         pincode:responseJson.data.data[i].pincode,
         nationality:responseJson.data.data[i].nationality,
         student_mobile:responseJson.data.data[i].student_mobile,
         father_mobile:responseJson.data.data[i].father_mobile,
         home_landline:responseJson.data.data[i].home_landline,
         student_email:responseJson.data.data[i].student_email,
         father_email:responseJson.data.data[i].father_email,
         parents_marriage_anniversary:responseJson.data.data[i].parents_marriage_anniversary,
         annual_income_family:responseJson.data.data[i].annual_income_family,
         applicant_proficiency:responseJson.data.data[i].applicant_proficiency,
         lang_english:responseJson.data.data[i].lang_english,
         lang_hindi:responseJson.data.data[i].lang_hindi,
         lang_punjabi:responseJson.data.data[i].lang_punjabi,
         field_medical:responseJson.data.data[i].field_medical,
         field_cultural:responseJson.data.data[i].field_cultural,
         field_sports:responseJson.data.data[i].field_sports,
         field_teacher:responseJson.data.data[i].field_teacher,
         field_substitution:responseJson.data.data[i].field_substitution,
         profile_image:responseJson.data.data[i].profile_image,
         registration_id:responseJson.data.data[i].registration_id,
         bg:responseJson.data.data[i].bg,
         rollno:responseJson.data.data[i].rollno,
         section_id:responseJson.data.data[i].section_id,
         csession_from:responseJson.data.data[i].csession_from,
         csession_to:responseJson.data.data[i].csession_to,
         next_installment_date:responseJson.data.data[i].next_installment_date,
         member_id:responseJson.data.data[i].member_id,
         passout:responseJson.data.data[i].passout,
         active:responseJson.data.data[i].active,
         update_class:responseJson.data.data[i].update_class,
         dor:responseJson.data.data[i].dor,
         created:responseJson.data.data[i].created,
         modified:responseJson.data.data[i].modified,
         balance:responseJson.data.data[i].balance,
         visitor1:responseJson.data.data[i].visitor1,
         visitor1_r:responseJson.data.data[i].visitor1_r,
         visitor2:responseJson.data.data[i].visitor2,
         visitor2_r:responseJson.data.data[i].visitor2_r,
         visitor1_mobile:responseJson.data.data[i].visitor1_mobile,
         visitor2_mobile:responseJson.data.data[i].visitor2_mobile,
         visitor1_aadhar:responseJson.data.data[i].visitor1_aadhar,
         visitor2_aadhar:responseJson.data.data[i].visitor2_aadhar,
         type:responseJson.data.data[i].type,
         stuck_of:responseJson.data.data[i].stuck_of,
         stuck_of_by:responseJson.data.data[i].stuck_of_by,
         stuck_of_date:responseJson.data.data[i].stuck_of_date,
         unstuck_attachment:responseJson.data.data[i].unstuck_attachment,
         eligible_for_scholarship:responseJson.data.data[i].eligible_for_scholarship,
         disability:responseJson.data.data[i].disability,
         disability_per:responseJson.data.data[i].disability_per,
         old_admission_date:responseJson.data.data[i].old_admission_date,
         registration_no:responseJson.data.data[i].registration_no,
         father_aadhar_no:responseJson.data.data[i].father_aadhar_no,
         mother_aadhar_no:responseJson.data.data[i].mother_aadhar_no,
         general_con:responseJson.data.data[i].general_con,
         doa:responseJson.data.data[i].doa,
         reason_leave:responseJson.data.data[i].reason_leave,
         ao_remark:responseJson.data.data[i].ao_remark,
         leave_sno:responseJson.data.data[i].leave_sno,
         reference:responseJson.data.data[i].reference,
         student:responseJson.data.data[i].student,
         faculity_id:responseJson.data.data[i].faculity_id,
         course_name:course_name,
         course_schedule_name:course_schedule_name

      };


				add(student_details);
			}
    }
  }

	});
}



  function add(obj,index)
{

db.table('admissions')
			.where({id:obj.id})
			.toArray()
			.then((admissions) => {
				if (admissions === undefined || admissions.length === 0)
					{

						db.admissions.add(obj);

							 console.log("New Record inserted Successfully !");
					}

				});
}




export default job;
