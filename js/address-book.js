/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()


/* render()
    Uses the html template and creates a person div for each 
    entry in the entries array.

    entries         array of objects to render

    returns undefined
*/
function render(entries) {
    var person = $(".template");
    var addressBook = $(".address-book");

    addressBook.hide();
    addressBook.empty();

    // for each entry, clone the template, set entry information, and 
    //append to address book
    for(var i = 0; i < entries.length; i++) {
        var newPerson = person.clone();

        newPerson.find(".first").html(entries[i].first);
        newPerson.find(".last").html(entries[i].last);
        newPerson.find(".title").html(entries[i].title);
        newPerson.find(".dept").html(entries[i].dept);
        newPerson.find(".pic").attr("src", entries[i].pic);
        newPerson.find(".pic").attr("alt", "picture of " + entries[i].first);

        newPerson.removeClass("template");

        addressBook.append(newPerson);
    }

    //fade-in animation
    addressBook.fadeIn()
}

$(".sort-ui .btn").click(function() {
    var sortBtn = $(this); 
    var sortby = sortBtn.attr('data-sortby');
    sortObjArray(Employees.entries, sortby);
    render(Employees.entries);

    sortBtn.siblings(".active").removeClass("active");
    sortBtn.addClass("active");
});

$(function() {
    sortObjArray(Employees.entries, "last")
    render(Employees.entries)
});