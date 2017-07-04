document.addEventListener('DOMContentLoaded',function() {

  /*document.getElementById('getQuotes').onclick = quoteDisplay(); */

  window.onload = rotateDisplay();

  function rotateDisplay() {
    quoteDisplay();
    nIntervId1 = window.setInterval(function() {
      newDisplay() // nIntervId1 is global var on purpose
    }, 8000);
  }

  function newDisplay() {
    $( document ).ready(function() {
      $("#quotes").css({'opacity':1}).animate({'opacity':0}, 1200);
    });
    window.setTimeout(function() {
      preQuoteDisplay()
    }, 1200);
  }

  function preQuoteDisplay() {
    $( document ).ready(function() {
      $("#quotes").html("").css({'opacity':0});
    });
    quoteDisplay();
  }

// new quote button (displays a new quote and
// pauses the rotation of random quotes):

  document.getElementById("newQuote").addEventListener("click", function(event) {
    clearInterval(nIntervId1);
    newDisplay();
    });

  document.getElementById("tweetQuote").addEventListener("click", function(event) {
    var sendTweet = '"' + tweetQuote + '"\n - ' +  tweetAuthor;
    if ( sendTweet.length <= 130 ) {  window.open("https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent(sendTweet));
    }
    else alert("This quote is too long to tweet! Tweets must be 140 characters maximum, including hashtags (i.e. #quotes).");
  });


/*
  $( document ).ready(function() {
    $( "#newQuote" ).on( "click", function() {
      $("#quotes").fadeOut(800, function() {    preQuoteDisplay();
      clearInterval(nIntervId1);
      });
    });
  });
*/

// random quotes button
// (resumes the rotation of random quotes):

  $( document ).ready(function() {
    $( "#getQuotes" ).on( "click", function() {  rotateDisplay();
    });
  });

  function quoteDisplay() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open("GET",'https://soupedenuit.github.io/json-quotes/Random-Quotes.json',true);
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
      json = JSON.parse(httpRequest.responseText);
      var htmlQuote = "";
      var htmlAuthor = "";
      var randomizer = Math.random() * 43 + 1;
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

      htmlQuote += '<div class="api_quotes"><em>" </em>';
      var quote = json[0].quote;
      var quoteArr = quote.split(" ");
      var quoteLen = quoteArr.length / 7;
      for ( var k = 0; k < quoteLen - 1; k++ ) {
        htmlQuote += breakUpQuote(quote, 7, k) + "</br>";
      }
      var part2a = quoteArr.length / 7;
      var part2b = Math.ceil(part2a);
      var part2c = part2b - 1;
      htmlQuote += breakUpQuote(quote, 7, part2c);
      htmlQuote += '<em>"</em></br></div>';
      var author = json[0].author;
      htmlQuote += '</br>- ' + author + '</div>'
      tweetQuote = quote;
      tweetAuthor = author;
      /* Modify text size based on length of quote */
      function smallFont() {
        document.getElementById("quotes").style.cssText = "font-size: 2.5vh;";
      }

      function bigFont() {
        document.getElementById("quotes").style.cssText = "font-size: 3vh;";
      }

      /* font conditions with timeouts
      if ( quoteLen > 4) {
        window.setTimeout(function() {smallFont()}, 1600);
      }

      else window.setTimeout(function() {bigFont()}, 1600); */

      /*if ( quoteLen > 5) {
        smallFont();
      }

      else bigFont();
      */
      /* Fade in & fade out quote */

      /*$( document ).ready(function() {     $("#quotes").css({
        opacity: 0
      }, 800, function() {
        $(this).animate({
          opacity: 1
        }, 800);

        });
      }); */

      $( document ).ready(function() {
        $("#quotes").html(htmlQuote).css({'opacity':0}).animate({'opacity':1}, 1200);
      });

      /*document.getElementById('quotes').innerHTML =  htmlQuote;*/

  }; //closes onreadystatechange function
  }; //closes quoteDisplay() function
// }); // closes jQuery effects function
}); //closes addEventListener function
