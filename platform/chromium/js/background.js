self.importScripts('../lib/dayjs.min.js')
var startOfWeek = dayjs().day(0).format('YYYY-MM-DD')
var endOfWeek = dayjs().day(6).format('YYYY-MM-DD')

const fetchSave = async (aurl) => {
    var list = await fetch(aurl).then((response)=>{
            return response.json()
        }, (reason)=>{
            console.log("Failed due to "+ reason)
        }).then((response)=>{
            chrome.storage.local.set({'jsonData':{response}}, ()=>{})  
    })
}

const initprop = (props)=>{
    
    group = props.id
    type = props.type
    if(type=="student"){
        thisweek = `https://intime.tsu.ru/api/web/v1/schedule/group?id=${group}&dateFrom=${startOfWeek}&dateTo=${endOfWeek}`
    }
    else if(type=="professor"){ 
     thisweek = `https://intime.tsu.ru/api/web/v1/schedule/professor?id=${group}&dateFrom=${startOfWeek}&dateTo=${endOfWeek}`
    }
    fetchSave(thisweek);
}
//Big loader
const loader = () => {
    chrome.storage.local.get('properties', (response)=>{
        if(response.properties!=undefined){
            initprop(response.properties);
        }
    })
}
loader()

// Refresh local data if properties are changes again
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if('properties' in changes ){
        initprop(changes.properties.newValue);
    }
});

// Refresh local data in periodic measures
chrome.alarms.create('refresh', { periodInMinutes: 60*6 });
chrome.alarms.onAlarm.addListener((alarm) => {
    startOfWeek = dayjs().day(0).format('YYYY-MM-DD')
    endOfWeek = dayjs().day(6).format('YYYY-MM-DD')
    loader();
});