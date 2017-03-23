$(function () {
    console.log('DOM działa');



    //Main page
    var $links = $('section.links');
    var $hamburger = $('a.menu-overlay');

    var $topLineHamburger =$('p.menu-overlay-line.one');
    var $middleLineHamburger =$('p.menu-overlay-line.two');
    var $bottomLineHamburger =$('p.menu-overlay-line.three');

    var $nav = $('nav.navigation');
    
    function navigationMenuAnimate() {
        $hamburger.on('click', function () {
            $middleLineHamburger.toggleClass('hidden');
            $topLineHamburger.toggleClass('transform-line1').toggleClass('redCloseButton');
            $bottomLineHamburger.toggleClass('transform-line3').toggleClass('redCloseButton');

            //first if - after loading page
            if ( $nav.hasClass('hidden')) {
                $nav.removeClass('hidden').addClass('navigationOpen');
                // $nav.toggleClass('hidden').removeClass('navigationClose');
            } else if ($nav.hasClass('navigationOpen')){
                $nav.removeClass('navigationOpen');
                $nav.addClass('navigationClose');
            } else {
                $nav.removeClass('navigationClose');
                $nav.addClass('navigationOpen');
            }

            $links.fadeToggle(1000);
        });
    }

    navigationMenuAnimate();

    //flickr-Api

    var div = $('section.photo');
    //the url below was generates by flickr api
    var urlPage1 = "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=f7b675897915d732843be51dc236ab7c&group_id=564487%40N23&page=1&format=json&nojsoncallback=1&auth_token=72157679998988820-d935810cdcdc0511&api_sig=2bb41404b537f6b1735dab88209839f8";

    var form = $('form.search');

    function insertPhotoWithQuote(photos) {

        var columnLeft = $('.left');
        var columnMiddle = $('.middle');
        var columnRight = $('.right');


        $.each(photos, function (index, photo) {
            // console.log(index, photo.tags);
            var url = photo.url_o;
            var tags = photo.tags;
            console.log(tags);
            var $img = $('<img>').attr('src', url).data('tags', tags);
            console.log($img.data('tags')); // prints tags
            var $addPhoto = $('<div>', {'class': 'bottomSpace'}).append($img);

            if (index < 34) {
                // console.log(url);
                columnLeft.append($addPhoto);
            } else if ( index < 68) {
                columnMiddle.append($addPhoto);
            } else {
                columnRight.append($addPhoto);
            }
        });
    }



    $.ajax({
        url: "https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=b86b2855b5e59aeec6f42089adbefef1&group_id=564487%40N23&extras=tags%2C+machine_tags%2Curl_o&page=2&format=json&nojsoncallback=1&auth_token=72157678400961993-eb55fe7233c3c666&api_sig=bccee0b82f0f2db077241c493581d828"
    }).done(function (response) {
        console.log(response);
        // console.log(response.photos.photo);

        insertPhotoWithQuote(response.photos.photo);

    }).fail(function (error) {
        console.log(error);
    });


});