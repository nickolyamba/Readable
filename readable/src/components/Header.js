import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { changeCategory } from '../actions/category_actions';

class Header extends React.Component {
    render() {
        const {categories, updateCategory, selected} = this.props;
        return (
            <nav className="header">
                {categories && categories.map((category, i) => (
                    <Link to={`/${category.path}`} key={i}
                          onClick={() => updateCategory(category.path)}>
                        <h1 className={selected === category.path ? 'activeLink' : null}>{category.name}</h1>
                    </Link>
                ))}
            </nav>
        )

    }
}

Header.propTypes = {
    headerText: PropTypes.string
};

const mapStateToProps = ({categories}) => {
    return {
        categories: categories.entities ? Object.values(categories.entities) : null,
        selected: categories.selected ? categories.selected : ''
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateCategory: (selectedCategory) => dispatch(changeCategory(selectedCategory))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);