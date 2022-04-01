//Return Json to object
const getData = async (url) => {
  const response = await fetch(url);

  return response.json();
}

//Russian to English bad converter
const transliterate = (text) => {
  text = text.replace(/\u0401/g, "Yo").replace(/\u0419/g, "I").replace(/\u0426/g, "Ts").replace(/\u0423/g, "U").replace(/\u041A/g, "K").replace(/\u0415/g, "E").replace(/\u041D/g, "N").replace(/\u0413/g, "G").replace(/\u0428/g, "Sh").replace(/\u0429/g, "Sch").replace(/\u0417/g, "Z").replace(/\u0425/g, "H").replace(/\u042A/g, "").replace(/\u0451/g, "yo").replace(/\u0439/g, "i").replace(/\u0446/g, "ts").replace(/\u0443/g, "u").replace(/\u043A/g, "k").replace(/\u0435/g, "e").replace(/\u043D/g, "n").replace(/\u0433/g, "g").replace(/\u0448/g, "sh").replace(/\u0449/g, "sch").replace(/\u0437/g, "z").replace(/\u0445/g, "h").replace(/\u044A/g, "'").replace(/\u0424/g, "F").replace(/\u042B/g, "I").replace(/\u0412/g, "V").replace(/\u0410/g, "A").replace(/\u041F/g, "P").replace(/\u0420/g, "R").replace(/\u041E/g, "O").replace(/\u041B/g, "L").replace(/\u0414/g, "D").replace(/\u0416/g, "ZH").replace(/\u042D/g, "E").replace(/\u0444/g, "f").replace(/\u044B/g, "i").replace(/\u0432/g, "v").replace(/\u0430/g, "a").replace(/\u043F/g, "p").replace(/\u0440/g, "r").replace(/\u043E/g, "o").replace(/\u043B/g, "l").replace(/\u0434/g, "d").replace(/\u0436/g, "zh").replace(/\u044D/g, "e").replace(/\u042F/g, "Ya").replace(/\u0427/g, "Ch").replace(/\u0421/g, "S").replace(/\u041C/g, "M").replace(/\u0418/g, "I").replace(/\u0422/g, "T").replace(/\u042C/g, "'").replace(/\u0411/g, "B").replace(/\u042E/g, "Yu").replace(/\u044F/g, "ya").replace(/\u0447/g, "ch").replace(/\u0441/g, "s").replace(/\u043C/g, "m").replace(/\u0438/g, "i").replace(/\u0442/g, "t").replace(/\u044C/g, "'").replace(/\u0431/g, "b").replace(/\u044E/g, "yu");
  return text;
};

//Capitalize FirstLetter of a Word
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//Json to attrib respective text
const atjs = (async (json, id)=>{
  let response = await getData(json);
  if (response[0][id] != undefined) {
    $("." + id).empty()
    $("." + id).append(response[0][id]);
  }
}) 
//Return Name of Class
const titler = (titleid, title)=> {
  atjs('./assets/resources/subjects.json', titleid)
  return title;
}
//Nickname
const nicks = (titleid, title)=> {
  atjs('./assets/resources/nicknames.json', titleid)
  return title;
}
//Return Class type
const subjecttype= (cltype, subtype)=>{
  return (
    capitalizeFirstLetter(cltype.toLowerCase()) +
    " Of " +
    capitalizeFirstLetter(subtype.toLowerCase())
  )
}
//return Professor name
const prof = (id, name)=> {
  return transliterate(name);
}
// Return Room number
const romer = (room)=> {
  if (room == "\u{41E}\u{43D}\u{43B}\u{430}\u{439}\u{43D}") {
    room = "Shit is Online!";
  }
  return room;
}
//It's a day thing
const dayd = (dae) => {
  for(let i =0; i<7; i++){
    let theday = dayjs().day(i)
    if(dae== theday.format('YYYY-MM-DD')){
      dae = 'id="'+
      theday.format('ddd').toLowerCase()+
      '"><p class="centertext">'+theday.format('ddd')
      
      if(i==0) dae += '\u{1F31E}'
      if(i==6) dae += '\u{1F919}'
           
      dae += ', '+ theday.format('DD')
      return dae;  
    }
      
  }

  dae = '><p class="centertext">'+dae
  return dae;
}

//Time shift
const timer = (n) =>
  `0${(n / 60) ^ 0}`.slice(-2) + ":" + ("0" + (n % 60)).slice(-2);

