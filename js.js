
const img="http://openweathermap.org/img/w/";
const lst=[];
let info;
let date;

$.get("http://api.openweathermap.org/data/2.5/weather?q=Tbilisi&units=metric&appid=fb8d58cdca03f5776cbe8e21a8656ddf",function(data,status){
    info={
        name:data.name, country:data.sys.country, temp:data.main.temp, 
        head:data.weather[0].main, icon:data.weather[0].icon
    };
    lst.push(info.name);
    date=new Date(data.dt*1000-(data.timezone*1000));
    let dat=makeDateString(date);
    document.getElementById("list-container").innerHTML+=`<div class="list">
    <div class="head">${info.head}</div>
        <div class="info-container">
            <div class="temp">${info.temp}°</div>
            <div class="info-side">
                <div class="more-info">
                    <div class="date">${dat}</div>
                    <div class="location">
                        <img src="images/location mark.svg" alt="" class="ig">
                        <div class="location">${info.name},${info.country}</div>
                    </div>
                </div>
                <div><img src="http://openweathermap.org/img/w/${info.icon}.png" alt="" class="icon"></div>
            </div>
        </div>
    </div>`
})
$(document).ready(function(){
    $("button").click(function(){
        let name=document.getElementById("City").value;
        $.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=fb8d58cdca03f5776cbe8e21a8656ddf`,function(data,status){
            let info={
                name:data.name, country:data.sys.country, temp:data.main.temp, 
                head:data.weather[0].main, icon:data.weather[0].icon
            };
            if (status!=404){
                if (lst.indexOf(info.name)==-1){
                    lst.push(info.name);
                    date=new Date(data.dt*1000-(data.timezone*1000));
                    let dat=makeDateString(date);
                    document.getElementById("list-container").innerHTML+=`<div class="list">
                        <div class="head">${info.head}</div>
                            <div class="info-container">
                                <div class="temp">${info.temp}°</div>
                                <div class="info-side">
                                    <div class="more-info">
                                        <div class="date">${dat}</div>
                                        <div class="location">
                                            <img src="images/location mark.svg" alt="" class="ig">
                                            <div class="location">${info.name},${info.country}</div>
                                        </div>
                                    </div>
                                    <div><img src="http://openweathermap.org/img/w/${info.icon}.png" alt="" class="icon"></div>
                                </div>
                            </div>
                        </div>`
                }else{
                    popUp("City Already Exist In List");
                }
            }
        })
    })
})
function popUp(txt){
    console.log(1);
    document.getElementById("pop-up").innerHTML=txt;
    document.getElementById("pop-up").style.width="300px";
    document.getElementById("pop-up").style.height="150px";

}
function closepopup(){
    document.getElementById("pop-up").style.width="0px";
    document.getElementById("pop-up").style.height="0px";
    document.getElementById("pop-up").innerHTML="";
}
function makeDateString(x){
    let string="";
    let months=["January","February","march","april","may","june","july",
                "Agust","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    string+=days[x.getDay()]+", ";
    string+=x.getDate() +" ";
    string+=months[x.getMonth()];
    return string;
}