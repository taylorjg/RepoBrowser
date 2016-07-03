## Description

This repo is a little application to browse GitHub repos.

## TODO

* ~~Implement authentication HTTP interceptor~~
* Implement spinner HTTP interceptor
* Implement error handling HTTP interceptor
* ~~Display rate limit/remaining values~~
* ~~Add ability to page through the repos~~
    * Select page size ?
* Add ability to sort repos
    * e.g. by created_at/updated_at ascending/descending
* Implement filtering (using a filter ?)
* Show some user details too ? (e.g. fullname, avatar, etc.)
* Show more repo details
    * ~~url~~
        * => new tab/window ?
    * ~~language~~
    * ~~created_at~~
    * ~~updated_at~~
* Add a link for each repo to show even more detailed information in a modal/card
    * issues
    * branches
    * languages
    * releases
    * list of files
* Switch to a cards-based UI ?
    * See [BootCard](http://bootcards.org/)
* Add unit tests (Karma/Jasmine)
* Add end-to-end tests (Protractor)
* Support deep linking
* Convert JavaScript code to ES2015
    * Add gulpfile etc.

## Screenshots

### Without an OAuth Token

![WithoutTokenScreenshot](screenshots/WithoutTokenScreenshot.png)

### With an OAuth Token

![WithTokenScreenshot](screenshots/WithTokenScreenshot.png)

## Links

* https://angularjs.org/
* http://getbootstrap.com/
* https://angular-ui.github.io/bootstrap/
* http://bootcards.org/
* https://developer.github.com/guides/
* https://developer.github.com/guides/discovering-resources-for-a-user/
* https://developer.github.com/guides/traversing-with-pagination/
* https://github.com/settings/tokens
* https://www.npmjs.com/package/http-server
* https://github.com/johnpapa/angular-styleguide
