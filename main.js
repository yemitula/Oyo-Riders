function riders() {
    var riders = JSON.parse(oyo_riders);
    var input = document.getElementsByClassName(input100);
    var ul = document.getElementsByClassName(list - group);
    var filter = input100.value.toUppeerCase();
}



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