import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {changeSortBy} from '../actions/post_actions';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ArrowUpIcon from 'material-ui-icons/ArrowUpward';
import ArrowDownIcon from 'material-ui-icons/ArrowDownward';
import { pink } from 'material-ui/colors';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        color: '#777777',
        border: 'solid',
    },

    selected: {
        color: pink[500],
    }
});


class SortControl extends React.Component{
    render(){
        const {sortProperty, sortCategories, dispatchSelectedSort, isDesc, classes} = this.props;
        return(
            <div>
                <div className="ctrlContainer">
                    {sortProperty && sortCategories && Object.keys(sortCategories).map((category, i) => (
                        <div key={i}>
                            <Button className={sortProperty === sortCategories[category] && isDesc ?
                                [classes.button, classes.selected].join(' ') :
                                classes.button}
                                    onClick={(event) => dispatchSelectedSort({property: sortCategories[category], isDesc: true})}>
                                {category}<ArrowUpIcon/>
                            </Button>
                            <Button className={sortProperty === sortCategories[category] && !isDesc ?
                                [classes.button, classes.selected].join(' ') :
                                 classes.button}
                                    onClick={(event) => dispatchSelectedSort({property: sortCategories[category], isDesc: false})}>
                                {category}<ArrowDownIcon/>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({posts}) => {
    return {
        sortProperty: posts.sortBy ? posts.sortBy.property : null,
        isDesc: posts.sortBy ? posts.sortBy.isDesc : null
    }
};

function mapDispatchToProps (dispatch) {
    return {
        dispatchSelectedSort: (selectedCategory) => dispatch(changeSortBy(selectedCategory))
    }
}

SortControl.propTypes = {
    sortCategories: PropTypes.object.isRequired,
    sortProperty: PropTypes.string,
    isDesc: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    dispatchSelectedSort: PropTypes.func
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SortControl));
