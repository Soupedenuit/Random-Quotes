/* JSON APIs & AJAX */

/* ISOLATE QUOTE VALUE ONLY CODE --------------- */ 
document.addEventListener('DOMContentLoaded',function() {

  /*document.getElementById('getQuotes').onclick = quoteDisplay(); */

  window.onload = quoteDisplay();

  var nIntervId1;
  function delayDisplay() {
    quoteDisplay();
    nIntervId1 = window.setInterval(function() { quoteDisplay()
    }, 12000);
  }

  $( document ).ready(function() {
    $( "#getQuotes" ).on( "click", function() {  delayDisplay();
    });
  });

  $( document ).ready(function() {
    $( "#newQuote" ).on( "click", function() {   clearInterval(nIntervId1);
      quoteDisplay();
    });
  });

  function quoteDisplay() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open("GET",'http://quotes.stormconsultancy.co.uk/popular.json',true);
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
      json = JSON.parse(httpRequest.responseText);
      var html = "";
      var randomizer = Math.random() * 44;
      var randomId = Math.ceil(randomizer);
      json = json.filter(function(val) {
        return (val.id === randomId);
      }); //closes json.filter function

      function breakUpQuote(quote, size, part) {
        var a = quote.split(" ");
        var b = a.length / size;
        var c = Math.ceil(b);
        var d = [];
        for ( var i = 0; i < a.length; i++ ) {
          a[i] += " ";
        }
        for ( var j = 0; j < c; j++ ) {
          var e = a.slice(j * size, size + j * size);
          d.push(e);
        }
          return d[part].join("");
        } //closes breakUpQuote() function

      html += '<div class="api_quotes"><em>" </em>';
      var quote = json[0].quote;
      var quoteArr = quote.split(" ");
      var quoteLen = quoteArr.length / 7;
      for ( var k = 0; k < quoteLen - 1; k++ ) {
        html += breakUpQuote(quote, 7, k) + "</br>";
      }
      var part2a = quoteArr.length / 7;
      var part2b = Math.ceil(part2a);
      var part2c = part2b - 1;
      html += breakUpQuote(quote, 7, part2c);
      html += '<em>"</em></div>';

      $("#quotes").animate({
        opacity: 0
      }, 800, function() {
        $(this).animate({
          opacity: 1
        }, 800);
          $("#quotes").html(html);
        });

      /* Modify text size based on length of quote */
      function smallFont() {
        document.getElementById("quotes").style.cssText = "font-size: 1.7em;";
      }

      function bigFont() {
        document.getElementById("quotes").style.cssText = "font-size: 2.1em;";
      }

      if ( quoteLen > 4) {
        window.setTimeout(function() {smallFont()}, 1600);
      }

      else window.setTimeout(function() {bigFont()}, 1600);


      /*document.getElementById('quotes').innerHTML =  html;*/


    }; //closes onreadystatechange function
  }; //closes quoteDisplay() function
// }); // closes jQuery effects function
}); //closes addEventListener function


/* FULL OBJECT KEY CODE ---------------

document.addEventListener('DOMContentLoaded',function() {
   window.onload = function() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open("GET",'http://quotes.stormconsultancy.co.uk/popular.json',true);
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
      json = JSON.parse(httpRequest.responseText);
      var html = "";
      var randomizer = Math.random() * 43;
      var randomId = Math.ceil(randomizer);
      json = json.filter(function(val) {
        return (val.id === randomId);
      }); //closes json.filter function
      json.forEach(function(val) {
        var keys = Object.keys(val);
        html += "<div class='api_quotes'>";
        keys.forEach(function(key) {
          html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
        }); //closes keys.forEach function
        html += "</div><br>";
      }); //closes json.forEach function

    document.getElementById('quotes').innerHTML =  html;
  }; //closes onreadystatechange function
}; //closes window.onload function
}); //closes addEventListener function

*/

/* sites:
https://talaikis.com/api/quotes/
http://quotes.stormconsultancy.co.uk/popular.json

*/
