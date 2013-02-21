
      // Enter a client ID for a web application from the Google Developer Console.
      // The provided clientId will only work if the sample is run directly from
      // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
      // In your Developer Console project, add a JavaScript origin that corresponds to the domain
      // where you will be running the script.
      var clientId = '349052551856-vb3n3i3qo7h5avbftod4fsll8keav4f5.apps.googleusercontent.com';

      // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
      // requests in the code.
      // The provided key works for this sample only when run from
      // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
      // To use in your own application, replace this API key with your own.
      var apiKey = 'AIzaSyBpd0lHCDzTOiR7u5FY6wicLtP8yznWBkk';

      // To enter one or more authentication scopes, refer to the documentation for the API.
      var scopes = 'https://www.googleapis.com/auth/plus.me';

      // Use a button to handle authentication the first time.
      function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,1);
      }

      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }


      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          makeApiCall();
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }

      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }

      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        gapi.client.load('plus', 'v1', function() {

          // First let's get the profile image
          var request = gapi.client.plus.people.get({
            'userId': '+XGames'
          });

          request.execute(function(resp) {
            var heading = document.createElement('h4');
            var image = document.createElement('img');
            image.src = resp.image.url;
            heading.appendChild(image);
            heading.appendChild(document.createTextNode(resp.displayName));

            document.getElementById('content').appendChild(heading);
          });

          // Now, we can search for a topic (e.g. snowboard) and get a list of images/objects around it
          var req2 = gapi.client.plus.people.search({
            'query': 'snowboard'
          });
          req2.execute(function(resp) {
            var ul = document.createElement('ul');
            
            for (var i = 0; i < resp.items.length; i++) {
              var tmpObj = resp.items[i];
              var li = document.createElement('li');
              var tmpImg = document.createElement('img');
              tmpImg.src = tmpObj.image.url;
              li.appendChild(tmpImg);

              var sourceLink = document.createElement('a');
              sourceLink.setAttribute('href', tmpObj.url);
              sourceLink.setAttribute('title', tmpObj.displayName);
              var linkText = document.createTextNode(tmpObj.displayName);
              sourceLink.appendChild(linkText);

              li.appendChild(sourceLink);
              ul.appendChild(li);
            };

            document.getElementById('imagesList').appendChild(ul);
          });

        });
      }