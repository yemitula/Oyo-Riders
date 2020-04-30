var riders = JSON.parse(data);
var user1_name = riders[0].name;
var user1_age = riders[0].phone;
var user2_name = riders[1].name;
var user2_age = riders[1].phone;


$(document).ready(function() {
    $('#Registration Number').keyup(function() {
        $('#result').html('');
        var searchField = $('#Registation Number').val();
        var expression = new RegExp(searchField, "i");
        $.getJson('oyo_riders.json', function(oyo_riders) {
            $.each(oyo_riders, function(key, value) {
                if (value.name.search(expression) != -1 ||
                    value.regno.search(expression) != -1) {
                    $('result').append('<li class ="riders" >' + value.name + ' </li>');
                }
            })
        })
    }))

})