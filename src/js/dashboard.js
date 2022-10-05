//fetch async function
const getData = async (url) => {
    const response = await fetch(url);
  
    return response.json();
}
//makes fac optional
const selectFac = (async () =>{
    let json = await getData('./assets/resources/faculties.json')
    var select = $("#faculties")
    .attr("id", "faculties");
    $.each(json,(index,json)=>{
     select.append($("<option></option>")
     .attr("id", json.id)
     .text(json.name));
    });
    $("#faculties").append('<option class="blank" selected>Select Faculty</option>')
})
//makes stud optional
const selectGroup = (async (fac) =>{
    let aurl = `https://intime.tsu.ru/api/web/v1/faculties/${fac}/groups`
    let json = await getData(aurl)
    let select = $("#groups")
    .attr("id", "groups");
    $.each(json,(index,json)=>{
     select.append($("<option></option>")
     .attr("id", json.id)
     .text(json.name));
    });
    $("#groups").append('<option class="blank" selected>Select Group</option>')
    $("#groups").show() 

})
//makes prof optional
const selectProf = (async () =>{
    let json = await getData('./assets/resources/professors.json')
    var select = $("#professors")
    .attr("id", "professors");
    $.each(json,(index,json)=>{
     select.append($("<option></option>")
     .attr("id", json.id)
     .text(json.fullName));
    });
    $("#professors").append('<option class="blank" selected>Select Name</option>')
})
//intialized tables
selectFac()
selectProf()

//start of penetration
var fac, group;
$(document).ready(()=>{
$('#faculties').change(function(){
    fac = $('option:selected', this)[0].id
    $('#groups').empty()
    $("#groups").hide()
    selectGroup(fac);
    })
})
var type = "students"
$(document).ready(()=>{
    $('#groups').change(function(){
        group = $('option:selected', this)[0].id
        type = "student"
    })
})
$(document).ready(() => {
    $('#professors').change(function(){
        group = $('option:selected', this)[0].id
        type = "professor"
    })
})


document.addEventListener("DOMContentLoaded", () => {
    var link = document.getElementById("submit");
      // onClick's logic below:
    link.addEventListener("click", () => {
        if(group != undefined){
            if(isChromium){
                chrome.storage.sync.set({'properties':{"id": group,"type": type}}, ()=>{})
            }
            else if(isFirefox){
                browser.storage.local.set({'properties':{"id": group,"type": type}})
            }
        }
        location.href = 'popup.html'
    });
});


$("#container").flip({
    axis: "y", 
    reverse: false, 
    trigger: "manual",
    speed: '1000',
    front: '.studentB',
    back: '.profB',
});
  
//flip for profos 
document.addEventListener("DOMContentLoaded", () => {
    var link = document.getElementById("exchange");
      // onClick's logic below:
    link.addEventListener("click", () => {
        $("#container").flip('toggle')
    });
});