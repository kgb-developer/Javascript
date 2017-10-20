var React               = require('react'),
    classnames          = require('classnames'),
    PropTypes           = require('prop-types'),
    TYPE_UNDEF          = 'undefined',
    fitt                = (typeof fitt === TYPE_UNDEF) ? require('fitt') : fitt;
    
require('./ShotChart.css');

/**
 * A component for ShotChartCourt
 *
 * @name ShotChartCourt
 * @class
 * @param   {Object}                    props                       Properties passed to component
 * @param   {String}                    [props.className=""]        Sets additional classname(s) on component
 * @param   {Array}                     [props.data]                API Data
 * @param   {String}                    [props.sport]               Sport determines if the court is NBA or NCAA
 * @param   {Object}                    [props.teamColors]          Object sets dynamic teamColors based on data
 * @param   {Object}                    [props.play]                Object determines specific play
 * @param   {String}                    [props.homeAway]            homeAway determines if team is home or away
 * @param   {String}                    [props.dataText]            Text String provided in data
 * @param   {String}                    [props.period]              Period in game
 * @param   {String}                    [props.shooter]             Athlete ID
 * @param   {String}                    [props.scoringPlay]         String determines if the play is a scoring play
 * @param   {String}                    [props.shootingPlay]        String determines if the play is a shooting play
 * @param   {String}                    [props.coordX]              X coord of play position based on court
 * @param   {String}                    [props.coordY]              Y coord of play position based on court
 * @return  {PropTypes.element}                           
 */

function PlayItem(props){
    var className                   = classnames("ShotChart__court__play", props.className),
        play                        = props.play,
        id                          = `shot${play.id}`,
        teamColors                  = props.teamColors,
        homeAway                    = play.homeAway,
        dataText                    = play.text,
        period                      = play.period.number,
        shooter                     = play.athlete.id,
        scoringPlay                 = play.scoringPlay,
        shootingPlay                = play.shootingPlay,
        coordX                      = play.coordinate.x,
        coordY                      = play.coordinate.y,
        TOOLTIP_CLASS_NAME_BASE     = "ShotChart__court__play__tooltip",
        TOOLTIP_CLASS_NAME_FLIPPED  = "ShotChart__court__play__tooltip--flip",
        tooltipClassName            = classnames(TOOLTIP_CLASS_NAME_BASE),
        style, teamColor, xPer, yPer, homeCoordStyle, awayCoordStyle;

    xPer = coordX * 1.0; 
    xPer = (xPer / 50) * 100; // Court is 50' wide so x in API must be ft, Grab a percentage for x in relation to court width 
    yPer = coordY + 4.0; // Hoop is 4' from baseline, nums from API are from hoop, why wouldn't they be?
    yPer = (yPer / 94) * 100; // Grab a percentage for y in relation to court length
    yPer = Math.round(yPer); // Round y because I say so

    // Store home percent styles
    // Account for circle size (10px) 5px diameter + 2px border
    homeCoordStyle = { 
        right: `calc(${yPer}% - 7px)`, 
        top: `calc(${xPer}% - 7px)`
    }

    // Store away percent styles
    // Account for circle size (10px) 5px diameter + 2px border
    // Use left instead of right because the y coords from API flip
    awayCoordStyle = {
        bottom: `calc(${xPer}% - 7px)`,
        left: `calc(${yPer}% - 7px)`
    }
    
    if(homeAway === "away") {
        teamColor = teamColors.away; 
        if(xPer > 50) { tooltipClassName = classnames(tooltipClassName, TOOLTIP_CLASS_NAME_FLIPPED) }
        style = awayCoordStyle; 
    } else if(homeAway === "home") {
        teamColor = teamColors.home; 
        if(xPer < 50) { tooltipClassName = classnames(tooltipClassName, TOOLTIP_CLASS_NAME_FLIPPED) }
        style = homeCoordStyle; 
    } 

    // Set if play shot was missed or made
    // Add correct property to style obj
    if(shootingPlay === true && scoringPlay === true) {
        className = classnames(className, "ShotChart__court__play--made");
        style.borderColor = teamColor;
        style.backgroundColor = teamColor;
    } else {
        className = classnames(className, "ShotChart__court__play--made");
        style.borderColor = teamColor;
        style.backgroundColor = "transparent";
    }

    return ( 
        <li id={id} data-text={dataText} className={className} data-homeaway={homeAway} data-period={period} data-shooter={shooter} style={style}>
            <span className={tooltipClassName}>{dataText}</span>
        </li>
    );
}

function ShotChartCourt(props) {
    var className   = classnames("ShotChart__court",  props.className),
        id          = props && props.id,
        data        = props && props.data,
        sport       = props && props.sport,
        teamColors  = props && props.teamColors,
        nbaCourt    = "https://secure.espncdn.com/redesign/assets/img/nba/bg-court-logo.png",
        ncaaCourt   = "https://secure.espncdn.com/redesign/assets/img/ncaab/bg-court.png",
        homePlays   = [],
        awayPlays   = [],
        imgAlt      = `${sport}-court`,
        img;

    // Update img src of court based on sport prop
    if(sport === "nba") {
        img = nbaCourt;
    } else if(sport === "ncaa") {
        img = ncaaCourt;
    }

    // Push PlayItem into corresponding arrays
    data.forEach(function(playItem, idx) {
        if(playItem.homeAway === "away") {
            awayPlays.push(<PlayItem key={idx} play={playItem} teamColors={teamColors} />);
        } else if(playItem.homeAway === "home") {
            homePlays.push(<PlayItem key={idx} play={playItem} teamColors={teamColors} />);
        }
    });

    return (
        <div className={className} id={id}>
            <img className="ShotChart__court__img" src={img} alt={imgAlt} />
            <div className="ShotChart__court__wrap">
                <ul className="ShotChart__court__plays ShotChart__court__plays--away">
                    {awayPlays}
                </ul>
                <ul className="ShotChart__court__plays ShotChart__court__plays--home">
                    {homePlays}
                </ul>
            </div>
        </div>
    );
}

ShotChartCourt.propTypes = {
    data: PropTypes.array,
    sport: PropTypes.string,
    teamColors: PropTypes.object
};

ShotChartCourt.defaultProps = {
    data: [],
    sport: "",
    teamColors: {}
};

PlayItem.propTypes = {
    play: PropTypes.object,
    id: PropTypes.string,
    homeAway: PropTypes.string,
    dataText: PropTypes.string,
    period: PropTypes.string,
    shooter: PropTypes.string,
    scoringPlay: PropTypes.string,
    shootingPlay: PropTypes.string,
    coordX: PropTypes.string,
    coordY: PropTypes.string
};

PlayItem.defaultProps = {
    play: {},
    id: "",
    homeAway: "",
    dataText: "",
    period: "",
    shooter: "",
    scoringPlay: "",
    shootingPlay: "",
    coordX: "",
    coordY: ""
};

module.exports = ShotChartCourt;