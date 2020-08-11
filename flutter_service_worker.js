'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "33a1173d91d6c51333257ad7ce9b0a70",
"assets/assets/fonts/Poppins-Black.ttf": "42cf9f0820d16f3ac2c26a7710ce70f2",
"assets/assets/fonts/Poppins-Bold.ttf": "c23534acbeddbaadfd0ab2d2bbfdfc84",
"assets/assets/fonts/Poppins-Light.ttf": "2a47a29ceb33c966c8d79f8d5a5ea448",
"assets/assets/fonts/Poppins-Medium.ttf": "ba95810b56f476990ca71d15139d5111",
"assets/assets/fonts/Poppins-Regular.ttf": "41e8dead03fb979ecc23b8dfb0fef627",
"assets/assets/fonts/Poppins-SemiBold.ttf": "342ba3d8ac29ac8c38d7cef8efbf2dc9",
"assets/assets/fonts/Poppins-Thin.ttf": "c0fafa8397437c95848724aed686d63b",
"assets/assets/icons/armchair.png": "eba8c8c292f00b95196bf87de45f8705",
"assets/assets/icons/avatar.png": "7ad03ab4a4656cf99649346f7d874575",
"assets/assets/icons/cart.png": "e7451af5bf2ea243d7108b595652b50a",
"assets/assets/icons/clock.png": "99c0bca870a32ca3f7fcfa9053fd9533",
"assets/assets/icons/color.png": "4b6e81d887d12a3e8fb459b19df47d0d",
"assets/assets/icons/crown.png": "f962c4094251cde10f149708f8cc12f9",
"assets/assets/icons/dialog.png": "165c906288654ddd0b183efd06d84980",
"assets/assets/icons/exit.png": "bf6b2c9aaa86f154f4aa018ae1cd1a6a",
"assets/assets/icons/fabric.png": "35a1e5452a43352db3dcf77cbc7ae1a2",
"assets/assets/icons/face.png": "1f34b555f1935bd61c4b5e346e36bc69",
"assets/assets/icons/favourite.png": "62d491b5ad4ecb50e8f762d80d30c64c",
"assets/assets/icons/favourite_tab.png": "475690db6d558a8be9b1cf5e7a43a493",
"assets/assets/icons/home.png": "8fba370188dd403618de1b2743b8016f",
"assets/assets/icons/insta.png": "dc159dba63523e25bd77999447342ed2",
"assets/assets/icons/last.png": "41c43b8a15eb51fbafb88d41bcb687ba",
"assets/assets/icons/lock.png": "cedae15580ebd4cabb8a247602005749",
"assets/assets/icons/number.png": "e0afe243a394eefa9504d38d2f260736",
"assets/assets/icons/profile.png": "8e376a15727901241ebc1f15e568e85a",
"assets/assets/icons/settings.png": "cc8ceed9fc71dbbea061d40474b92578",
"assets/assets/icons/size.png": "eaf033d135a3f171380a9faa0934b3a2",
"assets/assets/icons/tag.png": "f40bc6e0df3b37148b035c0e1cb33769",
"assets/assets/icons/terms.png": "d40b3402e8a50a30ce7717472c0bd60f",
"assets/assets/icons/tick.png": "a7d34c8a4a0744283c95cd97df87e93e",
"assets/assets/icons/whatsapp.png": "f58808c104d10b0fb29cdf74a2a50694",
"assets/assets/images/product1.png": "2a3d5297502d8764a6eb464195b36b93",
"assets/assets/onboarding/Group%2520132@3x.png": "913d80c880e29ab0c996600aaa765c15",
"assets/assets/onboarding/Group%25201715@3x.png": "18066e27123d448e59f839995dc4ec5f",
"assets/assets/onboarding/Group%25201716@3x.png": "b4cdfc3a67d9a8aa8e15a192867c4f3f",
"assets/assets/onboarding/Group_217@3x.png": "d47961c54b8402bde953a2fcf7105898",
"assets/assets/onboarding/Group_82@3x.png": "b274e266b0dbb5eff4e0e465c473268f",
"assets/FontManifest.json": "4137b0c672c4851d70aee23c8b1a09e3",
"assets/fonts/MaterialIcons-Regular.otf": "a68d2a28c526b3b070aefca4bac93d25",
"assets/NOTICES": "254fffa9b869bff62a9276595eb43092",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "cafa6d4e02875035ff4a43a354ecb594",
"/": "cafa6d4e02875035ff4a43a354ecb594",
"main.dart.js": "8a0b293afd5b5c38d9064fa6edef1b7e",
"manifest.json": "6938631094cb8922eb04906f0b9d4518"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
