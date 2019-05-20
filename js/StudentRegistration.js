$(document).ready(function () {
    $("#StuName").prop("readonly",true);
    $("#CouName").prop("readonly",true);
    $("#BatchName").prop("readonly",true);
    loadStudentDetails();
    loadCourseDetails();
    loadBatchDetails();
    loadData();
});
function loadData() {
    for (var i = 0; i < batch.length; i++) {
        for (var j = 0; j <course.length ; j++) {
            if(batch[i].courseId==course[j].courseId){
                html1 = '<tr>' +
                    '<td>' + batch[i].courseId + '</td>' +
                    '<td>' + course[j].courseName + '</td>' +
                    '<td>' + batch[i].batchId + '</td>' +
                    '<td>' + batch[i].batchName + '</td>' +
                    // '<td class="delete-item">' + '<button class="btn"></button>' + '</td>'
                    + '</tr>'
                $("#reg-data").append(html1);
            }
        }
    }
}
function loadStudentDetails() {
    for(var i=0;i<student.length;i++){
        var html='<a class="dropdown-item" href="#">'+student[i].studentId+'</a>';
        $("#StudentId .dropdown-menu").append(html);
    }
    $("#StudentId button").text($("#StudentId .dropdown-menu .dropdown-item:first-child").text());
    var firstCustomer=$("#StudentId .dropdown-menu .dropdown-item:first-child").text();
    $("#StudentId .dropdown-menu .dropdown-item").click(function () {
        $("#StudentId button").text($(this).text());
        for (var j = 0; j <student.length ; j++) {
            if($(this).text()==(student[j].studentId)){
                $("#StuName").val(student[j].stuName);
            }
        }
    });
}
function loadCourseDetails() {
    for(var i=0;i<course.length;i++){
        var html='<a class="dropdown-item" href="#">'+course[i].courseId+'</a>';
        $("#CourseId .dropdown-menu").append(html);
    }
    $("#CourseId button").text($("#CourseId .dropdown-menu .dropdown-item:first-child").text());
    var firstCustomer=$("#CourseId .dropdown-menu .dropdown-item:first-child").text();
    $("#CourseId .dropdown-menu .dropdown-item").click(function () {
        $("#CourseId button").text($(this).text());
        for (var j = 0; j <course.length ; j++) {
            if($(this).text()==(course[j].courseId)){
                $("#CouName").val(course[j].description);
            }
        }
    });
}
function loadBatchDetails() {
    for(var i=0;i<batch.length;i++){
        var html='<a class="dropdown-item" href="#">'+batch[i].batchId+'</a>';
        $("#BatchId .dropdown-menu").append(html);
    }
    $("#BatchId button").text($("#BatchId .dropdown-menu .dropdown-item:first-child").text());
    var firstCustomer=$("#BatchId .dropdown-menu .dropdown-item:first-child").text();
    $("#BatchId .dropdown-menu .dropdown-item").click(function () {
        $("#BatchId button").text($(this).text());
        for (var j = 0; j <batch.length ; j++) {
            if($(this).text()==(batch[j].batchId)){
                $("#BatchName").val(batch[j].batchName);
            }
        }
    });
}

function addNewClick() {
    $(" #student-id").prop("readonly",true);
    $("#student-name").focus();
    refresh();
    var lastStudentId=student[student.length-1].studentId.substr(1,3);
    if(parseInt(lastStudentId)<10){
        $("#student-id").val("S00"+(parseInt(lastStudentId)+1));
    }else if(parseInt(lastStudentId)<100){
        $("#student-id").val("S0"+(parseInt(lastStudentId)+1));
    }else if(parseInt(lastStudentId)<1000){
        $("#student-id").val("S"+(parseInt(lastStudentId)+1));
    }

}
function saveNewClick() {
    if (($("#student-name").val().length > 0) && ($("#student-contact").val().length > 0)) {
        var studentID = $("#student-id").val();
        var studentName = $("#student-name").val();
        var studentContact = $("#student-contact").val();
        student.push({studentId: studentID, stuName: studentName, stuContact: studentContact, batchId: ""});
        $("#StuIdBtn").text(studentID);
        $("#StuName").val(studentName);
        var html = '<a class="dropdown-item" href="#">' + studentID + '</a>';
        $("#StudentId .dropdown-menu").append(html);
    }
    else{
        alert("Please Enter The Fields...!")
    }
    $("#student-name").val("");
    $("#student-contact").val("");
}
function studentNamePressed(e) {
if(e.keyCode==13){
    $("#student-contact").focus();
}
}
function studentContactPressed(e) {
    if(e.keyCode==13){
        $("#SaveBtn").focus();
    }
}
function addNewReg() {
    if (($("#StuName").val().length > 0) && ($("#CouName").val().length > 0) && ($("#BatchName").val().length > 0)) {
    for (var i = 0; i < student.length; i++) {
        if (student[i].studentId == $("#StuIdBtn").text()) {
            student[i].batchId = $("#BatchIdBtn").text();
        }
    }
}else {
        alert("Please Apply All Field To Proceed...!")
    }

}
function refresh() {
    $("#StuName").val("");
    $("#CouName").val("");
    $("#BatchName").val("");
    $("#StudentId .dropdown-menu .dropdown-item").remove();
    $("#CourseId .dropdown-menu .dropdown-item").remove();
    $("#BatchId .dropdown-menu .dropdown-item").remove();
    loadStudentDetails();
    loadCourseDetails();
    loadBatchDetails();
}