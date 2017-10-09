import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import FavoriteIcon from 'material-ui-icons/Favorite';
import { pink } from 'material-ui/colors';

const styles = theme => ({
    card: {
        cursor: 'pointer',
        marginBottom: '20px',
        padding: '0px'
    },
    title: {
        fontSize: 18,
        color: theme.palette.text.secondaryAction,
    },
    iconPink: {
        fill: pink[600],
        margin: '0 3px 0 6px'
    },
    iconText:{
        display: 'inline',
        fontSize: '18px',
        marginTop: '2px'
    },
    container:{
        display: 'inline-flex',
        alignItems:'center',
        marginBottom: '0 20px 10px 0'
    }
});

class PostList extends React.Component{

    render(){
        const {posts, selectedCategory, classes } = this.props;
        return(
            <div>
                {posts && posts.map((post, i) => (
                    (selectedCategory === 'All' || selectedCategory === post.category) &&
                    <Card className={classes.card} key={i}>
                        <CardContent>
                            <Typography type="body1" className={classes.title} noWarp>
                                {post.title}
                            </Typography>
                            <Typography type="body2" color="secondary" noWarp>
                                {post.body}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div className={classes.container}>
                                <FavoriteIcon className={classes.iconPink}/>
                                <Typography color="secondary" type="heading" className={classes.iconText}>
                                    {post.voteScore}
                                </Typography>
                            </div>
                        </CardActions>


                    </Card>
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({posts, categories}) => {
  return {
      posts: Object.values(posts),
      selectedCategory: categories && categories.selected ? categories.selected : 'All'
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostList));
