// ┌────────────────────────────────────────────────────────────┐ \\
// │ Brault & Barnes Design, LLC.                               │ \\
// ├────────────────────────────────────────────────────────────┤ \\
// │ Portions are Copyright © 2013                              │ \\
// │ Developed by @jeremybrault                                 │ \\
// ├────────────────────────────────────────────────────────────┤ \\
// │ http://www.braultbarnesdesign.com || @braultbarnes         │ \\
// └────────────────────────────────────────────────────────────┘ \\

bbtweet = {

    // Set twitter username, number of tweets & id/class to append tweets
    user: 'braultbarnes',
    numTweets: 2,
    appendTo: '.sortholder',

    beginLoad: function (caller) {
        
        $.ajax({
            url: 'http://dev.braultbarnesdesign.com/twitter-status/user_timeline.php',
            type: 'GET',
            dataType: 'jsonp',
            timeout: 3000,
            data: {
                screen_name: jqtweet.user,
                include_rts: false,
                count: jqtweet.numTweets,
                include_entities: true,
                
            },
            success: function (data, textStatus, jqXHR) {

                if (data.status == 200){
                    console.log("working");
                }

             data = data.posts;
                for (var i = 0; i < data.length; i++) {

                    var epochDate = data[i].created_at;
                    var readableDate = new Date(epochDate * 1000);
                    var readableDateString = util.monthsOfYear[readableDate.getMonth()] + " " + readableDate.getDate();
                    if (readableDateString === 'undefined NaN'){ readableDateString = "...";}
                    var linkToTweet = "http://www.twitter.com/" + bbtweet.user + "/status/" + data[i].id_str;
                    $(bbtweet.appendTo).append("<div class='tweet sort swipe-element' item_time='" + epochDate + "'><div class='feed_date'><a href='" + linkToTweet + "'><span></span><p class='secondary'>" + readableDateString + "</p></a></div><p class='body'>" + jqtweet.ify.clean(data[i].text) + "</p></div>");
               }


                
              caller.call(true);
            },
            error: function(xhr, ajaxOptions, thrownError) { 

                console.log("failure");
                caller.call(true);
            }
        });

    }
};

jqtweet = {

    // Set twitter username, number of tweets & id/class to append tweets
    user: 'braultbarnes',
    numTweets: 2,
    appendTo: '.sortholder',

    beginLoad: function (caller) {
        
        $.ajax({
            url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
            type: 'GET',
            dataType: 'jsonp',
            timeout: 3000,
            data: {
                screen_name: jqtweet.user,
                include_rts: false,
                count: jqtweet.numTweets,
                include_entities: true,
                
            },
            success: function (data, textStatus, jqXHR) {

                //if (data.status == 200){

                //}
                for (var i = 0; i < data.length; i++) {

                    var epochDate = util.epochConverter(data[i].created_at);
                    var readableDate = new Date(epochDate * 1000);
                    var readableDateString = util.monthsOfYear[readableDate.getMonth()] + " " + readableDate.getDate();
                    if (readableDateString === 'undefined NaN'){ readableDateString = "...";}
                    var linkToTweet = "http://www.twitter.com/" + jqtweet.user + "/status/" + data[i].id_str;
                    $(jqtweet.appendTo).append("<div class='tweet sort swipe-element' item_time='" + epochDate + "'><div class='feed_date'><span></span><p class='secondary'>" + readableDateString + "</p></div><p class='body'>" + jqtweet.ify.clean(data[i].text) + "</p></div>");
                }


                //<div class='link'><a href='" + linkToTweet + "'>view tweet</a>
              caller.call(true);
            },
            error: function(xhr, ajaxOptions, thrownError) { 
                caller.call(true);
            }
        });

    },
    /**
     * The Twitalinkahashifyer!
     * http://www.dustindiaz.com/basement/ify.html
     * Eg:
     * ify.clean('your tweet text');
     */
    ify: {
        link: function (tweet) {
            return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function (link, m1, m2, m3, m4) {
                var http = m2.match(/w/) ? 'http://' : '';
                return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
            });
        },

        at: function (tweet) {
            return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function (m, username) {
                return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
            });
        },

        list: function (tweet) {
            return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function (m, userlist) {
                return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
            });
        },

        hash: function (tweet) {
            return tweet.replace(/(^|\s+)#(\w+)/gi, function (m, before, hash) {
                return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
            });
        },

        clean: function (tweet) {
            return this.hash(this.at(this.list(this.link(tweet))));
        }
    } // ifY
};


