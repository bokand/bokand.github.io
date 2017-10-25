# Web Viewports Explainer
This document attempts to summarize and explain viewport concepts on the web
and provide common definitions we can use to communicate about them. I've
attempted to keep this browser agnostic, making definitions applicable
across browsers and then documenting and explaining the differences between
how browsers implement these definitions. My intent is to make this a live
document, constantly refreshed to reflect the current state of the world.

All sizes in this document are, unless otherwise noted, in CSS pixels.
(i.e. when you zoom in, the size of a CSS pixel increases)

If it's not already clear, this document is _non-normative_. Grain of salt and all that...

## Definitions

Lets begin by defining some terms. All these definitions are narrow enough that they
apply equally to all browsers.

###### Visual Viewport
This is the region of the web page currently _visible_ in the application window.
When the user pinch-zooms in, the visual viewport size shrinks. When the
on-screen keyboard appears, its height is reduced. When the mobile URL bar hides,
the visual viewport's height is increased.

###### Fixed Viewport (aka Layout Viewport)
This is the rect to which position: fixed elements attach to and get their
size from. i.e. if you give an element this style:

```
#elem {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
```

its bounds will exactly match the fixed viewport.

This has been commonly referred to as the _layout viewport_ but that implies some
things about it which aren't true and hinder understanding. I'm going to call
it the _fixed viewport_ here.

###### Initial Containing Block (ICB)
Elements get their (relative) sizes and positions from their _containing block_.
e.g. if you specify:

```
#elem {
  position: relative;
  left: 10%;
  height: 50%;
}
```
the browser will find the first ancestor element of `#elem` that is a
containing block and use its size to compute the percentages in `#elem`. The
_initial containing block_ is the root containing block. If you give the `<html>`
element relative size and position, it'll be calculated relative to the ICB. We
could equivalently call this the "layout size".  Unlike the viewports above, the
ICB doesn't ever change position, it's always located at the document origin.

