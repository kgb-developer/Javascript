(function($) {
    function mlbGamecastField() {
        this.init();
    }

    mlbGamecastField.prototype.init = function() {
        this.snap = Snap('#mlb-gamecast__view--field');
        this.bases();
        this.startPointX = 195;
		this.startPointY = 153;
		this.controls();
		this.defense();
		new Fireworks(['#06c','#d00']); //initialze w/ team colors
    };

	//////////////////////////////////////////////////////
    // TOOLKIT CONTROLS
    //////////////////////////////////////////////////////
	
	mlbGamecastField.prototype.controls = function() {
		var self = this;

		$('#groundball').click(function() {
			self.disableControls(5000);
			$('.mlb-gamecast__defense').removeClass('mlb-gamecast__defense--active');
			$('.mlbGamecast__pitchCount').removeClass('mlbGamecast__pitchCount--defense');
			self.pitch(function() {
				setTimeout(function() {
					self.groundball(195, 60, "out", function() {
						setTimeout(function() { self.clearPreviousDrive(false); }, 1000);
					});
				}, 100);
			});
		});

		$('#linedrive').click(function() {
			self.disableControls(5000);
			$('.mlb-gamecast__defense').removeClass('mlb-gamecast__defense--active');
			$('.mlbGamecast__pitchCount').removeClass('mlbGamecast__pitchCount--defense');
			self.pitch(function() {
				setTimeout(function() {
					self.linedrive(250, 60, 'out', function() {
						setTimeout(function() { self.clearPreviousDrive(false); }, 1000);
					});
				}, 100);
			});
		});

		$('#flyball').click(function() {
			self.disableControls(10000);
			$('.mlb-gamecast__defense').removeClass('mlb-gamecast__defense--active');
			$('.mlbGamecast__pitchCount').removeClass('mlbGamecast__pitchCount--defense');
			self.pitch(function() {
				setTimeout(function() {
					self.flyball(120, 75, '', function() {
						setTimeout(function() { 
							self.clearPreviousDrive(true);
						}, 500);
					});
					setTimeout(function() { 
						self.baseRunner('double', true, function() {
							setTimeout(function() { self.clearPreviousDrive(false); }, 2000);
						});
					}, 500);
				}, 100);
			});
		});

		$('#grandslam').click(function() {
			self.disableControls(15000);
			$('.mlb-gamecast__defense').removeClass('mlb-gamecast__defense--active');
			$('.mlbGamecast__pitchCount').removeClass('mlbGamecast__pitchCount--defense');
			$('.base__0, .base__1, .base__2').addClass('base--active');
			$('.base__first text').text('Lastname').css('opacity', '1');
			$('.base__second text').text('Lastname').css('opacity', '1');
			$('.base__third text').text('Lastname').css('opacity', '1');
			setTimeout(function() { 
				self.pitch(function() {
					setTimeout(function() {
						self.flyball(120, 28, "", function() {
							$(window).trigger('katy-perry')
							setTimeout(function() {
								self.clearPreviousDrive(true);
							}, 500);
						});
						setTimeout(function() { 
							$('.base__0, .base__1, .base__2').removeClass('base--active');
							$('.base__first text').text('').css('opacity', '0');
							$('.base__second text').text('').css('opacity', '0');
							$('.base__third text').text('').css('opacity', '0');
							$('.base__0, .base__1, .base__2').removeClass('base--active');
							$('.base__first text').text('').css('opacity', '0');
							$('.base__second text').text('').css('opacity', '0');
							$('.base__third text').text('').css('opacity', '0');
							self.baseRunner('firstToHome', false);
							self.baseRunner('secondToHome', false);
							self.baseRunner('thirdToHome', false);
							self.baseRunner('homerun', false, function() {
								setTimeout(function() { 
									self.clearPreviousDrive(false); 
								}, 5000);
							});
						}, 500);
					}, 100);
				});
			}, 2000);
		});

		$('#homerun').click(function() {
			self.disableControls(15000);
			$('.mlb-gamecast__defense').removeClass('mlb-gamecast__defense--active');
			$('.mlbGamecast__pitchCount').removeClass('mlbGamecast__pitchCount--defense');
			self.pitch(function() {
				setTimeout(function() {
					self.flyball(52, 60, "", function() {
						setTimeout(function() { 
							$(window).trigger('katy-perry')
							self.clearPreviousDrive(true);
							self.baseRunner('homerun', false, function() {
								
								setTimeout(function() { 
									self.clearPreviousDrive(false); 
								}, 5000);
							});
						}, 1000);
					});
				}, 100);
			});
		});
	};

	$('#defense').click(function() {
		$('.mlb-gamecast__defense').toggleClass('mlb-gamecast__defense--active');
		$('.mlbGamecast__pitchCount').toggleClass('mlbGamecast__pitchCount--defense');
	 });

	mlbGamecastField.prototype.disableControls = function(time) {
		var buttons = '#flyball, #groundball, #homerun, #linedrive, #grandslam, #defense',
			disabled = 'disabled';

		$(buttons).prop(disabled, true).addClass(disabled);
		setTimeout(function() {
			$(buttons).prop(disabled, false).removeClass(disabled);
		}, time);
	};

	//////////////////////////////////////////////////////
    // END TOOLKIT CONTROLS
    //////////////////////////////////////////////////////

	mlbGamecastField.prototype.clearPreviousDrive = function(bases) {
        var snap = this.snap,
            clearEl,
			baseInactive;
		
		if(bases == true) {
			clearEl = "SVG > *:not(defs, .base, .base-runner, .runner, .mlb-gamecast__defense)";
		} 

		if(bases == false) {
			clearEl = "SVG > *:not(defs, .base, .base-runner, .mlb-gamecast__defense)";
			baseInactive = $('.base').removeClass('base--active');
			$('.base-runner text').text("").css('opacity', '0');
		}

		var $el = $(clearEl);
        $el.fadeOut(250, function() {
            this.remove();
        });
    };

    mlbGamecastField.prototype.linedrive = function(hitXCoord, hitYCoord, result, callback) {
        var self = this,
            snap = self.snap,
            hitType = 'linedrive',
            midPointX = (((hitXCoord - self.startPointX) / 2) + self.startPointX) - (((hitXCoord - self.startPointX) / 4)),
            midPointY = (((hitYCoord - self.startPointY) / 2) + self.startPointY) + (((hitYCoord - self.startPointY) / 4)),
            hitStart = snap.circle(2, 2, 2).transform('t' + (self.startPointX - 2) + ', ' + (self.startPointY - 2)).attr({fill: '#48494a'}),
            hitPath = snap.path('M' + self.startPointX + ', ' + self.startPointY + ' C' + midPointX + ', ' + midPointY + ' ' + hitXCoord + ', ' + hitYCoord + ' ' + hitXCoord + ', ' + hitYCoord).attr({fill: 'none', stroke: '#48494a', strokeWidth: 1, class: 'hit-path ' + hitType}),
            hitPathDom = document.querySelector('.' + hitType),
            hitPathLength = hitPathDom.getTotalLength(),
            drawBaseball = self.baseball();
        
		self.baseballShadow(hitXCoord, hitYCoord);
        self.animatePath(hitPathDom, hitPathLength);
        self.animateOnPath(hitPathLength, hitPath, drawBaseball, 1200, mina.linear,function() {
            self.playResult(hitXCoord, hitYCoord, result, function() {
                callback();
            });
        });
    };

    mlbGamecastField.prototype.groundball = function(hitXCoord, hitYCoord, result, callback) {
        var self = this,
            snap = self.snap,
            hitType = 'groundball',
            hitStart = snap.circle(2, 2, 2).transform('t' + (self.startPointX - 2) + ', ' + (self.startPointY - 2)).attr({fill: '#48494a'}),
            hitPath = snap.path('M' + self.startPointX + ', ' + self.startPointY + ' ' + hitXCoord + ', '+ hitYCoord).attr({stroke: '#48494a', class: 'hit-path ' + hitType}),
            hitPathDashed = self.dashPath(hitPath),
            hitPathDom = document.querySelector('.' + hitType),
            hitPathLength = hitPathDom.getTotalLength(),
            drawBaseball = self.baseball();
        
		// self.baseballShadow(hitXCoord, hitYCoord);
        self.animatePath(hitPathDom, hitPathLength);
        self.animateOnPath(hitPathLength, hitPath, drawBaseball, 1200, function() {
            self.playResult(hitXCoord, hitYCoord, result, function() {
                callback();
            });
        });
    };

    mlbGamecastField.prototype.flyball = function(hitXCoord, hitYCoord, result, callback) {
        var self = this,
            snap = self.snap,
            hitType = 'flyball',
            midPointX = hitXCoord - ((hitXCoord - self.startPointX) / 4),
            midPointY = (hitYCoord - self.startPointY - 10) + hitYCoord,
            hitStart = snap.circle(2, 2, 2).transform('t' + (self.startPointX - 2) + ', ' + (self.startPointY - 2)).attr({fill: '#48494a'}),
            hitPath = snap.path('M' + self.startPointX + ', ' + self.startPointY + ' C' + midPointX + ', ' + midPointY + ' ' + hitXCoord + ', ' + hitYCoord + ' ' + hitXCoord + ', ' + hitYCoord).attr({fill: 'none', stroke: '#48494a', strokeWidth: 1, class: 'hit-path ' + hitType}),
            hitPathDom = document.querySelector('.' + hitType),
            hitPathLength = hitPathDom.getTotalLength(),
            drawBaseball = self.baseball();
		
		self.baseballShadow(hitXCoord, hitYCoord);
        self.animatePath(hitPathDom, hitPathLength);
        self.animateOnPath(hitPathLength, hitPath, drawBaseball, 1200, mina.linear, function() {
            self.playResult(hitXCoord, hitYCoord, result, function() {
                callback();
            });
        });
    };
    
    mlbGamecastField.prototype.playResult = function(hitXCoord, hitYCoord, result, callback) {
        var snap = this.snap,
            group = snap.group(),
            indicator = $(".baseball"),
            hitResult = "hit-result",
            tCords, url, svg;
        
        if(result === "out") {
            tCords  = 't' + (hitXCoord - 5) + ', ' + (hitYCoord - 2);
            url = "http://a.espncdn.com/redesign/assets/img/svg/x.svg";
        } else {
            tCords  = 't' + (hitXCoord - 12) + ', ' + (hitYCoord - 6);
            url = "http://a.espncdn.com/redesign/assets/img/svg/hit.svg";
        }

        svg = Snap.load(url, function(loadedFragment) {
            group.append(loadedFragment);
        }),

        playResultScale = function() {
            group.animate({transform: tCords + 's1,1'}, 400, mina.linear);
            $('.' + hitResult).insertBefore('.hit-path');
        };

        group.addClass(hitResult).animate({ transform: tCords + 's0,0' }, 0, mina.linear, function() {
            playResultScale();

            indicator.fadeOut(250, function() {
                callback();
            });
        });
    };

    mlbGamecastField.prototype.baseball = function() {
        var snap = this.snap;

        this.drawBaseball = snap.group(
            snap.circle(8, 8, 3).attr({fill: '#ffffff', stroke: '#48494a', strokeWidth: 0.8})
        ).addClass("baseball").transform('t 192, 102');

        return this.drawBaseball;
    };

	mlbGamecastField.prototype.baseballShadow = function(hitXCoord, hitYCoord) {
		var self = this,
			snap = self.snap,
			blur = snap.filter(Snap.filter.blur(2)),
			shadowPath = snap.path('M' + self.startPointX + ',' + self.startPointY + ', L' + hitXCoord + ',' + hitYCoord).attr({'class': 'shadow-path', 'stroke-width': '0','stroke-opacity': '0'}),
			shadowPathLength = Snap.path.getTotalLength(shadowPath);
		
		this.drawShadow = snap.group(
            snap.circle(8, 8, 2).attr({fill: '#2b2c2d', filter: blur})
        ).addClass("baseball-shadow");

		var indicator = $(".baseball-shadow");
		
		self.animateOnPath(shadowPathLength, shadowPath, this.drawShadow, 1200, mina.linear, function() {
            indicator.remove();
        });
	};

	mlbGamecastField.prototype.pitch = function(callback) {
        var self = this,
			snap = self.snap,	
            pitchPath = snap.path('M' + self.startPointX +', 135 L195, 153'),
            pitchPathLength = Snap.path.getTotalLength(pitchPath),
            drawBaseball = self.baseball(),
            indicator = $(".baseball");

        self.animateOnPath(pitchPathLength, pitchPath, drawBaseball, 1200, mina.linear, function() {
            indicator.fadeOut(400, function() {
                indicator.remove();
				callback();
            });
        });
    };

     mlbGamecastField.prototype.bases = function() {
        var self = this,
            snap = self.snap;

        self.drawBase = snap.group(
            snap.path("M375,249.5l-8-3.5l-8,3.5l0,0v1.8l8,3.5v0l8-3.5L375,249.5L375,249.5z").attr({'class': 'base__fill__0', 'stroke-width': '0','stroke-opacity': '1'}),
            snap.path("M 367,253 367,254.8 375,251.3 375,249.5  z").attr({'class': 'base__fill__20', 'stroke-width': '0','stroke-opacity': '1'}),
            snap.path("M 359,251.3 367,254.8 367,253 359,249.5  z").attr({'class': 'base__fill__30', 'stroke-width': '0','stroke-opacity': '1'})
        ).addClass("base base__3").transform('t -167.5,-117');

        var thirdBase = self.drawBase.clone().attr("class", "base base__2").transform('t -215, -118'),
            secondBase = self.drawBase.clone().attr("class", "base base__1").transform('t -172, -136'),
            firstBase = self.drawBase.clone().attr("class", "base base__0").transform('t -129, -118'),
            playerNamePos = {
                '0': {
                    posX: 238,
                    posY: 123,
					type: 'first',
                    name: ''
                },
                '1': {
                    posX: 195,
                    posY: 105,
					type: 'second',
                    name: ''
                },
                '2': {
                    posX: 151,
                    posY: 123,
					type: 'third',
                    name: ''
                }
            };

        self.drawBaseRunner = function(base) {
            return snap.group(snap.text(base.posX, base.posY, base.name).attr({ fill: '#fff', 'font-size': '11px', textAnchor: 'middle' })).addClass('base-runner' + ' ' + 'base__' + base.type);
        };

        Object.keys(playerNamePos).map(function(base) {
            self.drawBaseRunner(playerNamePos[base])
        });
    };

	mlbGamecastField.prototype.baseRunner = function(type, advancedToBase, callback) {
		var self = this,
			snap = self.snap,
			indicatorClass = "runner runner-" + type,
			homeToFirstPath = 'M 195, 153, L 238, 132',
			firstToSecondPath = 'M 238, 132, L 195, 114',
			secondToThirdPath = 'M 195, 114, L 151, 132',
			thirdToHomePath = 'M 151, 132, L 195, 153',
			firstToThirdPath = firstToSecondPath + secondToThirdPath,
			firstToHomedPath = firstToSecondPath + secondToThirdPath + thirdToHomePath,
			secondToHomePath = secondToThirdPath + thirdToHomePath,
			runPath, dura, toBase, playerName;
		
		if(type == 'single' || type == 'toFirst') {
			runPath = snap.path(homeToFirstPath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 3000;
			toBase = $('.base__0');
			playerName = $('.base__first text');
		}

		if(type == 'double') {
			runPath = snap.path(homeToFirstPath + firstToSecondPath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 4000;
			toBase = $('.base__1');
			playerName = $('.base__second text');
		}

		if(type == 'triple') {
			runPath = snap.path(homeToFirstPath + firstToSecondPath + secondToThirdPath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 5000;
			toBase = $('.base__2');
			playerName = $('.base__third text');
		}

		if(type == 'homerun') {
			runPath = snap.path(homeToFirstPath + firstToSecondPath + secondToThirdPath + thirdToHomePath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 5000;
			toBase = $('.base__3');
			playerName = $('.base__home text');
		}

		if(type == 'toSecond') {
			runPath = snap.path(firstToSecondPath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 3000;
			toBase = $('.base__1');
			playerName = $('.base__second text');
		}

		if(type == 'toThird') {
			runPath = snap.path(secondToThirdPath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 3000;
			toBase = $('.base__2');
			playerName = $('.base__third text');
		}

		if(type == 'toHome') {
			runPath = snap.path(thirdToHomePath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 3000;
			toBase = $('.base__3');
			playerName = $('.base__home text');
		}

		if(type == 'firstToHome') {
			runPath = snap.path(firstToHomedPath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 4000;
			toBase = $('.base__3');
			playerName = $('.base__home text');
		}

		if(type == 'secondToHome') {
			runPath = snap.path(secondToHomePath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 3000;
			toBase = $('.base__3');
			playerName = $('.base__home text');
		}

		if(type == 'thirdToHome') {
			runPath = snap.path(thirdToHomePath).attr({'stroke-width': '0','stroke-opacity': '0'});
			dura = 2000;
			toBase = $('.base__3');
			playerName = $('.base__home text');
		}

		self.runner = snap.group(
            snap.circle(8, 8, 3).attr({fill: '#06c', strokeWidth: 0})
        ).addClass(indicatorClass).transform('t 187, 145');

		var runPathLength = Snap.path.getTotalLength(runPath),
			indicator = $(".runner.runner-" + type);
			
		self.animateOnPath(runPathLength, runPath, self.runner, dura, mina.ease, function() {
            indicator.fadeOut(400, function() {
				indicator.remove();
				if(callback) { callback(); }
			});
			if(advancedToBase == true) {
				toBase.addClass('base--active');
				playerName.text('Lastname').css('opacity', '1');
			}
		});
	};

	mlbGamecastField.prototype.defense = function() {
		var self = this,
			snap = self.snap;

		return snap.group(
			snap.text(195, 168, 'Lastname').attr({class: 'catcher', fill: '#fff', 'font-size': '11px', textAnchor: 'middle'}),
			snap.text(140, 125, 'Lastname').attr({class: 'third-base', fill: '#fff', 'font-size': '11px', textAnchor: 'middle'}),
			snap.text(245, 125, 'Lastname').attr({class: 'first-base', fill: '#fff', 'font-size': '11px', textAnchor: 'middle'}),
			snap.text(155, 100, 'Lastname').attr({class: 'short-stop', fill: '#fff', 'font-size': '11px', textAnchor: 'middle'}),
			snap.text(235, 100, 'Lastname').attr({class: 'second-base', fill: '#fff', 'font-size': '11px', textAnchor: 'middle'}),
			snap.text(95, 75, 'Lastname').attr({class: 'left-field', fill: '#fff', 'font-size': '11px', textAnchor: 'middle'}),
			snap.text(195, 55, 'Lastname').attr({class: 'center-field', fill: '#fff', 'font-size': '11px', textAnchor: 'middle'}),
			snap.text(290, 75, 'Lastname').attr({class: 'right-field', fill: '#fff', 'font-size': '11px', textAnchor: 'middle'})
		).addClass('mlb-gamecast__defense');
	};

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////

    mlbGamecastField.prototype.animatePath = function($el, pathLength) {
        $el.style.transition = $el.style.WebkitTransition = 'none';
        $el.style.strokeDasharray = pathLength + ' ' + pathLength;
        $el.style.strokeDashoffset = pathLength;
        $el.getBoundingClientRect();
        $el.style.transition = $el.style.WebkitTransition ='stroke-dashoffset 1200ms linear';
        $el.style.strokeDashoffset = '0';
    };

	mlbGamecastField.prototype.animateOnPath = function(pathLength, path, indicator, dura, ease, callback) {
        var movePoint;
        Snap.animate(
            0,
            pathLength,
            function(value) {
                movePoint = path.getPointAtLength(value);
                indicator.transform('t' + parseInt(movePoint.x - 8) + ',' + parseInt(movePoint.y - 8));
            },
            dura,
            ease,
            callback
        );
    };

    mlbGamecastField.prototype.dashPath = function(myPath) {
        var snap = this.snap,
            cLine = myPath.node,
            length = cLine.getTotalLength(),
            passLineMaskNumber = 0,
            dashLength = 3,
            dashSpacing = 3,
            maskSegmentStartPoint = null,
            maskSegmentEndPoint = null,
            maskSegments = [],
            maskId = 'curve-mask-' + passLineMaskNumber++,
            svgRoot = document.getElementById("mlb-gamecast__view--field"),
            _svgNS = 'http://www.w3.org/2000/svg',
            clipPath = document.createElementNS(_svgNS, 'clipPath');

        for(var i = 0; i < length; i += (dashLength + dashSpacing)) {
            maskSegmentStartPoint = myPath.getPointAtLength(i);
            maskSegmentEndPoint = myPath.getPointAtLength(i + dashLength);
            maskSegments.push(snap.circle(maskSegmentStartPoint.x, maskSegmentStartPoint.y, dashLength / 2));
        }

        clipPath.setAttributeNS(null, 'id', maskId);
        svgRoot.appendChild(clipPath);

        maskSegments.forEach(function(maskSegment) {
            clipPath.appendChild(maskSegment.node);
        });

        cLine.setAttributeNS(null, 'clip-path', 'url(#' + maskId + ')');

        return maskSegments;
    };

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////

	$(document).ready(function(){
		var mlbGameCastField = new mlbGamecastField();
	});

})(jQuery);