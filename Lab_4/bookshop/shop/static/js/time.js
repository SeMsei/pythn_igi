const today = new Date();
                    const yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1;
                    let dd = today.getDate();
                    let h = today.getHours();
                    if (h<10)
                        h = '0' + h;
                    let min = today.getMinutes();
                    if (min < 10)
                        min = '0' + min;
                    let sec = today.getSeconds();
                    if (sec < 10)
                        sec = '0' + sec;
    
                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;
    
                    let formattedToday = dd + '/' + mm + '/' + yyyy;
                    let time = h+":"+min+":"+sec; 
                    let tz = -(new Date().getTimezoneOffset() / 60);
                    if(tz>0){
                        tz = "+" + tz;
                    }
                    tz = "UTC" + tz;
                    document.getElementById('date').innerHTML=formattedToday;
                    document.getElementById('time').innerHTML=time;
                    document.getElementById('zone').innerHTML=tz;