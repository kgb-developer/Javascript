var React               = require('react'),
    classnames          = require('classnames'),
    PropTypes           = require('prop-types'),
    WindowEventWrapper  = require('fitt-react-win-geom-evt-wrapper'),
    TYPE_UNDEF          = 'undefined',
    fitt                = (typeof fitt === TYPE_UNDEF) ? require('fitt') : fitt,
    cstr                = fitt.cstr,
    breakpoints         = require('espn-breakpoints'),
    COL_MAX             = 4,
    COL_MIN             = 1,
    PX                  = 'px',
    PERCENT             = '%',
    STRING_SPACE        = ' ';

/**
 * A component for InnerLayout
 *
 * @name InnerLayout
 * @class
 * @param   {Object}                    props                               Properties passed to component
 * @param   {String}                    [props.className='']                Sets additional classname(s) on component
 * @param   {Array}                     [props.children]                    Array of child elements
 * @param   {Number}                    [props.windowWidth]                 Number representing the window width
 * @param   {Object}                    [props.desc]                        Object used to declare options for component based on breakpoints
 * @return  {PropTypes.element}                           
 */

function InnerLayout(props) {
    var children                = (props && props.children),
        windowWidth             = (props && props.windowWidth),
        desc                    = (props && props.desc),

        // Desc prop - breakpoint object keys
        key_desktop             = (desc && desc.DESKTOP),
        key_tablet              = (desc && desc.TABLET),
        key_mobile              = (desc && desc.MOBILE),

        // Store breakpoints based on windowWidth
        bp_desktop              = (windowWidth && (windowWidth >= breakpoints.DESKTOP[0])),
        bp_tablet               = (windowWidth && ((windowWidth >= breakpoints.TABLET[0]) && (windowWidth <= breakpoints.TABLET[1]))),
        bp_mobile               = (windowWidth && (windowWidth <= breakpoints.MOBILE[1])),

        // Defaults
        default_columns         = COL_MAX,
        default_column_space    = 0,
        default_children_shown  = 4,

        // Column based variables
        column_space, 
        column_space_half,

        // Children (group) based variables
        children_show, 
        children_hide,

        // Child (single) based variables
        child_className, 
        child_margins, 
        child_style,

        // Misc. variables - declaring for later use
        columns, isScrollable, classname, style;

    // Set dynamic variables based on breakpoints
     // Make sure we're defaulting
    if(bp_desktop) {
        columns         = key_desktop.COLUMNS;
        column_space    = key_desktop.COLUMN_SPACE;
        children_show   = key_desktop.CHILDREN_SHOWN;
        isScrollable    = key_desktop.SCROLLABLE;

    } else if(bp_tablet) {
        columns         = key_tablet.COLUMNS;
        column_space    = key_tablet.COLUMN_SPACE;
        children_show   = key_tablet.CHILDREN_SHOWN;
        isScrollable    = key_tablet.SCROLLABLE;

    } else if(bp_mobile) {
        columns         = key_mobile.COLUMNS;
        column_space    = key_mobile.COLUMN_SPACE;
        children_show   = key_mobile.CHILDREN_SHOWN;
        isScrollable    = key_mobile.SCROLLABLE;

    } else {
        columns         = default_columns;
        column_space    = default_column_space;
        children_show   = default_children_shown;
        isScrollable    = false;
    }
    
    column_space_half   = (column_space / 2); // Cut 'column_space' in half for proper grid margins
    child_margins       = cstr(['0 ' + column_space_half + PX + STRING_SPACE + column_space + PX + STRING_SPACE + column_space_half + PX]); // Set 'child_margins' based on 'column_space'
    
    if(column_space) {
        style = {margin: cstr(['0 ' + '-' + column_space_half + PX])}; // If 'column_space' exists, set style on 'InnerLayout' wrapper to account for proper margins
    }

    classname = classnames('InnerLayout flex flex-auto', {
        'flex-wrap'         : !isScrollable, // If 'isScrollable' is false or non existent, set style to wrap cbildren
        'overflow-x-scroll' : isScrollable // If 'isScrollable' is true, set style to scroll cbildren
    }, props.className);

    function ChildColStyle(columns, margins, column_space) {
        var self        = this,
            max_width   = 100, 
            width       = max_width + PERCENT; // 100%

        if (columns > COL_MIN) {
            columns     = (columns >= COL_MAX) ? COL_MAX : columns; // If 'columns' is > 'COL_MAX'(4), default to 'COL_MAX'(4)
            max_width   = (max_width / columns).toFixed(2); // Divide 'max_width'(100) from 'columns' - format number to keep only two decimals (accounting for 33.33%)
            width       = cstr(['calc(' + max_width + PERCENT + ' - ' + column_space + PX + ')']); // Set width property to calc 'max_width' - 'column_space' for proper child spacing
        }

        self.margin = margins;
        self.width  = width;
    }

    // Map through children of 'InnerLayout'
    // Set styles for children based on number of 'columns'
    children = React.Children.map(children, function(child, idx) {
        child_style     = new ChildColStyle(columns, child_margins, column_space); // child_style constructor
        children_hide   = (idx >= children_show); // Hide every child >= 'children_show' from 'desc' prop
        child_className = classnames('InnerLayout__child', {
            'flex-shrink'   : !isScrollable, // If 'isScrollable' is false or non existent, set style to 'flex-shrink' child
            'flex-none'     : isScrollable, // If 'isScrollable' is true, set style to 'flex-none', so children can scroll properly
            'dn'            : children_hide // Conditionally hide child
        }, child.props.className);
            
        return(
            <div className={child_className} style={child_style}>
                {React.cloneElement(child)}
            </div>
        );
    });
    
    return <div className={classname} style={style}>{children}</div>;
}

InnerLayout.propTypes = {
    windowWidth     : PropTypes.number,
    desc            : PropTypes.object
};

InnerLayout.defaultProps = {
    windowWidth     : null,
    desc            : {}
};

module.exports = WindowEventWrapper(InnerLayout, {windowWidth: true, winSize: true});