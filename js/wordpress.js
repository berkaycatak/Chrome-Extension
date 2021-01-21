const website = 'https://sosyopatlar.com/';
const websiteName = 'Sosyopatlar';

var note = document.getElementById("note");
note.innerHTML = 'İçerik sağlayıcı: <a href="'+website+'">' + websiteName +'</a>';
var page = 1;
function icerikGetir(bas) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
      var json = xhr.responseText;                         // Response
      json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
      json = JSON.parse(json);                             // Parse JSON
      json.forEach(function(element) {

        element.title.rendered = element.title.rendered.substring(0, 35) + "...";

        var body = document.getElementById("body");

        // en baştaki a
        var a = document.createElement('a');
        var linkText = document.createTextNode("");
        a.appendChild(linkText);
        a.href = website + element.slug;
        a.target = '_blank';
        var aid = "link" + element.id;
        a.id = aid;
        document.body.appendChild(a);
        body.appendChild(a); // en baştaki a
        // en baştaki a

        // article div
        var articleDiv = document.createElement("div");
        articleDiv.setAttribute('class', 'article');
        a.appendChild(articleDiv); // en baştaki a
        // article div

        // left1 div
        var left1div = document.createElement("div");
        left1div.setAttribute('class', 'left');
        articleDiv.appendChild(left1div); // en baştaki a
        // left1 div

        // left1 img
        try {
          var xhrr2 = new XMLHttpRequest();
          xhrr2.onload = function() {
              var json2 = xhrr2.responseText;                         // Response
              json2 = json2.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
              json2 = JSON.parse(json2);                             // Parse JSON

              var left1img = document.createElement("img");
              if (json2["code"] != 'rest_post_invalid_id') {
                console.log(json2["source_url"]);
                left1img.setAttribute('src', json2["source_url"]);
              }else{
                left1img.setAttribute('src', 'https://i.resimyukle.xyz/4O5VTz.jpg');
              }
              left1img.setAttribute('alt', "sa");
              left1div.appendChild(left1img); // en baştaki a

          };
          // Example:
          var link = website + "/wp-json/wp/v2/media/"+element.featured_media;
          data2 = 'Example: appended to the query string..';
          xhrr2.open('GET', link);
          xhrr2.send();
        } catch (e) {
          var left1img = document.createElement("img");
          left1img.setAttribute('src', 'https://i.resimyukle.xyz/4O5VTz.jpg');
          left1img.setAttribute('alt', element.title);
          left1div.appendChild(left1img); // en baştaki a

        }
        // left1 div


        // left2 div
        var left2div = document.createElement("div");
        left2div.setAttribute('class', 'left');
        articleDiv.appendChild(left2div); // en baştaki a
        // left2 div

        // left2 title ml-20 mt-9 div
        var titlediv = document.createElement("div");
        titlediv.setAttribute('class', 'title ml-20 mt-9');
        left2div.appendChild(titlediv); // en baştaki a
        // left2 div

        // left2 title span
        var left2titlespan = document.createElement("span");
        left2titlespan.innerHTML = element.title.rendered;
        titlediv.appendChild(left2titlespan); // en baştaki a
        // left2 div

        // left2 title ml-20 div
        var left2timediv = document.createElement("div");
        left2timediv.setAttribute('class', 'time ml-20');
        left2div.appendChild(left2timediv); // en baştaki a
        // left2 div

        // left2 title span
        var left2timespan = document.createElement("span");
        left2timespan.innerHTML = element.date.substring(0,10);
        left2timediv.appendChild(left2timespan); // en baştaki a
        // left2 div

      });
  };
  // Example:
  var dataUrl = website + '/wp-json/wp/v2/posts?_fields[]=date&_fields[]=title&_fields[]=featured_media&_fields[]=title&_fields[]=lin&&_fields[]=slug&page='+bas
  xhr.open('GET', dataUrl);
  xhr.send();
}

document.getElementById("devamke").addEventListener("click", function() {
  page++;
  icerikGetir(page);
});

icerikGetir(page);
