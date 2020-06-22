$(document).ready(function() {
    
    $("#show-password").on('click', function() {
        var x = document.getElementById("password");
        x.type = (x.type === "password") ? "text" : "password";
    });
});
