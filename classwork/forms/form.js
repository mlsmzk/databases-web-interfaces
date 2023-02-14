$("form").submit(function (evt) {
    alert("Thank you for submitting");
    evt.preventDefault();
    console.log($(this).serializeArray());
});

$("#fav_shape").on('select', function (evt) {
    alert("your favorite shape is" + $(".shapes [name=fav_shape]").val());
});