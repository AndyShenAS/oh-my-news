/**
 * Created by shj on 2017/4/11.
 */
app.controller('templateController',['$scope','templateService','Upload','fileService','$timeout',function ($scope,templateService,Upload,fileService,$timeout) {



    $scope.init = function () {
        $scope.input = "";
        $scope.inputRes = "";
        $scope.pagination = {};
        $scope.pageItems = {};
        $scope.pagination.totalItems = 200;
        $scope.pagination.currentPage = 2;
        $scope.pagination.maxSize = 5;
        $scope.file = {};
        $scope.errfile = {};
        $scope.fileName="";
        moment.locale("zh-cn");
        $scope.path;
    }

    // 输入框值处理逻辑
    $scope.inputCommit = function () {
        var param = {};
        param.value = $scope.input;
       templateService.getInput(param,function (data) {
           $scope.inputRes = data;
       },function(data){
           console.info("error:  "+data)
       })
    }
    // 分页处理逻辑
    $scope.pageChange = function () {
        var param = {};
        param.currentPage = $scope.pagination.currentPage;
        templateService.pageChange(param,function (data) {
            $scope.pagination.totalItems = data.pagination.totalItems;
            $scope.pagination.currentPage = data.pagination.currentPage;
            $scope.pageItems = data.items;
        },function (data) {
            console.info("error: "+data)
        });
    }

    // 图片上传代码
    $scope.uploadFiles = function(file, errFiles) {
        // $scope.file = file;
        // $scope.errFile = errFiles && errFiles[0];
        // if (file) {
        //
        //     file.upload = Upload.upload({
        //         url: 'http://localhost:8080/oh-my-news-web/template/upload.do',
        //         data: {file: file}
        //     });
        //
        //     file.upload.then(function (response) {
        //         $timeout(function () {
        //             file.result = response.data;
        //         });
        //     }, function (response) {
        //         if (response.status > 0)
        //             $scope.errorMsg = response.status + ': ' + response.data;
        //     }, function (evt) {
        //         file.progress = Math.min(100, parseInt(100.0 *
        //             evt.loaded / evt.total));
        //     });
        // }
        fileService.fileUpload(file,
            // 图片上传成功处理逻辑，data包含两个属性，id，数据库存储id,url图片访问的url
            function (data) {
           var name= file.name;
            console.info("file data: "+angular.toJson(data));
            $scope.fileName = name;
            $scope.path = data.url;

        },
           //图片上传失败树立逻辑
            function (data) {
            alert(angular.toJson(data));
        });
    }





}])