// insta
insta = {

    user: "291030298", // //44113372 // old
    numLoad: 2,
    appendTo: '.sortholder',
    accessToken: "291030298.2de385d.c073241388764de8a2d8825475aacfe6", //44113372.a554a3b.362c52dde2c04cf0a4ff830476c470cb // old

    beginLoad: function (caller) {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            timeout: 3000,
            url: "https://api.instagram.com/v1/users/" + insta.user + "/media/recent/?access_token=" + insta.accessToken + "&count=" + insta.numload,
            success: function (data) {

                for (var i = 0; i < insta.numLoad; i++) {

                    var epochDate = data.data[i].created_time;
                    var readableDate = new Date(epochDate * 1000);
                    var readableDateString = util.monthsOfYear[readableDate.getMonth()] + " " + readableDate.getDate();


                    $(insta.appendTo).append("<div class='instagram sort swipe-element' item_time='" + epochDate + "'><div class='feed_date'><span></span><p class='secondary'>" + readableDateString + "</p></div><a target='_blank' href='" + data.data[i].link + "'><img class='instagram-image' src='" + data.data[i].images.low_resolution.url + "' /></a></div>");
                }
                caller.call(true);
            },
            error: function (event, xhr, ajaxOptions, thrownError) {
                caller.call(false, "insta: " + thrownError);
            }
        });
    }
};

//dribbb
dribbb = {

    user: "braultbarnesdesign",
    numLoad: 2,
    appendTo: '.sortholder',

    beginLoad: function (caller) {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            timeout: 3000,
            url: "http://api.dribbble.com/players/" + dribbb.user + "/shots?per_page=" + dribbb.numLoad,
            success: function (data) {
                
                if(data.total > 0) { // checks if there are actually shots
                    for (var i = 0; i < dribbb.numLoad; i++) {

                        
                        var epochDate = util.epochConverter(data.shots[i].created_at);
                        var readableDate = new Date(epochDate * 1000);
                        var readableDateString = util.monthsOfYear[readableDate.getMonth()] + " " + readableDate.getDate();

                        $(dribbb.appendTo).append(
                            "<div class='dribbble sort swipe-element' item_time='" + epochDate + "'><div class='feed_date'><span></span><p class='secondary'>" + readableDateString + "</p></div><a target='_blank' href='" + data.shots[i].url + "'><img class='dribbble-image' src='" + data.shots[i].image_url + "' /></a></div>");
                    }
                }
                caller.call(true);
            },
            error: function (event, xhr, ajaxOptions, thrownError) {
                caller.call(false, "dribbb: " + thrownError);
            }
        });
    }
}; //dribbb


