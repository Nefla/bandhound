# bandhound

bandhound is a music discovery webapp that aims to help people discover  artists similar to the ones they already love.

## credentials

Before anything you will need to request two API keys, one from Youtube and another from Last.fm. The Last.fm key should be pretty straightforward, however, for the Youtube api key key will you also need to register your application. You can follow [these instructions](https://developers.google.com/youtube/registering_an_application) in case you have problems setting up your application. 

Next, open the `credentials.json` and add the api keys.

## install

Assuming that Node.js is already installed, do the following to download the project:

```
git clone git://github.com/Nafta7/bandhound.git
cd bandhound
```
Install the dependencies:
```
npm install
```
Build with gulp:
```
gulp build
```