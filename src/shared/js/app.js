/**
 * Created by sebaslewis on 03/07/16.
 */
(function(ch) {
    function qS(selector) { return document.querySelector(selector); };
    var carousel = new ch.Carousel(
        qS('.ch-carousel'),
        {
            'pagination': false,
            'arrows': true,
            'limitPerPage': 3
        }
    );
})(ch);