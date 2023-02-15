$("form").submit(function (evt) {
    alert("Thank you for submitting");
    evt.preventDefault();
    console.log($(this).serializeArray());
});

$("#fav_shape").on('select', function (evt) {
    alert("your favorite shape is" + $(".shapes [name=fav_shape]").val());
});

function serializetoDictionary(formSelector) {
    let dic = {};
    let arr = $(formSelector).serializeArray();
    arr.forEach((pair) => dic[pair.name] = pair.value);
    return dic;}