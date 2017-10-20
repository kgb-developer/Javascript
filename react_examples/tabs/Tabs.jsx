var React = require('react'),
    createReactClass = require('create-react-class'),
    AnchorLink = require('../AnchorLink/AnchorLink'),
    classnames = require('classnames'),
    Icon = require('../Icons/Icon'),
    TabsDropDown = require('./TabsDropDown'),
    Button = require('../Buttons/Button'),
    ButtonGroup = require('../Buttons/ButtonGroup'),
    FILTER_SIZE_DEFAULT = 'md';

require('./Tabs.css');

function TabListItems_handleClick(e) {
    var props = this.props,
        href = props && props.url,
        index,
        onClick;

    // If no url is provided, then fire 'onClick' function
    // otherwise, tabs behave as common links
    if (!href) {
        onClick = props.onClick;
        index = props.index;

        // Avoid anchor redirection
        e.preventDefault();
        return onClick(index);
    }
}

function TabListItems_render() {
    const props = this.props,
        isActive = (props && props.isActive) || null,
        colorActive = (props && props.colorActive) || null,
        filterDisplay = (props && props.filterDisplay) || false,
        filterSize = (props && props.filterSize) || FILTER_SIZE_DEFAULT,
        tabListItem = classnames({
            'tabs__list__item' : !filterDisplay,
            'flex-expand justify-center' : filterDisplay
        }, isActive);

    var linkItems = props && props.linkItems,
        hasLinks = linkItems && props.linkItems.length > 0,
        styleOverrides,
        ret;

    if (colorActive) {
        styleOverrides = {
            borderColor: colorActive
        };
    }

    if(filterDisplay) {
        ret = (
            <Button size={filterSize} className={tabListItem} style={styleOverrides} onClick={this.handleClick} filter>
                {props.title}
            </Button>
        );
    } else {
        ret = (
            <li className={tabListItem} style={styleOverrides}>
                <AnchorLink classes="tabs__link" onClick={this.handleClick} to={props.url}>
                    {props.title}
                    {hasLinks && <Icon icon="caret__down" />}
                </AnchorLink>
                {hasLinks && <TabsDropDown items={props.linkItems} />}
            </li>
        );
    }

    return ret;
}

const TabListItems = createReactClass({
    displayName: 'TabListItems',
    handleClick: TabListItems_handleClick,
    render: TabListItems_render
});

function TabList_render() {
    // Set 'active' class on active list item
    var props = this.props,
        alignLeft = props.alignLeft,
        filterDisplay = (props && props.filterDisplay) || false,
        filterSize = (props && props.filterSize) || FILTER_SIZE_DEFAULT,
        isActive = filterDisplay ? 'btn--active' : 'tabs__list__item--active',
        colorActive = (props && props.colorActive) || null,
        renderTabs = [],
        handleClick = this.handleClick,
        className,
        ret;

    className = classnames(
        'tabs__nav',
        {
            'tabs__nav--left': alignLeft
        },
        props.className
    );

    // Map through each obj in 'items' array and pass through 'index' for tracking
    renderTabs = props.items.map(function(tab, index) {
        return <TabListItems onClick={handleClick} activeTab={props.activeTab || 0} colorActive={colorActive} index={index} key={index} url={tab.url} title={tab.title} linkItems={tab.linkItems || []} isActive={props.activeTab === index ? isActive : null} filterDisplay={filterDisplay} filterSize={filterSize} />;
    });

    if(filterDisplay) {
        ret = (
            <ButtonGroup className="flex">
                {renderTabs}
            </ButtonGroup>
        );
    } else {
        ret = (
            <nav className={className}>
                <ul className="tabs__list">{renderTabs}</ul>
            </nav>
        );
    }

    return ret;
}

function TabList_handleClick(index) {
    const props = this.props;

    // Pass 'index' to track click function and return state change
    return props.onClick(index);
}

const TabList = createReactClass({
    displayName: 'TabList',
    handleClick: TabList_handleClick,
    render: TabList_render
});

const Tabs = createReactClass({
    displayName: 'Tabs',
    // Set intial state of 'activeTab' key to match prop index
    getInitialState: function() {
        return {
            activeTab: this.props.activeTab || 0
        };
    },

    // Update 'activeTab' state to 'index'
    changeTab: function(index) {
        var me = this,
            props = me.props,
            state = me.state,
            onChange = props && props.onChange,
            activeTab = state && state.activeTab;

        if (activeTab !== index) {
            if (typeof onChange === 'function') {
                onChange(index);
            }

            me.setState({
                activeTab: index
            });
        }
    },
    // Render 'TabList' with it's state, array of data 'items' and tracking to pass as props
    // 'tabs__content' - Current tabs content from array of data 'items'
    render: function() {
        var me = this,
            state = me.state,
            props = me.props,
            data = props.data,
            filterDisplay = (props && props.filterDisplay) || false,
            filterSize = (props && props.filterSize) || FILTER_SIZE_DEFAULT,
            activeTab = state.activeTab,
            colorActive = (props && props.colorActive) || null,
            tabClass,
            isDropDown,
            dropDownTabContent,
            content;

        tabClass = classnames(
            'tabs__wrapper',
            {
                'tabs__wrapper--centered': props.centered
            },
            props.className
        );

        isDropDown = data[activeTab].linkItems;

        dropDownTabContent =
            isDropDown &&
            isDropDown.filter(activeChild => {
                return activeChild.isActive;
            });

        content = isDropDown ? dropDownTabContent[0].content : data[activeTab].content;

        return (
            <div className={tabClass}>
                <TabList activeTab={state.activeTab} items={props.data} onClick={me.changeTab} colorActive={colorActive} filterDisplay={filterDisplay} filterSize={filterSize} alignLeft={props.alignLeft}/>
                <div className="tabs__content">{content}</div>
            </div>
        );
    }
});

module.exports = { Tabs, TabList };
