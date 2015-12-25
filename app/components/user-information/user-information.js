/*global angular, jq, $, console*/

var jq = $.noConflict(),
    alert = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    emergency = 2,
    refreshIndex = 1000,
    cancelEmergency = 0;

angular.module("gessami")
    .controller("UserInformationController", ["$rootScope", "$scope", "$interval", function ($rootScope, $scope, $interval) {
        "use strict";

        $interval(function () {
            var total = 0;

            jq.each(alert, function () {
                total += this;
            });

            if (total > emergency) {
                console.log("emergency");
                // TODO callEmergency();
            }

            $scope.checkCO2();
            $scope.checkHR();
            $scope.checkPosition();
            $scope.checkPulse();
            $scope.checkSpeed();
            $scope.checkSweat();
            $scope.checkTemperature();
        }, refreshIndex);

        $scope.checkCO2 = function () {
            var breath = Math.round(Math.random() * 10),
                co2 = Math.round(Math.random() * 10),
                alertaBreath = 7,
                alertaCo2 = 4;

            $scope.breath = breath;
            $scope.co2 = co2;

            if (breath > alertaBreath) {
                jq('#breathBox').css('border-color', 'red');
                alert[6] = 1;
            } else {
                jq('#breathBox').css('border-color', '');
                alert[6] = 0;
            }

            if (co2 > alertaCo2) {
                jq('#co2Box').css('border-color', 'red');
                alert[7] = 1;
            } else {
                jq('#co2Box').css('border-color', '');
                alert[7] = 0;
            }
        };

        $scope.checkHR = function () {
            var anterior = 0,
                hr = Math.round(Math.random() * 10),
                incremental = Math.sqrt(Math.pow(hr - anterior, 2)),
                alertaHR = 7,
                alertaInc = 4;

            $scope.hr = hr;
            $scope.incremental = incremental;
            anterior = hr;

            if (hr > alertaHR) {
                jq('#hrBox').css('border-color', 'red');
                alert[3] = 1;
            } else {
                jq('#hrBox').css('border-color', '');
                alert[3] = 0;
            }

            if (incremental > alertaInc) {
                jq('#incrementalBox').css('border-color', 'red');
                alert[4] = 1;
            } else {
                jq('#incrementalBox').css('border-color', '');
                alert[4] = 0;
            }
        };

        $scope.checkPosition = function () {
            var locationX = Math.round(Math.random() * 10),
                locationY = Math.round(Math.random() * 10);

            $scope.locationX = locationX;
            $scope.locationY = locationY;
        };

        $scope.checkPulse = function () {
            var pulso = Math.round(Math.random() * 10),
                alerta = 6;

            $scope.pulse = pulso;

            if (pulso > alerta) {
                jq('#pulseBox').css('border-color', 'red');
                alert[0] = 1;
            } else {
                jq('#pulseBox').css('border-color', '');
                alert[0] = 0;
            }
        };

        $scope.checkSpeed = function () {
            var velocidad = Math.round(Math.random() * 100),
                alerta = 80;

            $scope.speed = velocidad;

            if (velocidad > alerta) {
                jq('#speedBox').css('border-color', 'red');
                alert[1] = 1;
            } else {
                jq('#speedBox').css('border-color', '');
                alert[1] = 0;
            }
        };

        $scope.checkSweat = function () {
            var sudor = Math.round(Math.random() * 100),
                alerta = 70;

            $scope.sweat = sudor;

            if (sudor > alerta) {
                jq('#sweatBox').css('border-color', 'red');
                alert[2] = 1;
            } else {
                jq('#sweatBox').css('border-color', '');
                alert[2] = 0;
            }
        };

        $scope.checkTemperature = function () {
            var temperature = Math.round(Math.random() * 10),
                alerta = 7;

            $scope.temperature = temperature;

            if (temperature > alerta) {
                jq('#temperatureBox').css('border-color', 'red');
                alert[5] = 1;
            } else {
                jq('#temperatureBox').css('border-color', '');
                alert[5] = 0;
            }
        };

        $scope.emergency = function () {
            if (cancelEmergency > 0) {
                cancelEmergency = 0;
            } else {
                jq("#calling").css("display", "block");

                if (navigator && navigator.vibrate) {
                    navigator.vibrate(3000);
                }
            }
        };

        $scope.callEmergency = function () {
            jq("#emergencyAlert").css("display", "block");
            var counter = 5,
                interval = setInterval(function () {
                    jq("#currentSeconds").html(counter);
                    counter -= 1;

                    if (navigator && navigator.vibrate) {
                        navigator.vibrate(500);
                    }

                    if (counter < 0) {
                        jq("#emergencyAlert").css("display", "none");
                        $scope.emergency();
                        clearInterval(interval);
                    }
                }, refreshIndex);
        };

        $scope.cancelEmergency = function () {
            cancelEmergency += 1;
        };
    }]);
