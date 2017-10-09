import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCategory } from '../actions/category_actions';
import { FormHelperText, FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

class Category extends React.Component{
    render(){
        const {categories, selectCategory} = this.props;
        return(
            <FormControl style={{marginBottom: '40px'}}>
                <Select
                    native
                    onChange={event => selectCategory(event.target.value)}>
                    <option value = 'All'>All</option>
                    {categories && categories.map((category, i) => {
                        return (
                            <option value={category.name} key={i}>{category.name}</option>
                        )
                    })}
                </Select>
                <FormHelperText>Select Post Category</FormHelperText>
            </FormControl>
        );
    }
}

const mapStateToProps = ({categories}) => {
    return {
        categories: Object.values(categories)
    }
};

function mapDispatchToProps (dispatch) {
    return {
        selectCategory: (selectedCategory) => dispatch(changeCategory(selectedCategory))
    }
}

Category.propTypes = {
    categories: PropTypes.array.isRequired,
    selectCategory: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