util = {

    monthsOfYear: [
        "Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
    // sort by attributes - usage for our example: sort_div_attribute('sortweight','setofdivstosort','whereweputsorteddivs');
    sort_div_attribute: function (sortByAttr, divsToSort, divHolder, count) {
        if (typeof (count) === 'undefined') count = 0;
        // copy all divs into array and destroy them in the page
        divsbucket = [];
        divslist = $(divsToSort);
        for (a = 0; a < divslist.length; a++) {
            divsbucket[a] = [];
            // we'vev passed in the name of the attribute to sort by
            divsbucket[a][0] = $(divslist[a]).attr(sortByAttr);
            divsbucket[a][1] = $(divslist[a]).remove();

        }

        //sort array by sort attribute content
        //swap a and b to reverse order of array
        divsbucket.sort(function (b, a) {
            if (a[0].toLowerCase() === b[0].toLowerCase()) {
                return 0;
            }
            if (a[0].toLowerCase() > b[0].toLowerCase()) {
                return 1;
            } else {
                return -1;
            }
        });
        //set limit to number of replaced divs
        var numReplace = (count !== 0 && count < divslist.length) ? count : divslist.length;
        // place sorted divs into page
        for (a = 0; a < numReplace; a++) {
            $(divHolder).append(divsbucket[a][1].removeClass("sort"));
        }
    },


    //converts regular dates to epoch date format for sorting
    epochConverter: function (dateToConvert) {
        var createdDateNormal = new Date(dateToConvert);
        if ($.browser.msie) {
            // IE can't parse these crazy Ruby dates
            createdDateNormal = Date.parse(dateToConvert.replace(/( \+)/, ' UTC$1'));
            return createdDateNormal / 1000.0;


        }

        return createdDateNormal.getTime() / 1000.0;
    } // epochConverter()
}; //util


//runs when document is loaded
$(document).ready(function () {

    var ajaxCount = 0;
    var mediaSources = 3;
    var whatsup_feed_count = 3;
    var enableFallbackMode = false;
    var feedLoading = false;
    if (!Modernizr.csstransitions) {
        enableFallbackMode = true;
    }


    function begin_ajax_connections() {
        bbtweet.beginLoad(ajax_completer);
        insta.beginLoad(ajax_completer);
        dribbb.beginLoad(ajax_completer);
    }



    // this will sort a group of divs by a specified attribute and place them into the container provided
    // refactor to abstract and allow for re-use, add divslist and final holder to function parameters, also make ascending or descending for the sort
    function activate_hero_carousel() {

        window.hero_swipe = new Swipe(document.getElementById("hero"), {
                speed: 400,
                callback: function (index, elem) {
                    update_pagination('#hero_pagination', index);
                }
        });

/*
            window.hero_swipe = new Swipe(document.getElementById("hero"), {
                startSlide: 0,
                speed: 400,
                fallbackMode: enableFallbackMode,
                callback: function (event, index, elem) {
                    update_pagination('#hero_pagination', index);

                }
            });
            */
        create_pagination('#hero_pagination', '#hero', 'hero_swipe', 600);
        update_pagination('#hero_pagination', window.hero_swipe.getPos());

        

    }

    function activate_feed_carousel() {
        window.feed_swipe = new Swipe(document.getElementById("feed"), {
            speed: 400,
            callback: function (index, elem) {

                update_pagination('#feed_pagination', index);

            }
        });

        create_pagination('#feed_pagination', '#feed', 'feed_swipe');
        update_pagination('#feed_pagination', window.feed_swipe.getPos());

    }
    //creates pagination for a specified carousel, pass in the element that pagination will be held in, the location of the carousel divs (for counting), and the carousel object for pagination communication
    function create_pagination(pagination_holder_id, carousel_holder_id, carousel, speed) {
        //default values
        if (typeof (speed) === 'undefined') speed = 400;

        for (i = 0; i < $(carousel_holder_id + ' div.swipe-element').length; i++) {

            $(pagination_holder_id).append("<li class='pagination_dot'><a href='#' onclick='" + carousel + ".slide(" + i + "," + speed + "); return false'></a></li>");
        }
    }

    //updates the currently active pagination based on an index
    function update_pagination(pagination_holder_id, index) {
        $(pagination_holder_id + " li a.active").removeClass("active");
        $(pagination_holder_id + " li a").eq(index).addClass("active");

        return $(pagination_holder_id)[index];
    }

    //work around to have sorting and activation of feed carousel happen after ajax completes
    function ajax_completer(data, message) {
        ajaxCount++;
        if (ajaxCount >= mediaSources) {
            util.sort_div_attribute('item_time', '.sortholder .sort', '.sortholder', whatsup_feed_count);
            activate_feed_carousel();
        }
    }
    function test_allow_feed(){
        //cancel the calling listener
        //$(window).unbind('resize',test_allow_feed);

        //check if we've loaded this before

        //if (!feedLoading){
        //    var mq = window.matchMedia( "(min-width: 767px)" );

        //if (mq.matches || $.browser.msie){
           // feedLoading = true;
            begin_ajax_connections();
            return true;

         //} else {
         //   $(window).bind('resize',test_allow_feed);

         //}
        //}
    }




    /// function callers
    activate_hero_carousel();
    test_allow_feed()



    

});