Webernote
=========

A web version of Evernote's desktop application that I made for an interview I had, which became a pet project that I've built using regular JavaScript, then Backbone.js, and now this version which is built with Angular.js.

This app uses [Firebase](http://firebase.com) for storing data as it provides a RESTful API for communicating with the server in real-time. All changes to data happen instantly.

Firebase also offers an authentication library for simplifying multiple options for authentication through Oauth APIs. The option to use custom authentication is also provided alternatively.


## Getting Setup

This app uses [Yeoman.io](http://yeoman.io), [Grunt.js](http://gruntjs.com) and [Bower](http://bower.com).
Within Yeoman, the [angular-generator](https://github.com/yeoman/generator-angular) is also being used to automate the creation of new modules and the initial scaffolding of the folder structure.

To set up the app for developing, clone the repository angular branch:

`git clone -b angular git@github.com:jaredwilli/webernote.git


Install Yeoman, Grunt and Bower:

`npm install -g yo grunt-cli bower


Install the packages:

`npm install
`bower install


## Running and Testing

Once the packages are installed, and all the dependencies exist, run the server using:

`grunt server


To run the Jasmine test specs use:

`grunt test


Build the app using:

`grunt


## Creating Modules

To create new modules Yeoman simplifies things for you. From the command line you can create modules, which get injected into the footer of the index.html file, and a matching test spec file will also be created, too.


**App with Controller, Directive, Filter, and View Modules**

`yo angular:app <name>

**Controller Module**

`yo angular:controller <name>

**Directive Module**

`yo angular:directive <name>

**Service Module**

`yo angular:service <name>

**View Module**

`yo angular:view <name>

**Filter Module**

`yo angular:filter <name>

**Route Module**

`yo angular:route <name>



----------------------------------------------

![Creative Commons License](http://i.creativecommons.org/l/by/3.0/88x31.png "Creative Commons License")

This work is licensed under a [Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/).

Webernote by [Jared Williams](http://anti-code.com). Inspired by Evernote's desktop application and motivated by a passion and desire to learn and use the best suited JavaScript MVC Framework for this type of app.

[Contribute to Webernote](https://github.com/jaredwilli/webernote/tree/angular)

*Not affiliated with Evernote, simply inspired by it*