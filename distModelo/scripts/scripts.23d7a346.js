"use strict";function DatePickerController(a,b){function c(b){var c,e=new Date(a.dt).toLocaleDateString("pt-BR"),f=e.getDate(),g=e.getMonth(),h=e.getFullYear();switch(d.MinMode){case"day":f+=b,c=new Date(h,g,f);break;case"month":g+=b,c=new Date(h,g,"01");break;case"year":h+=b,c=new Date(h,0,1)}c>=d.MinDate&&c<=d.MaxDate&&(a.dt=c)}var d=this;a.datepickermode?d.DatepickerMode=a.datepickermode:d.DatepickerMode="day",a.minmode?d.MinMode=a.minmode:d.MinMode="day",a.mindate?d.MinDate=new Date(a.mindate).toLocaleDateString("pt-BR"):d.MinDate=new Date("1000/01/01").toLocaleDateString("pt-BR"),a.maxdate?d.MaxDate=new Date(a.maxdate).toLocaleDateString("pt-BR"):d.MaxDate=new Date("9999/12/31").toLocaleDateString("pt-BR"),d.dateOptions={datepickerMode:d.DatepickerMode,minMode:d.MinMode,minDate:d.MinDate,maxDate:d.MaxDate},d.openCalendar=function(){a.dt||(a.dt=new Date(Date.now()).toLocaleDateString("pt-BR")),d.dateOptions={datepickerMode:d.DatepickerMode,minMode:d.MinMode,minDate:d.MinDate,maxDate:d.MaxDate,language:"pt-BR"},d.popupCalendar.opened=!0},d.popupCalendar={opened:!1},d.changeValue=function(){d.popupCalendar.opened=!0},d.prev=function(){c(-1)},d.next=function(){c(1)}}var whatsYourPic=angular.module("whatsYourPic",["ngAnimate","ngRoute","ngSanitize","ngTouch","LocalStorageModule","smoothScroll","google.places","ui.bootstrap","jtt_instagram","firebase","angular-momentjs","ngToast","ngProgress","oitozero.ngSweetAlert"]);whatsYourPic.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),whatsYourPic.run(["$rootScope","$window",function(a,b){b.fbAsyncInit=function(){FB.init({appId:facebookId,cookie:!0,xfbml:!0,version:"v2.4"}),$(document).trigger("fbload")},function(a){var b,c="facebook-jssdk",d=a.getElementsByTagName("script")[0];a.getElementById(c)||(b=a.createElement("script"),b.id=c,b.async=!0,b.src="https://connect.facebook.net/en_US/sdk.js",d.parentNode.insertBefore(b,d))}(document)}]);var facebookId=0x67cec46ec7a28;!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=+new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-XXXXX-X"),ga("send","pageview");var config={apiKey:"AIzaSyDJtjA5g3eSAfT5SQZohAmTvhFnXGqRswg",authDomain:"whats-your-pic.firebaseapp.com",databaseURL:"https://whats-your-pic.firebaseio.com",storageBucket:"whats-your-pic.appspot.com",messagingSenderId:"314726769944"};firebase.initializeApp(config);const app=new Clarifai.App("6jBodrbX31P4ThhCEOZOUg40KqXW0ueyB4BalZDa","6-xPPuG9ELE-k0a1z35pZnEGU1igO53Oh_w4M3wz");whatsYourPic.controller("MainCtrl",["$rootScope","$scope","$window","smoothScroll","localStorageService","$firebaseObject","$firebaseAuth","$moment","$firebaseArray","ngToast","ngProgressFactory","SweetAlert","$q","$http",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){b.progressbar=k.createInstance();var o=firebase.database().ref(),p=firebase.storage().ref(),q=g(),r=(o.child("crowdSourcing"),function(a,b){var c=m.defer();return o.child("crowdSourcing").child(a).on("value",function(d){var e=d.val();e.sentToModel=!0,e.clarifaiId=b,o.child("crowdSourcing").child(a).update(e),c.resolve()},function(a){c.reject(a)}),c.promise});b.form={},a.selectedImage="empty",a.selectedImageCheck=!1,a.navigationHelper=!1,b.canShowFooter=!1,b.showAbout=!1,b.canClick=!0,a.facebookUserId=e.get("fbUserId"),a.facebookToken=e.get("fbToken"),a.facebookUserId&&a.facebookToken&&(a.selectedButtonFacebook=!0),$(document).on("fbload",function(){a.getFacebookPhotosIds()}),a.getFacebookPhotosIds=function(){FB.api("/"+a.facebookUserId+"/photos?type=uploaded&limit=400&access_token="+a.facebookToken,function(b){!b||b.error?(a.progressbar.complete(),190===b.error.code&&(a.selectedButtonFacebook=!1,a.facebookUserId="",a.facebookToken="",e.set("fbToken",a.facebookToken),e.set("fbUserId",a.facebookUserId),a.facebookLogin())):(a.selectedButtonFacebook=!0,a.progressbar.set(40),y(b))})},a.checkIfHasImages=function(){return a.urlArray?a.urlArray.length>0:!1},a.checkIfHasImages=function(){return a.photoArray?a.photoArray.length>0:!1},b.scrollToForm=function(){var a=document.getElementById("form");d(a),b.canShowFooter=!1},b.selectImage=function(c){angular.forEach(a.photoArray,function(a,b){a.selected=!1,a.onHover=!1}),a.selectedImage=a.photoArray[c].url,a.photoArray[c].selected=!0,a.navigationHelper=!0,b.canShowFooter=!0},b.$watch("form.date",function(){s()}),b.$watch("form.location",function(){s()}),a.$watch("selectedImage",function(){s()});var s=function(){b.form.date&&b.form.location&&"empty"!==a.selectedImage?a.validateSubmit=!0:a.validateSubmit=!1};b.sendForm=function(){if(b.canClick!==!1){if("empty"===a.selectedImage)return void x("Selecione uma das fotos");if(!b.form.location||void 0===b.form.location)return x("Entre com a localização onde a foto foi tirada"),void document.getElementById("location").focus();if(!b.form.date||void 0===b.form.date||"Invalid date"===h(b.form.date).format("MMMM"))return void x("Preencha com a data aproximada");b.canClick=!1;var c=i(o.child("crowdSourcing"));b.location=z(),c.$add({location:z(),month:h(b.form.date).format("MMMM"),year:h(b.form.date).format("YYYY"),imageUrl:a.selectedImage,createdAt:1e3*h().unix()}).then(function(c){return b.id=c.path.o[1],console.log("added record with id "+b.id),t(a.selectedImage)}).then(function(a){return w(a,b.id)}).then(function(){return u(b.id,b.location,h(b.form.date).format("MMMM"),h(b.form.date).format("YYYY"))}).then(function(a){return v(a.url,b.id,b.location,h(b.form.date).format("MMMM"),h(b.form.date).format("YYYY"))}).then(function(a){return console.log(a.clarifaiId),r(b.id,a.clarifaiId)}).then(function(a){l.swal("Obrigado por participar!","Informações enviadas com sucesso! Fique a vontade para enviar quantas desejar ;)","success")})["catch"](function(a){console.log(a),l.swal("Tivemos um problema :(","Houve um erro ao enviar sua foto, por favor, tente novamente","error")})["finally"](function(){b.canClick=!0,b.location={},a.selectedImage="empty",a.selectedImageCheck=!1,angular.forEach(a.photoArray,function(a,b){a.selected=!1,a.onHover=!1}),b.form={}})}};var t=function(a){var b=m.defer();return n({method:"GET",url:a,responseType:"arraybuffer"}).then(function(a){var c=new Blob([a.data],{type:"image/png"});b.resolve(c)},function(a){b.reject(a)}),b.promise},u=function(a,b,c,d){console.log(a);var e=m.defer();return q.$signInAnonymously().then(function(f){console.log(a),p.child("images").child(a+".png").getDownloadURL().then(function(f){console.log(a),e.resolve({url:f,uid:a,location:b,month:c,year:d})})["catch"](function(a){e.reject(a)})})["catch"](function(a){e.reject(a)}),e.promise},v=function(a,b,c,d,e){var f=m.defer();return console.log("CLaRIFAI"),app.inputs.create([{url:a,id:b,metadata:{firebaseId:b,location:c,date:{month:d,year:e}}}]).then(function(a){console.log("CLaRIFAI 2"),f.resolve({clarifaiId:a[0].id,uid:b})},function(a){console.log("CLaRIFAI 3"),f.reject(a)}),f.promise},w=function(b,c){var d=m.defer(),e=p.child("images").child(c+".png"),f=e.put(b);return f.on("state_changed",function(b){var c=b.bytesTransferred/b.totalBytes*100;a.progressbar.set(c)},function(a){d.reject(a.code)},function(){d.resolve()}),d.promise},x=function(a){j.create({className:"info",content:'<span class="">'+a+"</span>"})},y=function(b){a.photoArray=[];var c=b.data.length,d=0;angular.forEach(b.data,function(b,e){FB.api("/"+b.id+"/picture?access_token="+a.facebookToken,function(b){if(b){d++,a.progressbar.set(40+60*d/c),d===c&&a.progressbar.complete();var e={};e.url=b.data.url,e.selected=!1,e.onHover=!1,a.$apply(function(){a.photoArray.push(e)})}})})},z=function(){var a;return b.form.location.formatted_address&&(a.name=b.form.location.formatted_address,a.url=b.form.location.url,b.form.location.geometry&&(a.latitude=b.form.location.geometry.location.lat(),a.longitude=b.form.location.geometry.location.lng())),void 0===a&&(a.name=b.form.location),a}}]),whatsYourPic.controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),whatsYourPic.controller("AuthCtrl",["$window","$rootScope","$scope","localStorageService","ngProgressFactory",function(a,b,c,d,e){console.log("auth"),b.progressbar=e.createInstance(),b.progressbar.setColor("#000"),c.storageType="Local storage",d.getStorageType().indexOf("session")>=0&&(c.storageType="Session storage"),d.isSupported||(c.storageType="Cookie"),b.facebookLogin=function(){b.facebookToken&&b.facebookUserId||a.FB&&(b.progressbar.start(),b.progressbar.setColor("#000"),FB.login(function(a){a.authResponse?(b.progressbar.set(10),b.facebookToken=a.authResponse.accessToken,b.facebookUserId=a.authResponse.userID,d.set("fbToken",b.facebookToken),d.set("fbUserId",b.facebookUserId),b.getFacebookPhotosIds()):(b.progressbar.complete(),a.customMsg="Não foi possível logar com o Facebook.")},{scope:"user_photos"}))}}]),whatsYourPic.directive("myDatepicker",function(){return{restrict:"E",replace:!0,controller:DatePickerController,controllerAs:"vm",scope:{dt:"=",datestyle:"@",datepickermode:"@",minmode:"@",mindate:"=",maxdate:"="},link:function(a,b,c){},templateUrl:"views/datepicker.html"}}).controller("DatePickerController",DatePickerController),DatePickerController.$inject=["$scope"],angular.module("whatsYourPic").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/datepicker.html",'<div> <input type="text" uib-datepicker-popup="{{datestyle}}" ng-model="dt" placeholder="Data Aproximada" is-open="vm.popupCalendar.opened" ng-required="true" ng-click="vm.openCalendar()" datepicker-options="vm.dateOptions" show-button-bar="false" show-weeks="false" id="date" close-on-date-selection="true" readonly> </div>'),a.put("views/main.html",'<div class="ci-box"> <!-- Navigation Helper --> <a ng-if="navigationHelper" ng-click="scrollToForm()" ng-show="selectedImage!=\'empty\' && canShowFooter"> <div class="ci-navigation-helper col-xs-12 col-sm-12 hidden-md hidden-lg"> <span class="glyphicon glyphicon-triangle-bottom"></span> <h1 class="pull-right"> Rolar para formulário </h1> </div> </a> <!-- Header --> <div class="ci-titlebox col-xs-12 col-sm-12" id="top"> <h1> Das fotos já publicadas por você,<br> escolha uma que te traga boas lembranças. </h1> </div> <!-- Left-Panel --> <toast></toast> <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2 ci-leftPanel"> <div class="ci-socialButtons row" ng-controller="AuthCtrl"> <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> <h3>Biblioteca de Fotos</h3> </div> <div class="col-xs-4 col-sm-4 col-md-12 col-lg-12"> <button ng-click="facebookLogin()" ng-class="selectedButtonFacebook ? \'ci-button-activated\' : \' \'"> <span> <img ng-src="{{selectedButtonFacebook && \'images/facebook-logo-white.38775cb4.svg\' || \'images/facebook-logo-black.8612e9a9.svg\'}}" alt="facebook"> <span>Facebook</span> </span> </button> </div> <div class="col-xs-4 col-sm-4 col-md-12 col-lg-12" style="opacity: 0.2; filter: alpha(opacity=20)"> <button style="cursor:not-allowed"> <span style="cursor:not-allowed"> <img style="cursor:not-allowed" src="images/flickr-logo.dea01d1e.svg" alt="flickr"> <span style="cursor:not-allowed">Flickr</span> </span> </button> </div> <div class="col-xs-4 col-sm-4 col-md-12 col-lg-12" style="opacity: 0.2; filter: alpha(opacity=20)"> <button style="cursor:not-allowed"> <span style="cursor:not-allowed"> <img src="images/instagram-logo.61e6cc76.svg" alt="instagram" style="cursor:not-allowed"> <span style="cursor:not-allowed">Instagram</span> </span> </button> </div> </div> <div class="hidden-xs hidden-sm ci-aboutbox"> <h3><a class="ci-about" ng-click="showAbout = !showAbout">Sobre o projeto</a></h3> <p ng-class="showAbout ? \'\' : \'hidden\'">Projeto desenvolvido por Haroldo Olivieri para o projeto de conclusão do curso de graduação de Design de Mídia Digital da PUC-Rio. WhatsYourPic é a primeira fase de um projeto que tem por objetivo analisar informações previamente coletadas e criar uma forma interativa de visualização dos dados gerados.</p> </div> </div> <div class="hidden-xs hidden-sm ci-aboutbox-parent"> <div> <h3 class="ci-custom-h3">Projeto acadêmico</h3> <img src="../images/dad-logo.970c000a.svg" alt="puc-rio dad" height="70" class="ci-aboutImg"> </div> </div> <!-- Grid --> <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 ci-grid-parent"> <div class="col-xs-12 col-sm-12 ci-grid" ng-if="checkIfHasImages()"> <div class="col-xs-4 col-sm-4 col-md-4 col-lg-3" ng-repeat="photo in photoArray track by $index"> <div class="ci-grid-helper"></div> <div class="ci-grid-item"> <a id="image-{{$index}}" ng-click="selectImage($index)"> <img class="" ng-src="{{photo.url}}"> <div class="ci-grid-itemChecked" ng-if="photo.selected"> <span class="glyphicon glyphicon-ok" aria-hidden="true"> </div> </a> <img id="popup-{{$index}}" ng-src="{{photo.url}}" class="ci-img-onHover" ng-show="photo.onHover" ng-click="selectImage($index)"> </div> </div> </div> <div class="col-xs-12 col-sm-12 ci-grid-empty" ng-if="!checkIfHasImages()"> <div> <h4>nada carregado ainda :(</h4> </div> </div> </div> <!-- Right-Panel --> <div class="col-xs-12 col-sm-12 col-md-3 col-lg-5 ci-rightPanel" id="form"> <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ci-right-bigImage" ng-if="selectedImage!=\'empty\'"> <img class="img-responsive" ng-src="{{selectedImage}}" alt=""> </div> <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ci-right-form" ng-if="selectedImage==\'empty\'"> <div class="ci-right-description"> <h2>Selecione uma foto de suas redes sociais!</h2> <h3>Caso queira selecionar várias,<br>fique a vontade para enviar novamente.</h3> <h3>Quanto mais melhor! ;)</h3> </div> </div> <div class="col-xs-12 col-sm-12 ci-right-form" ng-if="selectedImage!=\'empty\'"> <div class="ci-form-inline form-inline row"> <div class="col-xs-12 col-sm-12 smooth-scroll" id="ci-preview"> <h3>Dados da imagem</h3> </div> <div class="col-xs-12 col-sm-12"> <input g-places-autocomplete ng-model="form.location" id="location" type="text" class="ci-form-full" placeholder="Localização"> </div> <div class="col-xs-8 col-sm-8"> <my-datepicker dt="form.date" datepickermode="month" minmode="month" datestyle="MMMM yyyy"> </div> <div class="col-xs-3 col-xs-offset-1 col-sm-3 col-sm-offset-1"> <button type="submit" class="pull-right" ng-click="sendForm()" ng-class="validateSubmit ? \'ci-submit-validated\' : \' \'">Enviar!</button> </div> </div> </div> </div> <div class="visible-xs-block visible-sm-block ci-footer-mobile"> <div class="col-xs-6"> <h3>Projeto acadêmico</h3> <img src="../images/dad-logo.970c000a.svg" alt="puc-rio dad" height="70" class="ci-aboutImg"> </div> <div class="col-xs-6"> <h3><a class="ci-about" ng-click="showAbout = !showAbout">Sobre o projeto</a></h3> <p ng-class="showAbout ? \'\' : \'hidden\'">Projeto desenvolvido por Haroldo Olivieri para o projeto de conclusão do curso de graduação de Design de Mídia Digital da PUC-Rio. WhatsYourPic é a primeira fase de um projeto que tem por objetivo analisar informações previamente coletadas e criar uma forma interativa de visualização dos dados gerados.</p> </div> </div> </div>')}]);