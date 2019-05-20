$(document).ready(function () {

    for (var j=0; j<courses.length; j++) {
        $("#cmbCourseId").append("<option>"+courses[j].id+"</option>")}

    loadAllBatches();

    $("#txtCourseName").attr("disabled",true);

    $("#cmbCourseId").focus();
});

function loadAllBatches() {

    $("#tblMBatches tbody tr").remove();

    for (var j=0; j<batches.length; j++){

        var batchId=batches[j].id;
        var batchName=batches[j].name;
        var bCourseId=batches[j].cid;
        var bCourseName=batches[j].cname;

        var html="<tr>" +
            "<td>"+batchId+"</td>" +
            "<td>"+batchName+"</td>" +
            "<td>"+bCourseId+"</td>" +
            "<td>"+bCourseName+"</td>" +
            "<td class='deleteIcon'><i class=\"fas fa-trash-alt\" style='font-size: 25px'></i></td>" +
            "</tr>";

        $("#tblMBatches tbody").append(html);

        $("tbody tr").click(function () {

            var tblBatchId=$($(this).children()[0]).text();
            var tblBatchName=$($(this).children()[1]).text();
            var tblCourseId=$($(this).children()[2]).text();
            var tblCourseName=$($(this).children()[3]).text();

            $("#cmbCourseId").val(tblCourseId);

            $("#txtCourseName").val(tblCourseName);
            $("#txtBachId").val(tblBatchId);
            $("#txtBatchName").val(tblBatchName);

            $("#btnSave").text("Update");
        })

        $("tbody tr:last-child .deleteIcon").click(function () {
            if (confirm("Are you sure to delete this?")) {
                var row = $(this).parents("tr");
                row.fadeOut(500, function () {
                    row.remove();

                });
            }

        })

    }
}

$("#cmbCourseId").change(function () {

    $("#txtCourseName").removeClass("invalid");
    $("#cmbCourseId").removeClass("invalid");

    var courseID=$("#cmbCourseId").val();

    for (var j=0; j<courses.length; j++) {

        if (courseID==courses[j].id){

            $("#txtCourseName").val(courses[j].name);
            $("#txtBachId").focus();

        }

    }
});

$("#btnSave").click(function () {

    var courseID=$("#cmbCourseId").val();
    var courseName=$("#txtCourseName").val().trim();
    var batchID=$("#txtBachId").val().trim();
    var batchName=$("#txtBatchName").val().trim();

    var flag=true;

    if (batchName.length==0){

        $("#txtBatchName").addClass("invalid");
        $("#txtBatchName").focus();
        flag=false;

    }

    if (batchID.length==0){

        $("#txtBachId").addClass("invalid");
        $("#txtBachId").focus();
        flag=false;

    }

    if (courseName.length==0){

        $("#txtCourseName").addClass("invalid");
        $("#cmbCourseId").addClass("invalid");
        $("#cmbCourseId").focus();
        flag=false;

    }

    // for (var j=0; j<$("#tblMBatches tr").length; j++){
    if ($("#btnSave").text()!=="Update") {
        $("#tblMBatches tbody tr td:first-child").each(function () {
            var bId = $(this).text();
            if (bId === batchID) {
                alert("Batch Id is already exists in the table");
                $("#txtBachId").select();
                $("#txtBachId").addClass("invalid");
                flag = false;

            }
        });
    }


    if (!flag) {
        return;

    }

    if ($("#btnSave").text()=="Update"){

        var batch = batches.find(function (batch) {
            return batch.id==batchID;
        });

        batch.name=batchName;
        batch.cid=courseID;
        batch.cname=courseName;
        $("#btnSave").text("Save");


    } else {

        batches.push({
            id:batchID,
            name:batchName,
            cid:courseID,
            cname:courseName
        })

    }

    loadAllBatches();

    clearTexts();

});

$("#txtBachId").keydown(function () {
    $("#txtBachId").removeClass("invalid");

});

$("#txtBatchName").keydown(function () {
    $("#txtBatchName").removeClass("invalid");

});

$("#btnClear").click(function () {
    clearTexts();
})

function clearTexts() {
    $("#cmbCourseId").val("");
    $("#txtCourseName").val("");
    $("#txtBachId").val("");
    $("#txtBatchName").val("");

    $("#btnSave").text("Save");
}