# Authenticate with Google: OAuth2 Demo  
This is a [NodeJS](https://nodejs.org/en/) [Express](https://expressjs.com/) app to demonstrate authentication via Google. To simplify integration with Express, we use [Passport](https://www.passportjs.org/) (authentication middleware). Passport supports many identity providers (e.g. Twitter, Github, etc.) via authentication "[strategies](https://www.passportjs.org/packages/)". In this case we are using Passport's [Google OAuth 2.0 Strategy](https://www.passportjs.org/packages/passport-google-oauth20/) to handle everything.

# Context and Notes  
Depending on your needs, [Passport](https://www.passportjs.org/) may be a great fit because it simplifies NodeJS integration. However, Google does offer its own set of tools as well. See also:
- An in-depth [NodeJS Client Library](https://github.com/googleapis/google-api-nodejs-client) to addresses a wide set of server-side use cases. 
- A general guide to [Using OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server). 
- A Google-centric approach to [Sign In With Google](https://developers.google.com/identity/gsi/web/guides/overview), via [Google Identity](https://developers.google.com/identity)

# Setup  
To use this code, you'll first need to [create a project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) on Google Cloud. You will also need to configure a [consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent) that your users will see. Finally you will need to 

# Environment Variables  



# Resources
Here are some topically adjacent resources that you may find useful:  
## Kris Foster - NodeJS & Express - Google OAuth2 using PassportJS  
[https://www.youtube.com/watch?v=Q0a0594tOrc](https://www.youtube.com/watch?v=Q0a0594tOrc)  
[https://github.com/kriscfoster/node-google-oauth-2](https://github.com/kriscfoster/node-google-oauth-2)  
## Brad Traversy - Node.js App From Scratch | Express, MongoDB & Google OAuth  
[https://www.youtube.com/watch?v=SBvmnHTQIPY](https://www.youtube.com/watch?v=SBvmnHTQIPY)  
[https://github.com/bradtraversy/storybooks](https://github.com/bradtraversy/storybooks)  