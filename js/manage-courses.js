

$(document).ready(function () {

    loadAllCourses();

    generateId();

})

var generatedId;

function generateId(){
    var id=$("tr:last-child td:first-child").text();
    var idVal=parseInt(id.substring(3,6));
    generatedId = ("00"+(idVal+1)).slice(-3);
    $("#txtCourseID").val("CID"+generatedId);
    $("#txtCourseID").attr("disabled",true);
    $("#txtCourseName").focus();
}

function loadAllCourses(){

    $("#tblMCustomer tbody tr").remove();

    for (var i=0; i<courses.length;i++){

        var aId=courses[i].id;
        var aName=courses[i].name;
        var aDescription=courses[i].description;
        var aDuration=courses[i].duration;

        var html="<tr>" +
            "<td>"+aId+"</td>" +
            "<td>"+aName+"</td>" +
            "<td>"+aDescription+"</td>" +
            "<td>"+aDuration+"</td>" +
            "<td class='deleteIcon'><i class=\"fas fa-trash-alt\" style='font-size: 25px'></i></td>" +
            "</tr>";

        $("#tblMCustomer tbody").append(html);

        $("tbody tr").click(function () {

            var tableID=$($(this).children()[0]).text();
            var tableName=$($(this).children()[1]).text();
            var tableDescription=$($(this).children()[2]).text();
            var tableDuration=$($(this).children()[3]).text();

            $("#txtCourseID").val(tableID);
            $("#txtCourseID").attr("disabled",true);
            $("#txtCourseName").val(tableName);
            $("#txtDescription").val(tableDescription);
            $("#txtDuration").val(tableDuration);

            $("#btnSave").text("Update");
        })

        $("tbody tr:last-child .deleteIcon").click(function () {
            if (confirm("Are you sure to delete this?")) {
                var row = $(this).parents("tr");
                row.fadeOut(500, function () {
                    row.remove();
                    generateId();
                });
            }

        })
    }

};

$("#btnSave").click(function () {

    var valCourseId=$("#txtCourseID").val().trim();
    var valCourseName=$("#txtCourseName").val().trim();
    var valDescription=$("#txtDescription").val().trim();
    var valDuration=$("#txtDuration").val().trim();

    var validation=true;

    if (valDuration.length==0){
        validation=false;
        $("#txtDuration").addClass("invalid");
        $("#txtDuration").focus();
    }

    if (valDescription.length==0){
        validation=false;
        $("#txtDescription").addClass("invalid");
        $("#txtDescription").focus();
    }

    if (valCourseName.length==0){
        validation=false;
        $("#txtCourseName").focus();
        $("#txtCourseName").addClass("invalid");
    }

    if (valCourseId.length==0){
        validation=false;
        $("#txtCourseID").focus();
        $("#txtCourseID").addClass("invalid");
    }
    if(!validation){
        return;
    }

    if($("#btnSave").text()==="Update"){

        var course = courses.find(function (course) {
            return course.id==valCourseId;
        });

        course.name=valCourseName;
        course.description=valDescription;
        course.duration=valDuration;
        $("#btnSave").text("Save");
        $("#txtCustomerId").attr("disabled",false);

    }else {

        courses.push({
            id:valCourseId,
            name:valCourseName,
            description:valDescription,
            duration:valDuration
        })

    }

    loadAllCourses();

    $("#txtDuration").val("");
    $("#txtDescription").val("");
    $("#txtCourseName").val("");

    generateId();

})

$("#txtDuration").keydown(function () {
    $("#txtDuration").removeClass("invalid");

})
$("#txtDescription").keydown(function () {
    $("#txtDescription").removeClass("invalid");

})
$("#txtCourseName").keydown(function () {
    $("#txtCourseName").removeClass("invalid");

})
$("#txtCourseID").keydown(function () {
    $("#txtCourseID").removeClass("invalid");

})

$("#btnClear").click(function () {
    $("#txtDuration").val("");
    $("#txtDescription").val("");
    $("#txtCourseName").val("");
    $("#txtCourseName").focus();

    generateId();

    $("#btnSave").text("Save");
})

