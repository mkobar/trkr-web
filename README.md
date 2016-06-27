# trkr-web
for Bluemixathon: Operation Rescue &amp; Recovery 2015

## TRKR  - Track your team in the field at a disaster site with only smartphones
===
This is the Web-app portion of the TRKR system.

![Platform](https://img.shields.io/badge/platform-Web-orange.svg)

Entry for Bluemixathon: Operation Rescue &amp; Recovery 2015

<img align="right" height="200" src="https://raw.githubusercontent.com/mkobar/trkr-web/master/maps/images/gallery.jpg">

### The Idea
The idea is to allow orginizations to monitor people in the field at a disaster site with only smartphones.

Yes, you could stay on the line/phone the entire time, but that is inconvenient and may pose more hazard to the team in the field. And there may not be reliable G3 or Internet available. There are personal GPS devices that can do a subset of our management, but they cost a lot and may not be available on site. And they do not let a team leader manage an entire distributed team.

### How It Works
Our idea is a team tracking app (TRKR) that would allow team members to load a small app on their smartphones and then be tracked by their team leader via a web app (on a map). The smartphone app would be native, run in the background and ping the server every N minutes with location data (very low network bandwidth needed). The smartphone app could also detect movement (with the accelerometer) and ping new location data while on the move. this should allow for very low battery usage and minimal usage of GPS calls. TRKR can support delay-tolerant networks, including temporary long-distance WiFi networks and intermittent and low bandwidth G2 service.

On the web app side, the team leader could track all of their human assets, as a group or individually, and see their tracks over time. It would allow them to monitor team location in the field for security or medical reasons, signal to them (using a store and forward approach), and receive status updates from the field.

### How It Was Built
TRKR consists of a few distributed elements:

+ A centralized API Service, written in Java and using MongDB for data storage.
+ A Web Application, for account management, monitoring and endpoint updates.
+ And multiple mobile "pingers", that send heartbeats with location and status from each team member's smartphone.

### Live Demos

Live web app version of the static TRKR web app can be found here:  http://findtrkr.com/

Please contact me directly if you wish to use this application.

##Resources

See [this](http://devpost.com/software/trkr) DevPost entry for more information on TRKR.


---
Copyright @ 2015 [RKOSecurity] (http://www.rkosecurity.com)

Released under the Apache license.
