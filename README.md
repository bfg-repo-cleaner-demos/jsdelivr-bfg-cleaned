[jsDelivr][1] - Open Source CDN
========

[www.jsdelivr.com][1]

Similar to Google Hosted Libraries, jsDelivr is an open source [CDN][6] that allows developers to host their own projects 
and anyone to link to our hosted files in their websites. 

We offer a stable CDN that can be used in production even on popular websites with huge amounts of traffic.
There are no bandwidth limits or premium features and its completely free to use by anybody.

All kinds of files are allowed, including JavaScript libraries, jQuery plugins, CSS frameworks, fonts and more.

You can use this repo to make your own changes and improve the contents of jsDelivr's CDN.
Feel free to open issues and pull requests if you think something should be changed.

All changes made to this repo are synced to the CDN.
It can take a few minutes for the changes to appear on the website.

[How jsDelivr works - What makes it special][4]

[Compare public CDNs][5]


# Why jsDelivr?


Performance and Uptime Oriented
--------------------

Our public CDN is built with performance and reliability in mind. Everything is optimized and being constantly improved to offer all users maximum speed and uptime. Performance is monitored at all times, and we are always looking into new technologies and providers that may further improve our CDN.

Downtime, timeouts or slow responses are simply unacceptable. The idea is not to simply offer a public CDN, but to offer the best possible experience and a rock-solid product.



Multi-CDN
---------

Unlike the competition, jsDelivr uses multiple CDN providers which results in best possible uptime and performance. We currently use [MaxCDN][7] and [CloudFlare][8].

On top of CDN providers, jsDelivr also utilizes custom servers in locations where CDNs don't have points of presence to further optimize the speed of file downloads for users on those locations.

If a CDN or custom server goes down, websites that use jsDelivr won't have any issues, because all traffic will be instantly redirected to remaining operational providers. 


Smart Load Balancing
--------------------

jsDelivr uses [Cedexis][9] with real user performance data (also known as RUM) to make its routing decisions. These metrics are gathered from hundreds of websites and are used in our load balancing algorithm to make accurate decisions for serving content.

All providers (CDNs and custom servers) are tested millions times per day by real users from all over the world. Based on this information, jsDelivr knows what provider is the fastest for each user. Each user gets a unique response based on his or her location, ISP, and the providers' uptime in real time. 

This system also responds immediately to performance degradation and downtime of providers. If a CDN is under a DDoS attack, and their performance drops in some locations, in matter of seconds the algorithm will pick up the change and start serving a different provider to all affected users.



How to submit or update projects:
---------------------------------

 1. [Fork][9] the jsDelivr repository.
 2. Add files that you want to be synced with the CDN
 3. Send a pull request with a description of the changes you made. Please follow the same file structure as other projects in the repo.
 4. Wait for our approval.
 5. That's it!


Auto-Updating
-------------

