import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import FavoriteIcon from 'material-ui-icons/Favorite';
import { pink } from 'material-ui/colors';
import sortBy from 'sort-by';

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
        const {posts, classes} = this.props;
        const selectedCategory = this.props.match.params.category;

        return(
            <div>
                {posts && posts.map((post, i) => (
                    (selectedCategory === undefined || selectedCategory === post.category) &&
                    <Card className={classes.card} key={i}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    {post.author.length > 0 ? post.author[0].toUpperCase() : '?'}
                                </Avatar>
                            }
                            title={post.title}
                            subheader={`Posted by ${post.author} on ${new Date(post.timestamp).toLocaleString()}`}
                        />
                        <CardContent>
                            <Typography noWrap type="body1" color="secondary">
                                {post.body}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div className={classes.container}>
                                <FavoriteIcon className={classes.iconPink}/>
                                <Typography color="secondary" type="title" className={classes.iconText}>
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

const getSorted = (posts, sortObj) => {
    if(posts === null || sortObj === null) return;

    sortObj.isDesc ? posts.sort(sortBy('-'+sortObj.property)) :
        posts.sort(sortBy(sortObj.property));
};

const mapStateToProps = ({posts}) => {
    const postsArray = posts.entities ? Object.values(posts.entities) : null;
    getSorted(postsArray, posts.sortBy);

    return {
      posts: postsArray,
  }
};

function mapDispatchToProps (dispatch) {
    return {
        //selectCategory: (selectedCategory) => dispatch(changeCategory(selectedCategory))
    }
}

PostList.propTypes = {
    posts: PropTypes.array,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostList));
