var React                       = require('react'),
    classnames                  = require('classnames'),
    PropTypes                   = require('prop-types'),
    TYPE_UNDEF                  = 'undefined',
    fitt                        = (typeof fitt === TYPE_UNDEF) ? require('fitt') : fitt,
    {Dropdown, DropdownOption}  = require('espn-ui/components/ui/Dropdown/Dropdown'),
    Logo                        = require('espn-ui/components/ui/Logo/Logo'),
    FormGroup                   = require('espn-ui/components/ui/Forms/FormGroup'),
    {CheckboxGroup, Checkbox}   = require('espn-ui/components/ui/Forms/Checkbox'),
    constants                   = require( '../constants.js' ),
    HOMEAWAY_AWAY_TEAM          = constants.HOMEAWAY.AWAY_TEAM,
    HOMEAWAY_HOME_TEAM          = constants.HOMEAWAY.HOME_TEAM;

require('./ShotChartControls.css');

function QuarterSelect(props, context) {
    var translate       = (context && context.translate),
        allQuarter      = "All",
        firstQuarter    = "1st Quarter",
        secondQuarter   = "2nd Quarter",
        thirdQuarter    = "3rd Quarter",
        fourthQuarter   = "4th Quarter",
        quarters;

    if(typeof translate !== 'function') {
        translate = function(s) { return s; };
    }

    quarters = [{
        name: translate(allQuarter),
        value: null
    }, {
        name: translate(firstQuarter),
        value: 1
    }, {
        name: translate(secondQuarter),
        value: 2
    }, {
        name: translate(thirdQuarter),
        value: 3
    }, {
        name: translate(fourthQuarter),
        value: 4
    }];
    
    return (
        <Dropdown onChange={props.onChange} className={props.className} size={props.size}>
            {quarters.map(function(quarter, idx) { return <DropdownOption key={idx} value={quarter.value} title={quarter.name}/> })}
        </Dropdown>
    );
}

/**
 * A component for ShotChartControls
 *
 * @name ShotChartControls
 * @class
 * @param   {Object}                    props                       Properties passed to component
 * @param   {String}                    [props.className=""]        Sets additional classname(s) on component
 * @param   {String}                    [props.id]                  Athlete ID
 * @param   {Array}                     [props.data]                API Data
 * @return  {PropTypes.element}                           
 */

function ShotChartControls(props) {
    var className       = classnames("ShotChartControls",  props.className),
        id              = props && props.id,
        data            = props && props.data,
        onMadeAway      = props.onMadeToggle.bind(null, HOMEAWAY_AWAY_TEAM),
        onMissedAway    = props.onMissedToggle.bind(null, HOMEAWAY_AWAY_TEAM),
        onMadeHome      = props.onMadeToggle.bind(null, HOMEAWAY_HOME_TEAM),
        onMissedHome    = props.onMissedToggle.bind(null, HOMEAWAY_HOME_TEAM),
        awayPlayers, homePlayers;

    function playerFilterByTeam(item, idx, array, cond) {
        if (item.homeAway == cond) {
            return array.map(function(play) {
                return play.athlete.name;
            }).indexOf(item.athlete.name) === idx;
        }
    }

    awayPlayers = data.filter(function(item, idx, array) {
        return playerFilterByTeam(item, idx, array, HOMEAWAY_AWAY_TEAM);

    }).map(function(player, idx) {
        var athleteId       = player.athlete.id,
            athleteName     = player.athlete.name;

        return (
            <DropdownOption id={athleteId} value={athleteName} key={idx} title={athleteName} />
        );
    });

    homePlayers = data.filter(function(item, idx, array) {
        return playerFilterByTeam(item, idx, array, HOMEAWAY_HOME_TEAM);
        
    }).map(function(player, idx) {
        var athleteId       = player.athlete.id,
            athleteName     = player.athlete.name;

        return ( 
            <DropdownOption id={athleteId} value={athleteName} key={idx} title={athleteName} />
        );
    });

    return (
        <div className={className} id={id}>
            <QuarterSelect onChange={props.onQuarterSelect} className="ShotChartControls__Dropdown ma0 w-100" key="1" size="sm" />
            <div className="ShotChartControls__wrap">
                <div className="ShotChartControls__team ShotChartControls__team--away pb4 pt5">
                    <div className="ShotChartControls__team__title flex items-center">
                        <Logo 
                            alt="Cleveland Cavaliers"
                            src="http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/cle.png&h=40&w=40"
                            size="sm"
                        />
                        <div className="fw-medium n7 ml4">Cavaliers</div>
                    </div>
                    <Dropdown onChange={props.onAwayPlayerChange} className="ShotChartControls__Dropdown mr0 ml0 w-100" key="2" size="sm">
                        <DropdownOption value="All" title="All"/>
                        {awayPlayers}
                    </Dropdown>
                    <form className="ShotChartControls__team__missMade form">
                        <FormGroup>
                            <CheckboxGroup name="checkbox_group">
                                <Checkbox
                                    label="Made"
                                    defaultChecked={true}
                                    className="ShotChartControls__team__missMade__made mr4"
                                    onChange={onMadeAway}
                                />
                                <Checkbox
                                    label="Missed"
                                    defaultChecked={true}
                                    className="ShotChartControls__team__missMade__missed"
                                    onChange={onMissedAway}
                                />
                            </CheckboxGroup>
                        </FormGroup>
                    </form>
                </div>
                <div className="ShotChartControls__team ShotChartControls__team--home">
                    <div className="ShotChartControls__team__title flex items-center">
                        <Logo 
                            alt="Golden State Warriors"
                            src="http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/gs.png&h=40&w=40"
                            size="sm"
                        />
                        <div className="fw-medium n7 ml4">Warriors</div>
                    </div>
                    <Dropdown onChange={props.onHomePlayerChange} className="ShotChartControls__Dropdown mr0 ml0 w-100" key="3" size="sm">
                        <DropdownOption value="All" title="All" />
                        {homePlayers}
                    </Dropdown>
                    <form className="ShotChartControls__team__missMade form">
                        <FormGroup>
                            <CheckboxGroup name="checkbox_group">
                                <Checkbox
                                    label="Made"
                                    defaultChecked={true}
                                    className="ShotChartControls__team__missMade__made mr4"
                                    onChange={onMadeHome}
                                />
                                <Checkbox
                                    label="Missed"
                                    defaultChecked={true}
                                    className="ShotChartControls__team__missMade__missed"
                                    onChange={onMissedHome}
                                />
                            </CheckboxGroup>
                        </FormGroup>
                    </form>
                </div>
            </div>
        </div>
    );
}

ShotChartControls.propTypes = {
    id: PropTypes.string,
    data:  PropTypes.array
};

ShotChartControls.defaultProps = {
    id: "",
    data: []
};

module.exports = ShotChartControls;