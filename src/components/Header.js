import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { changeCategory } from '../actions/category_actions';

class Header extends React.Component {
    state = {selected: this.props.selectedCategory};

    render() {
        const {categories, updateCategory} = this.props;
        return (
            <nav className="header">
                {categories && categories.map((category, i) => (
                    <Link to={`/${category.path}`} key={i}
                          onClick={() => {updateCategory(category.name); this.setState({selected: category.path})}}>
                        <h1 className={this.state.selected === category.path ? 'activeLink' : null}>{category.name}</h1>
                    </Link>
                ))}
            </nav>
        )

    }
}

Header.propTypes = {
    headerText: PropTypes.string.isRequired
};

const mapStateToProps = ({categories}) => {
    return {
        categories: categories.entities ? Object.values(categories.entities) : null,
        selectedCategory: categories.selected ? categories.selected : null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateCategory: (selectedCategory) => dispatch(changeCategory(selectedCategory))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);