So where does the ICB's size come from? This depends whether we're on a desktop
or mobile browser. On desktop, the ICB matches the browser's window size;
minus any browser chrome ("chrome" in the [UI sense](https://www.nngroup.com/articles/browser-and-gui-chrome/)).

On mobile, the ICB's size can vary inependently of the window/screen size.  If
the page specifies an explicit size in the `width` attribute of a viewport meta
tag, then we'll use that for the width and combine it with the application
window's aspect ratio to set height. Most browsers will use a default (e.g.
980px) value if there is no meta tag or `width` is unspecified. The page can
also specify `width=device-width` which uses the window's width, much like on
desktop. This is most common for "mobile-friendly" pages.

Fun-fact: a page can specify the height in a `height` attribute as well, but
it's quirky, rarely used, and not worth talking about here.

###### Content Size
This is the total size of all the content on the page. In other words, it's the
`documentElement.scrollWidth` and `documentElement.scrollHeight`, or how much
scrollable "stuff" there is on the page.

It's obvious that the content height can be (and often is) greater than the
ICB height. Sometimes, maybe surprisingly, it can also be wider than the ICB.
For example, this page loaded on a mobile browser:

```
<!DOCTYPE html>
<meta name="viewport" content="width=980px">
<div style="width:2000px; height: 100px"></div>
```

will have an ICB that's 980px wide but a content width of 2000px. This can
sometimes lead to surprising behavior as we'll see later.

###### Ideal Viewport
This is the size of the visual viewport when the scale is 1. i.e. When 1 CSS
pixel is the same size as 1 density independent pixel (DIP).

###### Minimum Scale Size
This is the size of the visual viewport when zoomed out to the minimum scale
allowed on a page. The minimum zoom can be set in the viewport meta tag but
if it isn't, the browser will pick a minimum zoom. Unfortunately, browsers
vary in how this is calculated. More on this below.

TODO: PICTURE

## History and Current Status

Before mobile browsers, there was no pinch-zoom or browser chrome that obscured
content. Thus, the visual and fixed viewports were always equivalent and a
distinction was never made. We simply had _a viewport_. Also, the ICB
was always the same size as the viewport. Life was simple then.

_Aside: There was and is "browser zoom" (i.e. ctrl+/- zooming) but this reflows
content with a larger CSS pixel size and affects both the fixed viewport and
visual viewport so they remain the same. We won't concern ourselves with this
type of zoom here._

With the introduction of modern mobile phones, screen real-estate was
especially limited. In order to display pages meant for large screens, they
introduced two major changes. One was the ability to pinch-zoom a page without
reflowing it. The other was the ability to layout into an ICB larger than the
window size so the page would layout correctly. Combined, this allowes a mobile
browser to load a page as if it were rendered on a larger screen, but then
shrink it to fit on the small mobile screen.

Unfortunately, how pinch-zoom is implemented was never specified or
interoperable and each browser did their own thing.

These models are easier to show than to explain so see my [simulator](http://bokand.github.io/viewport/index.html)
to compare visually. Here's the explanations:

###### Firefox
Firefox never adopted the visual/fixed viewport split so there's only a single
viewport. However, we can think of it in terms of the visual/fixed framework by
realizing that pinch-zoom shrinks/grows both the visual and fixed viewports
equally.  That is, as you zoom in, position: fixed elements remain stuck to the
visible screen edges. This has a major disadvantage in that position: fixed
elements will obscure most of the viewport as you zoom in and can also appear
detached from other content it was designed to align with.

###### Edge
Pinch-zoom doesn't affect the fixed viewport, only the visual. So when
you zoom in, position: fixed elements "detach" from the screen. It's as if the
user took a magnifying glass to the screen. This solves the disadvantage in the
Firefox model and is more compatible with pages designed for desktops.

###### Safari
Initially, (AFAICT - based on my own observations only) Safari had a "hybrid"
model of the Edge/Firefox models. As you zoomed in, it would affect both
viewports like Firefox. But once you zoomed in far enough and reached a
threshold, it would stop zooming in the fixed viewport and zoom only the
visual, like Edge. While a nice idea, it was hard to reason about and broke
down in many cases.

More recently, Safari has moved to the Edge model.

###### Chrome
Initially used the Firefox model but later switched to the Edge model.

So it looks like the major browsers are converging on a common model (Firefox
intends to move to this model too: [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1123938)). Huzzah!

## Coordinate Spaces

With multiple viewports we have to choose which viewport each location-based
API refers to.  For example:

```
Element.getBoundingClientRect
MouseEvent.clientX and MouseEvent.clientY
window.innerWidth and window.innerHeight
window.scrollX and window.scrollY
```

See the full list of web APIs in [this sheet](https://docs.google.com/spreadsheets/d/11DfDDa-s1hePVwBn3PZidlPJZ9ahhkJ44dyuMiOQtrc/edit#gid=0).

So again we have a choice of model. Here's what each browser does today
(spoiler alert: they all work differently):

###### Firefox
Not relevant in this section since it uses a single viewport.

###### Safari
"All Visual". All APIs refer to the visual viewport. This is consistent
but it means pages will react to pinch-zoom, most often in ways they weren't
designed to. This is especially problematic on desktop pages as most desktops
don't support pinch-zoom (though some do, e.g. MacBooks) so their designers never
predicted for or tested with pinch-zoom. To see how bad it is, I spent about an hour
surfing major web pages on a Mac and zooming in and out. Here's [the
results](https://docs.google.com/document/d/1t8VLcYL9Gb6BwxseBe6bgvjy5l8vqWc0LIfKAuU9v2Y/edit).

###### Edge
"Hybrid". All "client", and indeed most APIs, refer to the fixed
viewport.  However, the `window` APIs refer to the visual viewport:
`innerWidth`, `innerHeight`, `scrollX`, `scrollY`. This is obviously not ideal
in an esthetic and rational sense but it is more compatible with the desktop
web than the "all visual" model. However, it still has shortcomings. Chrome
initially used this model and has had a long tail of [reported
bugs](crbug.com/489206). A common pattern on the web to display one Element
relative to another is to take `getBoundingClientRect` of the first element,
add `(window.scrollX, window.scrollY)` to it and set that as the absolute
position of the second element. e.g. this is how many popup menus are
implemented. But notice that the scroll properties and `getBoundingClientRect`
are relative to different viewports. When the two differ (i.e. when you're
pinch-zoomed in), the alignment breaks.

###### Chrome
Initially used Edge's "Hybrid" model but has since converted to an "all
fixed" model. This locks existing pages into a "fully zoomed-out" state as far
as the page can tell. In other words, the page doesn't react at all to
pinch-zoom. However, some pages do have niche use cases for querying the visual
viewport. For those use cases, Chrome [introduced](https://github.com/WICG/ViewportAPI) `window.visualViewport`.

## Minimum Scale

Minimum scale is important enough to call out since it has surprising
implications, particularily in Chrome.

This section will deal only with mobile browsers. On desktop the situation is
simple: the minimum scale is always 1, on every browser I know of.

On mobile, the way the the minimum scale is determined varies between browsers.
In all cases, the browser will not let you zoom out so far that the visual
viewport is wider than the content width. Lets call this the _intrinsic
minimum_. Simply, the scale at which the visual viewport would contain the entire
content width.

If the `minimum-scale` attribute of the viewport meta tag is explicitly set, the
actually used minimum scale will be `max(minimum-scale, intrinsic minimum)`. Some (all?)
browsers also have a built in hard minimum (and maximum) that they will further clamp
this expression within. These built-in limits vary by browser.

## Fixed Viewport Size

We've talked about how the visual viewport and the ICB get their size, but the
fixed viewport is less intuitive and varies between browsers.

###### Safari:
TODO

###### Edge (Windows Phone)
The fixed viewport is sized to be equal to the ICB size. A consequence of
this is that if the user can zoom out to see more than the ICB, the fixed
viewport is smaller than the visual viewport:

![Edge Viewport position: fixed Elements](https://bokand.github.io/viewport/EdgeFixedViewport-1.png "A page loaded in Edge with position: fixed Elements before zooming out.")

The image above shows a page with (fictional) position: fixed elements attached to the top, bottom, and left edges.
The page is at scale: 1.0 but has an extra wide Element so it can be zoomed out.

![Edge Viewport position: fixed Elements zoomed out](https://bokand.github.io/viewport/EdgeFixedViewport-2.png "The same page after zooming out")

The same page when zoomed out to minimum. The fixed viewport has been shaded in green.

###### Chrome
The fixed viewport is sized to the minimum scale size. This means that
a position: fixed Element that has `width: 100%; height: 100%` will exactly
fill the viewport when the page is fully zoomed out. One consequence of this is
that the visual viewport is always fully contained by the fixed viewport.

Because of how the minimum scale size is computed, a wide Element elsewhere on
a page can change how fixed Elements are sized and positioned. This can be
especially surprising when the page has a specific `initial-scale` in its
viewport meta tag. Consider the following page:

```
<!DOCTYPE html>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  html,body {
    margin: 0;
    width: 100%;
    height: 100%;
  }

  #fixed {
    position: fixed;
    top: 0;
    right: 0;
    width: 10%;
    height: 100%;
    background-color: red
  }

  #wide {
    width: 200%;
    height: 100%;
  }

</style>
<div id="fixed"></div>
<div id="wide"></div>

```
Suppose it's loaded on a device with a 600px wide screen. Because the #wide
element is twice as wide as the ICB, the minimum-scale will be 0.5. That is, we
can zoom out to half the size. Since Chrome sizes the fixed viewport based on the
minimum scale, it will also be twice as large as the ICB: 1200px wide. The right
edge of the #fixed element will thus be positioned 1200px from the left edge of
the document and it will be 120px wide. This is intuitive if the page loads at
minimum-scale, as it does when the initial-scale is unspecified. However, in this
case, because we've specified the `initial-scale=1` only the leftmost 600px of
the document will be visible. The #fixed element will not be visible when the
page loads! Here's a picture of the page at load with the visual viewport shaded in
green:

![Chrome Viewport position: fixed Elements zoomed out](https://bokand.github.io/viewport/ChromeFixedViewport.png "position: fixed elements with initial-scale, in Chrome")


If we add `minimum-scale=1` to the meta tag, #fixed will be
positioned 600px from the document origin and will be visible when the page
loads (but we won't be able to zoom out) and it will be 60px wide. Quite surprising
indeed.

###### Edge (Android)
Works like Chrome.

## Browser UI Interactions

#### Hiding URL Bar

Some mobile browsers have a hideable URL bar. Typically the browser "scrolls"
the URL bar in and out of view as the page is scrolled.

###### Safari
Showing and hiding the URL bar resizes both the fixed and visual
viewports but not the ICB.

###### Chrome
Works the same as Safari.

###### Firefox
Resizes both fixed and visual but also the ICB.

###### Edge
Edge on Windows Phone had a fixed URL bar. With the introduction of Edge
on Android and iOS though, it has a movable bar! On first glance looks to work
in a similar manner to Chrome and Safari, however, there's a bottom bar as
well! Further investigation is warranted...

#### On Screen Keyboard (OSK)

###### Safari
The OSK resizes just the visual viewport. (TODO: confirm)

###### Edge
TODO

###### Chrome
The OSK resizes the entire window. This means both the visual and fixed
viewports are resized as well as the ICB. This has performance and usability
issues so Chrome would like to make the OSK resize only the visual viewport.

###### Firefox
TODO

_Idea: What if instead of resizing just visual, the OSK resizes visual and fixed - but
not ICB. This would fix Chrome's performance issues and allow Safari to use Chrome's
coordinate space model without the interop issues. Nice analog to how URL bar works._

