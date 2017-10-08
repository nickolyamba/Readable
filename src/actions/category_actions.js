import ForumAPI from '../ForumAPI';

const GET_CATEGORIES = 'GET_CATEGORIES';
const categoriesEntity = 'categories';

const getCategories = categories => ({
    type: GET_CATEGORIES,
    categories
});

const fetchCategories = (postId) => dispatch => (
    ForumAPI.getAll(categoriesEntity).then(
        object => {dispatch(getCategories(object[categoriesEntity])); console.log(object[categoriesEntity])},
        error => console.error(error)
    )
);

export { GET_CATEGORIES, fetchCategories}