//Takes elements and Append it into timeline(List)
const constructTimeline =(list)=> {
  let selector = ".timeline";
  $(selector).empty()
  for (let i = 0; i < list.length && list[i][1]!=undefined; i++) {
    let dater;

      dater =
        '<li class="date"' +
        dayd(list[i][0]) +
        "</p></li>";
    $(selector).append(dater);
    dater = "";
    for (let j = 0; j < list[i][1].length; j++) {
      let seer = false;
      let x = list[i][1][j];

      if (x[0] != "EMPTY") {
        dater =
          '<li><div class="incld"><span></span>' +
          '<div class="' +
          x[1] +
          ' title">' +
          titler(x[1], x[2]) +
          "</div>" +
          '<div class="group">' +
          x[4] +
          "</div>" +
          '<div class="'+
          x[11] + '">' +
          nicks(x[11], x[5]) +
          "</div>" +
          '<div class="third">' +
          subjecttype(x[0], x[3]) +
          '<p class="fleft">' +
          romer(x[7]) +
          "</p></div></div></div>";

        j++;
        if(list[i][1][j] != undefined )
        while (list[i][1][j][0] != "EMPTY" && list[i][1][j][10] == 1) {
          x = list[i][1][j];
          dater +=
            '<div class="flow"><div>' +
            '<div class="' +
            x[1] +
            ' title">' +
            titler(x[1], x[2]) +
            "</div>" +
            '<div class="group">' +
            x[4] +
            "</div>" +
            '<div class="'+
            x[11] + '">' +
            nicks(x[11], x[5]) +
            "</div>" +
            '<div class="third">' +
            subjecttype(x[0], x[3]) +
            '<p class="fleft">' +
            romer(x[7]) +
            "</p></div>" +
            "</div></div>";

          j++;
        }
        j--;
        dater +=
          '<span class="number">' +
          "<span>" +
          timer(x[8]) +
          "</span>" +
          "<span>" +
          timer(x[9]) +
          "</span>" +
          "</span>" +
          "</li>";
      } else dater = "";

      $(selector).append(dater);
    }
    if(i==list.length-1)
      document.getElementById(totoday()).scrollIntoView();
  }
}

//Cleans the Json and Picks useful elements
const cleanData = (data) => {
  let list = [];

  for (let i = 0; i < data.length; i++) {
    let final = -1,
      flo = 1;
    let twoday = [];
    let kls = [];
    for (let j = 0; j < data[i]["lessons"].length; j++) {
      let type = data[i]["lessons"][j]["type"];
      let init = data[i]["lessons"][j]["starts"] / 60 - tz;
      let ends = data[i]["lessons"][j]["ends"] / 60 - tz;
      if (type != "EMPTY") {
        let titleid = data[i]["lessons"][j]["id"];
        let title = data[i]["lessons"][j]["title"];
        let lessonType = data[i]["lessons"][j]["lessonType"];
        let groups = data[i]["lessons"][j]["groups"][0]["name"];
        let professor = data[i]["lessons"][j]["professor"]["fullName"];
        let lessonNumber = data[i]["lessons"][j]["lessonNumber"];
        let audience = data[i]["lessons"][j]["audience"]["name"];
        let professorid = data[i]["lessons"][j]["professor"]["id"];

        if (init < final) flo = 1;
        else flo = 0;

        kls = [
          type, // 0
          titleid, // 1
          title, // 2
          lessonType, //3
          groups, // 4
          professor, // 5
          lessonNumber, // 6
          audience, // 7
          init, // 8
          ends, // 9
          flo, //10
          professorid, //11
        ];
      } else {
        kls = [type, init, ends];
      }
      twoday.push(kls);
      final = ends;
    }
    let xa = [];
    xa.push(data[i]["date"]);
    xa.push(twoday);
    list.push(xa);
  }
  return list;
}

//Scroll To::
const scrollto = (clickon, scrollto) =>{
  document.addEventListener("DOMContentLoaded", () => {
    var link = document.getElementById(clickon);
    //On Click
    link.addEventListener("click", () => {
      document.getElementById(scrollto).scrollIntoView();
    });
  });
}
//Redirect To::
const referto = (clickon, referto) =>{
  document.addEventListener("DOMContentLoaded", () => {
    var link = document.getElementById(clickon);
    //On Click
    link.addEventListener("click", () => {
      location.href = referto
    });
  });
}

const totoday = ()=>{
  return dayjs().format('ddd').toLowerCase()
}

const  pushingtopage = async () => {
  if(isChromium){
    chrome.storage.local.get('jsonData', (response)=>{
      if(response.jsonData!=undefined)
      {
        $("#guide_arrow").hide()
        constructTimeline(cleanData(response.jsonData.response))
      }
      else {
        $("#guide_arrow").show()
      }
    })
  }
  else if(isFirefox){
    browser.storage.local.get('jsonData').then((response)=>{
      if(response.jsonData!=undefined)
      {
        $("#guide_arrow").hide()
        constructTimeline(cleanData(response.jsonData))
      }
      else {
        $("#guide_arrow").show()
      }
    })
  }
}

pushingtopage()

scrollto("tobtn", totoday())
// referto("settings_ico", "./dashboard.html")
scrollto("sunb", "sun") 
scrollto("monb", "mon") 
scrollto("tueb", "tue") 
scrollto("wedb", "wed") 
scrollto("thub", "thu") 
scrollto("frib", "fri") 
scrollto("satb", "sat") 

//Hides Day Nav Bar
document.addEventListener("DOMContentLoaded", () => {
  var link = document.getElementById("tsuLogo");
    // onClick's logic below:
  link.addEventListener("click", () => {
      if(document.getElementById("navDay").style.display=='none'){
        $("#navDay").slideDown('slow');
      }
      else $("#navDay").slideUp('slow')
  });
});

//Storage Listner
if(isChromium){
  chrome.storage.onChanged.addListener((changes, namespace)=>{
    if('jsonData' in changes){
      pushingtopage();
    }
  })
}
else if(isFirefox){
  browser.storage.onChanged.addListener((changes, namespace)=>{
    if('jsonData' in changes){
      pushingtopage();
    }
  })
}