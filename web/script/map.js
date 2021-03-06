
// Mapオブジェクト
var map;

// デフォルトズーム
var zoom = 15;
// デフォルトの座標 35.658513, 139.701504
var latlng = new google.maps.LatLng(35.658513, 139.701504);

// Google Map のPinオブジェクト
var maker = [];

// イベントリスナ
var listener = [];

// YouTube Video ID
var video_id = [];
var song_id = [];
var am_id = [];




// Gmap イニシャライザ
function init(arg) {
    var Options = {
        zoom: zoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: mapStyle
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), Options);

    for (var i = 0; i < arg.length; i++) {

        (function (n) {
            var lat = arg[n]['lat'];
            var lng = arg[n]['lng'];
            var name = arg[n]['name'];
            var type = arg[n]['type'];
            var PinLatLng = {
                lat: lat,
                lng: lng
            };

            (function(m) {
                if (!type.match("other")) {
                        maker[m] = new google.maps.Marker({
                        position: PinLatLng,
                        map: map
                    });
                }
            })(n);

            (function(m) {
                listener[m] = google.maps.event.addListener(maker[m], "click", function () {
                    var html = [];
                    var insert_area = document.getElementById("insert-area");

                    if (type.match("youtube")) {
                        if (name.match("youtu.be")) {
                            video_id[m] = name.split("https://youtu.be/")[1];
                        } else if (name.match("youtube.com")) {
                            video_id[m] = name.split("https://www.youtube.com/watch?v=")[1];
                        }
                        html[m] = '<iframe width="100%" class="youtube_frame" src="https://www.youtube.com/embed/' + video_id[m] +'" frameborder="0" allowfullscreen></iframe>';
                        if (insert_area.hasChildNodes) {
                            document.getElementById("insert-area").removeChild(insert_area.childNodes[0]);
                        }
                        document.getElementById("insert-area").innerHTML = html[m];
                        document.getElementById("popup-trigger").click();
                    } else if (type.match("spotify")) {
                        song_id[m] = name.split("https://open.spotify.com/track/")[1];
                        html[m] = '<iframe src="https://embed.spotify.com/?uri=spotify%3Atrack%3A' + song_id[m] + '&theme=white&view=coverart" width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>';
                        if (insert_area.hasChildNodes) {
                            document.getElementById("insert-area").removeChild(insert_area.childNodes[0]);
                        }
                        document.getElementById("insert-area").innerHTML = html[m];
                        document.getElementById("popup-trigger").click();
                    } else if (type.match("apple_music")) {
                        am_id[m] = name.split("=")[1];
                        html[m] = '<iframe src="//tools.applemusic.com/embed/v1/song/' + am_id[m] + '?country=jp" height="110px" width="100%" frameborder="0"></iframe>';
                        if (insert_area.hasChildNodes) {
                            document.getElementById("insert-area").removeChild(insert_area.childNodes[0]);
                        }
                        document.getElementById("insert-area").innerHTML = html[m];
                        document.getElementById("popup-trigger").click();
                    }

                });
            })(n);


        })(i);
    }
}

// Mapの初期化
window.onload = function () {
    init(pins);
}
