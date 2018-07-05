$(document).ready(function() {
    //start gps
    if (!navigator.geolocation){
        console.log("Geolocation is not supported by your browser");

    }

    function success(position) {
        var latitude  = (position.coords.latitude).toFixed(2) ;
        var longitude =  ( position.coords.longitude).toFixed(2);

        //console.log('Latitude is ' + latitude + 'Longitude is ' + longitude );
        var apisrc = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude+ "&" + "lon=" + longitude;

        $.ajax({
            type: 'get',
            url: apisrc,
            async: true,
            cache: false,
            dataType: "json",
            success: function(json) {
                var html = "";
                $(".name").html( JSON.stringify(json['name']));

                var currT= (JSON.stringify(json.main['temp'])+' C');
                var currF= (Math.round((JSON.stringify(json.main['temp']*1.8+32))))+' F';

                $(".temp").html(currT);

                //console.log((currF.toFixed(2)));

                function modifyT() {
                    var t2 = document.getElementById("temp");
                    if (t2.firstChild.nodeValue == currT) {
                        t2.firstChild.nodeValue = currF;
                    } else {
                        t2.firstChild.nodeValue = currT;
                    }
                }

                var el = document.getElementById("temp");
                el.addEventListener("click", modifyT, false);

                var imageLink=JSON.stringify(json.weather[0].icon);
                html += "<img src = " + imageLink + " " + "alt='" + 'Txt' + "'>";
                $(".ico").html(html);
            }

        });

    }

    function error() {
        console.log("Unable to retrieve your location")
    }

    navigator.geolocation.getCurrentPosition(success, error)

} );