Coming soon - we are [working on it](https://github.com/jsdelivr/libgrabber)!

    
File Structure
--------------
Under `files/` a directory for each project is created. Please follow the instructions below (exceptions are made on a per-case basis).

1. Names should be lowercase
2. No special characters or spaces, except for `. - _`.
3. Names should only be the name of the project
4. If the project is a plugin of a library, append the name of the library, like `jquery.blurjs` or `bootstrap.select`.


A project's directory should contain the following:

1. An `info.ini` containing all needed information. [Example][2]
2. Directories named after the version of each project. 
3. The version directories can contain in their names numbers, letters and `. - _`.
4. Do not create `latest` directories; they are automatically created on our side.

A version directory should contain the following:

1. Static files needed for the project to work. 
2. If there is no minified version of the main JS/CSS file, please create your own using this ([minification tool][3]).
3. If there are official or expected source maps for the minified js, please include those in the folder.  Currently, the following projects officially support the `.map` files:
  * angularjs
  * jQuery
4. Do not upload useless files like demos, examples, licenses, readmes and any other files not being used in the production.


URL Structure
-------------

`//cdn.jsdelivr.net/{projectName}/{version}/{file}`

`//cdn.jsdelivr.net/{projectName}/{version}/{projectName}.zip`

`//cdn.jsdelivr.net/g/{projectName},{projectName},{projectName}`

`//cdn.jsdelivr.net/g/{projectName}@{version},{projectName}@versionAlias,{projectName}`


Version aliasing
-------------

For latest version use:

`//cdn.jsdelivr.net/{projectName}/latest/{file}`

You can also load latest versions per branch:

`//cdn.jsdelivr.net/{projectName}/3.8/{file}` Latest in 3.8 branch

`//cdn.jsdelivr.net/{projectName}/3/{file}` Latest in 3 branch

To automatically load the main file of a project use:

`//cdn.jsdelivr.net/{projectName}/{version}/mainfile`

Depending on the project, jsDelivr will automatically load the main file as configured in `info.ini` with correct MIME HTTP headers. If no `mainfile` parameter was specified, the request will result in 404 error.


Load multiple files with single HTTP request
--------------------------------------------

Loads the lastest version of the main file. Only for JavaScript!

`//cdn.jsdelivr.net/g/abaaso,ace,alloyui`

Loads version 3.8.15 of the main file for abaaso and the latest version of the main file for the other projects.

`//cdn.jsdelivr.net/g/abaaso@3.8.15,ace,alloyui`

Loads the latest version of the main file for all files and for abaaso loads version branch 3.8 (e.g. version 3.8.16).

`//cdn.jsdelivr.net/g/abaaso@3.8,ace,alloyui`


The first 3-4 requests will be slower, as they are not yet cached. Afterwards, these dynamic files get cached and become static files (same as all others).


API 
---

jsDelivr has [a fully featured API](https://github.com/jsdelivr/api) that also supports Google Hosted Libraries and cdnjs


Plugins
---

### npm jsdelivr

An npm module that can be used in your node.js applications:

* https://github.com/jsdelivr/npm-jsdelivr

More coming soon...


Custom CDN Hosting
---

If your project does not qualify to be hosted in GitHub or for any reasons you need direct access to your files, it's not a problem!
We can offer SFTP origin access restricted to a single directory, managed by the author.
This way, you can have full control over your files without the restrictions of GitHub, but still utilize the full power of jsDelivr.

This kind of custom hosting can be suitable for:

* Binary hosting. Windows executable files and zips.
* Frequently updated files.
* Projects that can't follow jsDelivr file structure.
* Some other use that will blow all of our minds.

Simply send an email to [jimaek](https://github.com/jimaek) with more information.

jsDelivr is here to help and not to limit. Even if what you need is not listed above, feel free to contact us.



Contribute Performance Data
---

**jsDelivr** uses real user performance data (also known as RUM) to make its routing decisions. This data is gathered from hundreds of websites and is used in our load balancing algorithm to make accurate decisions based on real time performance metrics.

This is why we offer the ability to all users to help us out. This data is very important and we encourage all users to participate.

All you have to do is include the following JavaScript code in your website before `</body>`.
This code is then executed each time a user visits your website. It uses their browser to test the latency to our CDN providers and gather performance and availability metrics.

These benchmarks are completely transparent to the user and do not impact on browsing in any way. We store the following information:

* Performance metrics to each of our providers.
* Availability metrics to each of our providers.
* Browser’s User-Agent
* First three octets of the user’s IP address 

Our JS code is executed with a 2 second delay and tests all of our providers unless interrupted. This testing does not impact on your website performance or user browsing experience.

```html
<script type="text/javascript">
(function(w, d) { var a = function() { var a = d.createElement('script'); a.type = 'text/javascript';
a.async = 'async'; a.src = '//' + ((w.location.protocol === 'https:') ? 's3.amazonaws.com/cdx-radar/' :
'radar.cedexis.com/') + '01-11475-radar10.min.js'; d.body.appendChild(a); };
if (w.addEventListener) { w.addEventListener('load', a, false); }
else if (w.attachEvent) { w.attachEvent('onload', a); }
}(window, document));
</script>
```
[Privacy Policy for Data Contribution](http://www.cedexis.com/legal/privacy.html)


  [1]: http://www.jsdelivr.com
  [2]: https://github.com/jimaek/jsdelivr/blob/master/files/abaaso/info.ini
  [3]: http://marijnhaverbeke.nl/uglifyjs
  [4]: http://blog.maxcdn.com/load-balancing-multiple-cdns-jsdelivr-works/
  [5]: http://www.cdnperf.com/
  [6]: http://en.wikipedia.org/wiki/Content_delivery_network
  [7]: http://tracking.maxcdn.com/c/47243/36539/378
  [8]: http://www.cloudflare.com/
  [9]: https://github.com/jsdelivr/jsdelivr/fork


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jsdelivr/jsdelivr/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

