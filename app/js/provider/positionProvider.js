/*global angular*/
angular.module("gessami")
    .provider("PositionProvider", function () {
        "use strict";

        this.$get = function () {
            return {
                getPositionData: function (successHandler, errorHandler) {
                    var locationX = Math.round(Math.random() * 10),
                        locationY = Math.round(Math.random() * 10);

                    if (Math.random() < 0.95) {
                        successHandler({
                            locationX: locationX,
                            locationY: locationY
                        });
                    } else {
                        errorHandler("Error when getting location");
                    }
                }
            };
        };
    });
