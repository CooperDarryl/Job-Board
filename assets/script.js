$(document).ready(function() {

    //Log contrast value
 console.log(localStorage.getItem("contrast"));

    //Check what local storage contrast value is (run each time a page loads)
if (localStorage.getItem("contrast") == "enabled"){

    //if enabled invert page
    $("body").css({filter : "invert(100%)"}).delay( 500 );
    $("html").css("background-color", "black");

}
    //if disabled remove invert
else if (localStorage.getItem("contrast") == "disabled") {
    $("body").css({filter : "invert(0%)"}).delay( 500 );
    $("html").css("background-colour", "#f7f7f7");
}
    //On invert button click set value depending on currect value of local storage key contrast
$("#invert").click(function(){
    
        //if key contrast is null or disabled then fade page out, apply invert and fade page in after delay
    if (localStorage.getItem("contrast") == null || localStorage.getItem("contrast") == "disabled"){
        localStorage.setItem("contrast", "enabled");
        $("body").animate({
            opacity: 0
        });
        setTimeout(function(){
        $("body").css({filter : "invert(100%)"}).delay( 100);
        $("body").animate({
            opacity: 1.0
        })
        $("html").css("background-colour", "black"); },1200);
    }       
            //if kry contrast is enabled fade out page, remove invert and fade page in
             else{
                localStorage.setItem("contrast", "disabled");
                $("body").animate({
                    opacity: 0
                });
                setTimeout(function(){$("body").css({filter : "invert(0%)"}).delay( 100);
                $("body").animate({
                    opacity: 1.0
                })
                $("html").css("background-color", "#f7f7f7"); },1200);
             }
             //log key contrast value
    console.log(localStorage.getItem('contrast'));
});

//Store value of current job title to variable in breadcumb (apply pages)
var crumb = $("#jtitle").html();

    //Get span #current and apply vacancy title
    $("#current").html(crumb);

    //On submit (button click) of vacany application check form inputs and display alert or modal depending on completion
    $("#submit").click(function() {
        $("form").on('submit', function(e) {
            e.preventDefault();
        });

        //Check for valid email input
        var em = $("#email").val();
        var index = em.indexOf("@");

        //check if either subject or email or upload or description blank highlight inputs and alert user
        if ($("#subject").val() === "" || $("#email").val() === "" || $("#upload").val() === "" || $("#desc").val() === "") {
            alert("Please complete all fields and upload your CV before attempting to submit.")
            var isValid3;
            //loop through input fields and add class to apply or remove bootstrap invalid highlight
            $("#applyform input").each(function() {
                var form3 = $(this);
                if (form3.val() == "") {
                    isValid3 = false;
                    $(this).addClass("is-invalid");
                } else if (form3.val() !== "") {
                    $(this).removeClass("is-invalid");
                }
            })
            var inputD1 = $("#desc").val()
            toString(inputD1);
            if (inputD1 == "" || inputD1 >= 500) {
                $("#desc").addClass("is-invalid");
            } else {
                $("#desc").removeClass("is-invalid");
            }
                //If @ symbol not found in email input alert user
        } else if (index == -1) {
            alert("Please enter a valid email address!");

            // if all fields complete add logo to modal + description from values captured from form and page then disable form inputs and submit button
        } else {
            $("#mtitle").html("<img src='assets/img/logo1.png' width='50' height='50' alt='job board logo'> Good Luck");
            $("#mbody").html("Your application for " + $("#jtitle").html() + " at " + $("#comp").html() + " has been submitted.<br/><br/><p><a href='index.html'>Home</a></p>");
            $(".is-invalid").removeClass("is-invalid");
            $("#submit").removeClass('btn-primary');
            $('#success').modal('show');
            $("#submit").addClass('btn-success');
            $("#submit").html('Application Submitted');
            $("#submit").attr("disabled", true);
            $("#applyform :input").prop("disabled", true);
        }

    });

        // On click of save button capture vacancy info and apply to modal, diaply modal to confirm save.
    $("#save").click(function() {
        $("form").on('submit', function() {
            e.preventDefault();
        });
        $("#mtitle").html("<img src='assets/img/logo1.png' width='50' height='50' alt='job board logo'> Saved");
        $("#mbody").html($("#jtitle").html() + " at " + $("#comp").html() + " has been added to your favourites list.<br/><br/><p><a href='index.html'>Home</a></p>");
        $('#success').modal('show');
        $("#save").removeClass('btn-info');
        $("#save").addClass('btn-warning');
        $("#save").html('Saved');
        $("#save").attr("disabled", true);
    });

    //  Browse for image file, upload this to temp storage and display in .clogo division
    $(document).on("click", ".browse", function() {
        var file = $(this).parents().find(".file");
        file.trigger("click");
    });
    $('input[type="file"]').change(function(e) {
        var fileName = e.target.files[0].name;
        $("#file").val(fileName);

        var reader = new FileReader();
        reader.onload = function(e) {
            // get loaded data and render thumbnail.
            $(".clogo").attr("src", e.target.result);
        };
        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
    });

        // Listen for change to #reg drop down and display appropriate form depending on value of drop down
    $("#reg").change(function() {
        var reg = $("#reg").val();

        if (reg == 2) {
            
            $("#cominfo").hide();
            $("#regs").hide();
            $("#regc").removeClass("col-md-12");
            $("#regc").addClass("col-md-6");
            $("#jbidc").fadeIn("slow");
            $("#vacdetails").slideDown("slow");


        } else {
            $("#jbidc").hide();
            $("#vacdetails").hide();
            $("#regs").show();
            $("#regc").addClass("col-md-12");
            $("#regc").removeClass("col-md-6");
            $("#cominfo").slideDown("slow");
        }

    });


        // On click of submit button for company form store values of fields to variables and check these are not blank, if so alert user and highlight fields
    $("#subcom").click(function() {
        $("form").on('submit', function(e) {
            e.preventDefault();
        });
        var src = $("#file").parent().find('img').attr('src');
        var name = $("#inputConFnam").val() + " " + $("#inputComSnam").val();
        var email = $("#inputConEm").val();
        var phone = $("#inputConPh").val();
        var comp = $("#inputComNam").val();


        if (comp === "" || $("#inputConFnam").val() === "" || $("#inputComSnam").val() === "" || email === "" || phone === "" || $("#inputAddress").val() === "" || $("#inputCity").val() === "" || $("#inputPost").val() === "") {
            alert("Please ensure all fields are completed.");

            // add invalid class to county select if invalid else remove
            var county = $("#inputCount").val();
            if (county == "") {
                $("#inputCount").addClass("is-invalid")
            } else {
                $("#inputCount").removeClass("is-invalid")
            }

            // loop through all input fields in form and apply or rempve invalid class depending if these are blank or not
            $("#compform input").each(function() {
                var isValid1;
                var form1 = $(this);
                if (form1.val() == "") {
                    isValid1 = false;
                    $(this).addClass("is-invalid");
                } else if (form1.val() !== "") {
                    $(this).removeClass("is-invalid");
                }
            });

            // if value of placeholder logo has not changed alert user and add class to infrom of being invalid
        } else if (src === "assets/img/tmp/placehold.png") {
            alert("Don't forget to upload your company logo.");
        } else if ($("#gridCheck").prop("checked") === false) {
            alert("Please confirm you have read our privacy policy.");
            $("#gridCheck").addClass("is-invalid");

            // if all forms fields complete amend dom of modal with form data and display thid and disable inputs
        } else {
            $("#compform form").prop('disabled', true);
            $("#mtitle").html("<img src='assets/img/logo1.png' width='50' height='50' alt='job board logo'> Thank You");
            $("#mbody").html("<p>Thank you for registering with JobBoard, we will get in contact with you within 5 working day to confirm your details.</p><p>Contact name: <strong>" + name + "</strong></p><p>Contact email: <strong>" + email + "</strong></p><p>Contact phone: <strong>" + phone + "</strong></p><p>Company: <strong>" + comp + "</strong></p><a href='index.html'>Home</a>");
            $(".is-invalid").removeClass("is-invalid");
            $('#success').modal('show');
            $("#compform *").prop('disabled', true);
        }
    });

            // on clcik of vacancy submit button store date to variable and amend to UK format, check form inputs are not blank
    $("#subvac").click(function() {
        $("form").on('submit', function(e) {
            e.preventDefault();
        });
        // reverse the month and day pf date string 
        var date = $("#inputDat").val();
        date = date.split("-").reverse().join("-");
        console.log(date);

        // check values of form inputs are not blank
        if ($("#inputTitle").val() === "" || $("#inputType").val() === "" || $("#inputHours").val() === "" || $("#inputSal").val() === "" || $("#inputDat").val() === "" || $("#inputDesc").val() === "" || $("#inputSkill").val() === "" || $("#inputSkill2").val() === "") {
            alert("Please ensure all fields are completed.");
            var isValid2;
            // check inputs, if blank add is-invalid class if not remover this class
            $("#vacdetails input").each(function() {
                var form2 = $(this);
                if (form2.val() == "") {
                    isValid2 = false;
                    $(this).addClass("is-invalid");
                } else if (form2.val() !== "") {
                    $(this).removeClass("is-invalid");
                }
                // check description textarea, if blank add is-invald class or remove this if not
                var inputD1 = $("#inputDesc").val()
                toString(inputD1);
                if (inputD1 == "" || inputD1 >= 1000) {
                    $("#inputDesc").addClass("is-invalid");
                } else {
                    $("#inputDesc").removeClass("is-invalid");
                }
                // check jobboard id input field, if blank add is-invalid class if not remove this
                var JBID = $("#jbid").val()
                if (JBID == "") {
                    $("#jbid").addClass("is-invalid");
                } else {
                    $("#jbid").removeClass("is-invalid");
                }  
                // check job type select field, if blank ad is-invaliid class, if not remove this
                if ($("#inputType").val() === ""){
                    $("#inputType").addClass("is-invalid");
                }
                else {
                    $("#inputType").removeClass("is-invalid");
                }
            });
            // diaply alert if jobboard is field is incomplete
        } else if ($("#jbid").val() === "") {
            alert("Don't forget to enter your JobBoard ID!");
        } 
        
            // check privacy policy check box has been checked, if not add invalid class
        else if ($("#gridCheck2").prop("checked") === false) {
            alert("Please confirm you have read our privacy policy.");
            $("#gridCheck2").addClass("is-invalid");
        } 
            // If all fields complete caputrue form info and and amaend dom of modal, display this and disble form
        else {
            $("#compform form").prop('disabled', true);
            $("#mtitle").html("<img src='assets/img/logo1.png' width='50' height='50' alt='job board logo'> Thank You");
            $("#mbody").html("<p>Thank you for submitting your vacancy with us, we will get in contact with you within 5 working days to confirm the details of the post.</p><p>Job Title: <strong>" + $("#inputTitle").val() + "</strong></p><p>Type: <strong>" + $("#inputType").val() + "</strong></p><p>Hours: <strong>" + $("#inputHours").val() + "</strong></p><p>Salary: <strong>" + $("#inputSal").val() + "</strong></p><p>Expiry: <strong>" + date + "</strong></p><a href='index.html'>Home</a>");
            $("#vacform *").prop('disabled', true);
            $(".is-invalid").removeClass("is-invalid");
            $('#success').modal('show');

        }
    });
});