var React               = require('react'),
    classnames          = require('classnames'),
    PropTypes           = require('prop-types'),
    TYPE_UNDEF          = 'undefined',
    fitt                = (typeof fitt === TYPE_UNDEF) ? require('fitt') : fitt,
    Image               = require('../../Image/Image'),
    ContentList         = require("../../ContentList/ContentList"),
    AnchorLink          = require('../../AnchorLink/AnchorLink'),
    Icon                = require('../../Icons/Icon'),
    ButtonAlt           = require('../../Buttons/ButtonAlt'),
    TableModule         = require('../../Table2/Table'),
    CardComponents      = require('../Card'),
    Card                = CardComponents.Card,
    Card__Header        = CardComponents.Card__Header,
    Card__Content       = CardComponents.Card__Content,
    Card__Footer        = CardComponents.Card__Footer,
    Table               = TableModule.Table;

const   PRESENTED_BY    = 'Presented By',
        BET365_ALT      = 'Bet365',
        BET365_RATIO    = '5x2',
        BET365_LOGO     = 'http://a.espncdn.com/redesign/assets/img/logos/bet365-logo-color-66x20_alt@2x.png',
        BET365_LOGO_LG  = 'http://a.espncdn.com/redesign/assets/img/logos/bet365-logo-color-75x75.png',
        BETTING_ODDS    = 'Betting Odds',
        NEW_CUSTOMERS   = 'New Customers',
        DEPOSIT         = '100% Deposit Bonus up to £200',
        TC              = 'Terms and Conditions Apply',
        JOIN_TODAY      = 'Join Today',
        MORE_DETAILS    = 'More Details';

require('./BettingOdds.css');

function BettingOdds__Promo(props) {
    var data        = (props && props.data),
        condensed   = (props && props.condensed),
        link        = (data && data.link),
        hasLogo,
        btnClassName;
    
    btnClassName = classnames('BettingOdds__Cta', {
        'BettingOdds__Cta--lg' : !condensed
    }, props.children);

    if(!condensed) {
        hasLogo = (
            <AnchorLink to={link} classes="BettingOdds__Link__Logo">
                <Image className="BettingOdds__Logo BettingOdds__Logo--lg" alt={BET365_ALT} src={BET365_LOGO_LG} srcDefault={BET365_LOGO_LG} transparent />
            </AnchorLink>
        );
    } 
    
    return (
        <div className="flex justify-between items-center bg-clr-bet365-light bt bw2 brdr-clr-indicator pl4 pr4 pt5 pb5">
            <div className="flex items-center">
                {hasLogo}
                <div className="BettingOdds__Join">
                    <div className="clr-indicator h8 ttu">{NEW_CUSTOMERS}</div>
                    <div className="n9 clr-gray-07 pt2 pb2">{DEPOSIT}</div>
                    <div className="clr-white n10 o-40 ttn">{TC}</div>
                </div>
            </div>
            <div className="flex flex-column">
                <ButtonAlt size="lg" className={btnClassName}>{JOIN_TODAY}</ButtonAlt>
                <AnchorLink to={link} classes="BettingOdds__Link__Details clr-white n8 o-60 pt2 tc">{MORE_DETAILS}</AnchorLink>
            </div>
        </div>
    );
}
 
function BettingOdds(props) {
    var classname   = classnames('BettingOdds', props.className),
        data        = (props && props.data),
        condensed   = (props && props.condensed),
        link        = (data && data.link),
        tbl_cell_sm = (data && data.tbl_cell_sm),
        tbl_cell_md = (data && data.tbl_cell_md),
        tbl_cell_lg = (data && data.tbl_cell_lg);

    return (
        <Card className={classname}>
            <Card__Header className="bn flex justify-between items-center">
                <AnchorLink to={link} externalLink={true} classes="flex items-center clr-black n5">
                    {BETTING_ODDS}
                    <Icon icon={link} className="fill-clr-gray-04 pl2"/>
                </AnchorLink>
                <AnchorLink to={link} externalLink={true} classes="flex flex-column">
                    <span className="BettingOdds__PresBy tc clr-gray-05 ttn pb2">{PRESENTED_BY}</span>
                    <Image className="BettingOdds__Logo__Bet365" alt={BET365_ALT} ratio={BET365_RATIO} src={BET365_LOGO} srcDefault={BET365_LOGO} transparent />
                </AnchorLink>
            </Card__Header>
            <Card__Content className="pb0 pt0">
                <ContentList className="bt bw2 brdr-clr-bet365">
                    <Table
                        rows={[
                            {
                                row_one:    data.tbl_cell_title,
                                row_two:    <AnchorLink to={link}>{tbl_cell_md}</AnchorLink>,
                                row_three:  <AnchorLink to={link}>{tbl_cell_md}</AnchorLink>,
                                row_four:   <AnchorLink to={link}>{tbl_cell_md}</AnchorLink>
                            }
                        ]}
                    />
                    <Table
                        className="bt brdr-clr-bet365"
                        rows={[
                            {
                                row_one:    data.tbl_cell_title,
                                row_two:    <AnchorLink to={link}>{tbl_cell_lg}</AnchorLink>,
                                row_three:  <AnchorLink to={link}>{tbl_cell_lg}</AnchorLink>,
                                row_four:   <AnchorLink to={link}>{tbl_cell_lg}</AnchorLink>
                            }
                        ]}
                    />
                    <Table
                        className="bt bb brdr-clr-bet365"
                        rows={[
                            {
                                row_one:    data.tbl_cell_title,
                                row_two:    tbl_cell_sm,
                                row_three:  <AnchorLink to={link}>{tbl_cell_md}</AnchorLink>,
                                row_four:   <AnchorLink to={link}>{tbl_cell_lg}</AnchorLink>
                            }
                        ]}
                    />
                    <Table
                        headings={data.tbl_headers}
                        rows={[
                            {
                                row_one:    data.tbl_cell_name,
                                row_two:    <AnchorLink to={link}>{tbl_cell_sm}</AnchorLink>,
                                row_three:  <AnchorLink to={link}>{tbl_cell_sm}</AnchorLink>,
                                row_four:   <AnchorLink to={link}>{tbl_cell_sm}</AnchorLink>
                            },
                            {
                                row_one:    data.tbl_cell_name,
                                row_two:    <AnchorLink to={link}>{tbl_cell_sm}</AnchorLink>,
                                row_three:  <AnchorLink to={link}>{tbl_cell_sm}</AnchorLink>,
                                row_four:   <AnchorLink to={link}>{tbl_cell_sm}</AnchorLink>
                            },
                            {
                                row_one:    data.tbl_cell_name,
                                row_two:    <AnchorLink to={link}>{tbl_cell_sm}</AnchorLink>,
                                row_three:  <AnchorLink to={link}>{tbl_cell_sm}</AnchorLink>,
                                row_four:   <AnchorLink to={link}>{tbl_cell_sm}</AnchorLink>
                            }
                        ]}
                    />
                    <BettingOdds__Promo data={data} condensed={condensed} />
                </ContentList>
            </Card__Content>
            <Card__Footer className="bt-0">
                <AnchorLink to={link}>{data.footer}</AnchorLink>
            </Card__Footer>
        </Card>
    );
}

BettingOdds.propTypes = {
    data: PropTypes.object,
    condensed: PropTypes.bool
};

BettingOdds.defaultProps = {
    data: {},
    condensed: false
};

module.exports = BettingOdds