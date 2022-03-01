var topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    }); 

$(document).ready(function() {

    $(".nav-collapse ul.nav a").click(function(){
        //$('div.nav-collapse').removeAttr('style');
        $('a.btn-navbar').click ();
        $('div.nav-collapse ul.nav').removeAttr('style');
        $('div.nav-collapse ul.nav').attr('style', 'height: auto;');
        
    });

    function filterPath(string) {
    return string
        .replace(/^\//,'')
        .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
        .replace(/\/$/,'');
    }
    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');
    
    $('a[href*=#]').each(function() {
        var thisPath = filterPath(this.pathname) || locationPath;
        if (  locationPath == thisPath
        && (location.hostname == this.hostname || !this.hostname)
        && this.hash.replace(/#/,'') ) {		
            
        var $target = $(this.hash), target = this.hash;
        
        if (target) {
        
            var targetOffset = $target.offset().top;
            $(this).click(function(event) {
                $('.active').removeClass('active');
                $(this).parent().addClass('active');
            
            event.preventDefault();
            $(scrollElem).animate({scrollTop: targetOffset}, 800, function() {
                location.hash = target;			
            });
            });
        }
        
        
        }
        
    });
    
    // use the first element that is "scrollable"
    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i <argLength; i++) {
        var el = arguments[i],
            $scrollElement = $(el);
        if ($scrollElement.scrollTop()> 0) {
            return el;
        } else {
            $scrollElement.scrollTop(1);
            var isScrollable = $scrollElement.scrollTop()> 0;
            $scrollElement.scrollTop(0);
            if (isScrollable) {
            return el;
            }
        }
        }
        return [];
    }
        
    // Bind to scroll
    $(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
    // Set/remove active class
    menuItems
        .parent().removeClass("active")
        .end().filter("[href=#"+id+"]").parent().addClass("active");
        $(this).parent().addClass('active');
    })
    
    
});