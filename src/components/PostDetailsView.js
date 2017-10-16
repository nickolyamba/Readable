import React, { Component } from 'react';
import Entry from './Entry';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';

class PostDetailsView extends Component {
    render(){
        const {entry} = this.props;
        return (
            <div>
                <Entry entry={entry} entityName={'posts'} isDetailsView/>
                <Typography type="title" gutterBottom align="center" color="secondary">
                    Comments
                </Typography>

            </div>
        );
    }
}

PostDetailsView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            postId: PropTypes.string.isRequired
        })
    })
};

const mapStateToProps = ({posts, comments}, ownProps) => ({
    entry: posts.entities ? posts.entities[ownProps.match.params.postId] : null
});

export default connect(mapStateToProps)(PostDetailsView);
