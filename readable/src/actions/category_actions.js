import ForumAPI from '../ForumAPI';

const GET_CATEGORIES = 'GET_CATEGORIES';
const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
const categoriesEntity = 'categories';

const getCategories = categories => ({
    type: GET_CATEGORIES,
    categories
});

const fetchCategories = (postId) => dispatch => (
    ForumAPI.getAll(categoriesEntity).then(
        object => dispatch(getCategories(object[categoriesEntity])),
        error => console.error(error)
    )
);

const changeCategory = selected => ({
    type: CHANGE_CATEGORY,
    selected
});

export {GET_CATEGORIES, CHANGE_CATEGORY, fetchCategories, changeCategory}