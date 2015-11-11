angular.module("trkr", ['ngCookies'])

.run (function ($rootScope, $http, $cookies, $cookieStore, $location){
  $rootScope.address = 'http://104.236.230.185:8080/';
  $rootScope.url = 'http://findtrkr.com/';
  $rootScope.uid = $cookieStore.get('uid') || '';
  if ($rootScope.uid == '' && window.location.href != $rootScope.url+'login.html') window.location.href = $rootScope.url+'login.html';
  if ($rootScope.uid != '' && window.location.href == $rootScope.url+'login.html') window.location.href = $rootScope.url+'dash.html';
  $rootScope.did = '01';
  $rootScope.oid = $cookieStore.get('oid') || "";
  //console.log ($rootScope.uid);
  //$rootScope.notifications = [];
  $rootScope.getNotifications = function(){
    $http.get ($rootScope.address+'notifications?uid='+$rootScope.uid+'&did='+$rootScope.did+'&page=1&pageSize=10').
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(data);
                console.log (status);
                $rootScope.notifications = data;
                //angular.forEach (data, function (value, key){
                  //$rootScope.notifications.push ({"text": data.firstName, "createDate": data.lastName, "source": mid});
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(data);
                console.log (status);
              });
  }
  $rootScope.getNotifications();
})

.controller("LoginController", function($scope, $rootScope, $http, $cookieStore) {
    $scope.login = function(user){
        $http.post ($rootScope.address+'login?did=0', {"username": user.username, "passwordHash": user.password}).
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(data);
            console.log (status);
            $cookieStore.put ('uid', data.pid);
            $cookieStore.put ('oid', data.oid);
            window.location.href = $rootScope.url+'dash.html'
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(data);
            console.log (status);
          });
    }
})

.controller("NavController", function($scope, $rootScope, $http, $cookieStore) {
    $scope.logout = function(user){
        $cookieStore.remove ('uid');
        window.location.href = $rootScope.url+'index.html';
    }
})

.controller("IndexController", function($scope, $rootScope) {
})

.controller("OrgController", function($scope, $rootScope, $http){

})

.controller("TeamsController", function($scope, $rootScope, $http){

  $scope.setremoveteam = function(index){
    $scope.removedteam = $scope.teams[index].name;
    $scope.removedteamid = $scope.teams[index].tid;
  }
  
	$scope.setselectedteam = function(index){
		$scope.selectedteam = $scope.teams[index].name;
    $scope.selectedteamid = $scope.teams[index].tid;
    $scope.selectedteamlat = $scope.teams[index].loc.lat;
    $scope.selectedteamlon = $scope.teams[index].loc.lon;
    $scope.getMembers($scope.teams[index].tid);
	}

	$scope.getTeams = function(){
		$http({method: 'GET', url: $rootScope.address+'teams?oid='+$rootScope.oid+'&page=1&pageSize=10'}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
          console.log (response.status);
          console.log (response.data);
          $scope.teams = response.data;
        }, function(response) {
          $scope.data = response.data || "Request failed";
          $scope.status = response.status;
      });
    }
  $scope.getTeams();

    $scope.createTeam = function(team){
    	$http.post ($rootScope.address+'teams', {"name": team.name, "oid": $rootScope.oid, "loc": {"lat": team.lat, "lon": team.lon, "source": "webapp"}}).
    	success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        console.log (status);
        $scope.getTeams();
	    }).
	    error(function(data, status, headers, config) {
	      // called asynchronously if an error occurs
	      // or server returns response with an error status.
	      console.log(data);
        console.log (status);
	    });
    }

    $scope.removeTeam = function(){
      $http.delete ($rootScope.address+'teams/'+$scope.removedteamid).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        console.log (status);
        $scope.getTeams();
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(data);
        console.log (status);
      });
    }

    $scope.members = [];

    $scope.getMembers = function(team){
    $scope.members = [];
    $http({method: 'GET', url: $rootScope.address+'members?oid='+$rootScope.oid+'&tid='+team+'&page=1&pageSize=10'}).
        then(function(response) {
          console.log (response.status);
          console.log (response.data);
          angular.forEach (response.data, function (value, key){
            var mid = value.mid;
            //console.log (value.uid);
            $http.get ($rootScope.address+'profiles/'+value.uid, {params: {did: $rootScope.did, uid: $rootScope.uid}}).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(data.firstName);
                console.log (status);
                //console.log (mid);
                $scope.members.push ({"firstname": data.firstName, "lastname": data.lastName, "mid": mid, "uid": data.pid});
                console.log ($scope.members);
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(data);
                console.log (status);
              });
          });
        }, function(response) {
          $scope.data = response.data || "Request failed";
          $scope.status = response.status;
      });
    }

    $scope.addMember = function(member){
      $http.post ($rootScope.address+'members', {"tid": $scope.selectedteamid, "uid": member.uid}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        console.log (status);
        $scope.getMembers($scope.selectedteamid);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(data);
        console.log (status);
      });
    }

    $scope.setremovemember = function(index){
      $scope.removedmember = $scope.members[index].firstname+' '+$scope.members[index].lastname;
      $scope.removedmemberid = $scope.members[index].mid;
      //console.log ($scope.removedmember+$scope.removedmemberid);
    }

    $scope.removeMember = function(){

      $http.delete ($rootScope.address+'members/'+$scope.removedmemberid+'?uid='+$rootScope.uid).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        console.log (status);
        $scope.getMembers($scope.selectedteamid);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(data);
        console.log (status);
      });
    }

})
