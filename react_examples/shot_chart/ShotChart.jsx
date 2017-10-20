var React               = require('react'),
    classnames          = require('classnames'),
    createReactClass    = require('create-react-class'),
    TYPE_UNDEF          = 'undefined',
    fitt                = (typeof fitt === TYPE_UNDEF) ? require('fitt') : fitt,
    ShotChartCourt      = require("./ShotChartCourt"),
    ShotChartControls   = require("./ShotChartControls"),
    constants           = require( '../constants.js' ),
    ALL_PLAYERS         = "All",
    HOMEAWAY_AWAY_TEAM  = constants.HOMEAWAY.AWAY_TEAM,
    HOMEAWAY_HOME_TEAM  = constants.HOMEAWAY.HOME_TEAM,
    ShotChart;

ShotChart = createReactClass({
    getInitialState: function() {
        return {
            quarter: ALL_PLAYERS,
            awayPlayer: ALL_PLAYERS,
            homePlayer: ALL_PLAYERS,
            awayMade: true,
            homeMade: true,
            awayMissed: true,
            homeMissed: true
        }
    },

    onQuarterSelect:function(e) {
        var selectedQuarter = e.target.value;
        this.setState({quarter: selectedQuarter});
    },

    onAwayPlayerChange: function(e) {
        var playerName = e.target.value;
        this.setState({awayPlayer: playerName});
    },

    onHomePlayerChange: function(e) {
        var playerName = e.target.value;
        this.setState({homePlayer: playerName});
    },

    onMadeToggle: function(homeAway) {
        var awayMade = !this.state.awayMade,
            homeMade = !this.state.homeMade;

        if(homeAway == HOMEAWAY_AWAY_TEAM) {
            this.setState({awayMade: awayMade});
        } else {
            this.setState({homeMade: homeMade});
        }
    },

    onMissedToggle: function(homeAway) {
        var awayMissed = !this.state.awayMissed,
            homeMissed = !this.state.homeMissed;

        if(homeAway == HOMEAWAY_AWAY_TEAM) {
            this.setState({awayMissed: awayMissed});
        } else {
            this.setState({homeMissed: homeMissed});
        }
    },

    render: function() {
        var data        = [],
            state       = this.state,
            props       = this.props,
            classname   = classnames('ShotChart flex', props.className),
            quarter     = state.quarter,
            awayPlayer  = state.awayPlayer, 
            homePlayer  = state.homePlayer,
            awayMade    = state.awayMade,
            awayMissed  = state.awayMissed,
            homeMade    = state.homeMade,
            homeMissed  = state.homeMissed;
            
        data = props.data.filter(function (play) {
            var period = play.period.number;

            if(quarter !== ALL_PLAYERS) {
                return period == quarter;
            } else {
                return play;
            }

        }).filter(function (play) {
            var homeAway    = play.homeAway,
                playerName  = play.athlete.name,
                ret         = false;

            if(homeAway == HOMEAWAY_HOME_TEAM) {
                if(homePlayer === ALL_PLAYERS || homeAway === HOMEAWAY_AWAY_TEAM) { 
                    ret = true;
                } else {
                    ret = (playerName === homePlayer);
                }
            }

            if(homeAway == HOMEAWAY_AWAY_TEAM) {
                if(awayPlayer === ALL_PLAYERS || homeAway === HOMEAWAY_HOME_TEAM) {
                    ret = true;
                } else {
                    ret = (playerName === awayPlayer);
                }
            }

            return ret;

        }).filter(function (play) {
            var shootingPlay    = play.shootingPlay,
                scoringPlay     = play.scoringPlay,
                made            = shootingPlay && scoringPlay,
                missed          = (shootingPlay === true) && (scoringPlay === false),
                homeAway        = play.homeAway,
                ret             = false;

            if(homeAway == HOMEAWAY_AWAY_TEAM) {
                if(awayMade && made) {
                    ret = true;
                }
                if(awayMissed && missed) {
                    ret = true;
                }
            }

            if(homeAway == HOMEAWAY_HOME_TEAM) {
                if(homeMade && made) {
                    ret = true;
                }
                if(homeMissed && missed) {
                    ret = true;
                }
            }
            
            return ret;
        });

        return (
            <div className={classname}>
                <ShotChartCourt data={data} teamColors={props.teamColors} sport={props.sport} />
                <ShotChartControls onQuarterSelect={this.onQuarterSelect} onAwayPlayerChange={this.onAwayPlayerChange} onHomePlayerChange={this.onHomePlayerChange} onMadeToggle={this.onMadeToggle} onMissedToggle={this.onMissedToggle} data={props.data} />
            </div>
        );
    }
});

module.exports = ShotChart