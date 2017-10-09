import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

class PostList extends React.Component{

    render(){
        const {posts, selectedCategory, classes } = this.props;
        return(
            <Card className={classes.card}>
                <CardContent>
                    <Typography type="body1" className={classes.title}>
                        Word of the Day
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button dense>Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      posts: Object.values(state.posts),
      selectedCategory: state.categories.selected
  }
};

function mapDispatchToProps (dispatch) {
    return {
        //selectCategory: (selectedCategory) => dispatch(changeCategory(selectedCategory))
    }
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
