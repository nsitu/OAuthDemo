# Authenticate with Google: OAuth2 Demo  
This is a [NodeJS](https://nodejs.org/en/) [Express](https://expressjs.com/) app to demonstrate authentication via Google. To simplify integration with Express, we use [Passport](https://www.passportjs.org/) (authentication middleware). Passport supports many identity providers (e.g. Twitter, Github, etc.) via authentication "[strategies](https://www.passportjs.org/packages/)". In this case we are using Passport's [Google OAuth 2.0 Strategy](https://www.passportjs.org/packages/passport-google-oauth20/) to handle everything.

# Setup Google Cloud
To use this code, you will need to [create a project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) on Google Cloud. You will also need to [Setup OAuth 2.0](https://support.google.com/cloud/answer/6158849) in your project. This involves the creation of a Client ID and Secret. It also involves configuring a [consent screen](https://support.google.com/cloud/answer/6158849#userconsent&zippy=%2Cuser-consent) that your users will see when logging in.

# Environment Variables  
The app uses the following environment variables. You should set these in a `.env` file or add them to your deployment environment. (e.g. "Secrets" on Replit, or "Config Vars" on Heroku).  
- **GOOGLE_CLIENT_ID** Find/create this in your [Google Cloud Console](https://console.cloud.google.com/)  
- **GOOGLE_CLIENT_SECRET** Find/create this in your [Google Cloud Console](https://console.cloud.google.com/) 
- **GOOGLE_CALLBACK_URL** This is the URL to which Google will forward your users after a successful login. For example: http://localhost:5000/auth/google/callback or https://ixd-oauth-demo.herokuapp.com/auth/google/callback 
- **MONGODB_URI** Your connection string for MongoDB. If you're using a MongoDB's [free Atlas Cluster](https://www.mongodb.com/cloud/atlas/) it may look something like this: `mongodb+srv://dbuser:password@cluster0.xxxxx.mongodb.net/`


# Resources
Here are some topically adjacent resources that you may find useful:  
**Kris Foster - NodeJS & Express - Google OAuth2 using PassportJS**  
[https://www.youtube.com/watch?v=Q0a0594tOrc](https://www.youtube.com/watch?v=Q0a0594tOrc)  
[https://github.com/kriscfoster/node-google-oauth-2](https://github.com/kriscfoster/node-google-oauth-2)  
**Brad Traversy - Node.js App From Scratch | Express, MongoDB & Google OAuth**  
[https://www.youtube.com/watch?v=SBvmnHTQIPY](https://www.youtube.com/watch?v=SBvmnHTQIPY)  
[https://github.com/bradtraversy/storybooks](https://github.com/bradtraversy/storybooks)  

# Further Context and Notes  
Depending on your needs, [Passport](https://www.passportjs.org/) may be a great fit because it simplifies NodeJS integration. However, Google does offer its own set of tools as well. If you want to explore beyond the limitations of this example, you may enjoy this additional links:
- An in-depth [NodeJS Client Library](https://github.com/googleapis/google-api-nodejs-client) to addresses a wide set of server-side use cases. 
- A general guide to [Using OAuth 2.0 for Web Server Applications](https://developers.google.com/identity/protocols/oauth2/web-server). 
- A Google-centric approach to [Sign In With Google](https://developers.google.com/identity/gsi/web/guides/overview), via [Google Identity](https://developers.google.com/identity)