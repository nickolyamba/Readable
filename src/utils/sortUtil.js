import sortBy from 'sort-by';

const getSorted = (posts, sortObj) => {
    if(posts === null || sortObj === null) return;

    sortObj.isDesc ? posts.sort(sortBy('-'+sortObj.property)) :
        posts.sort(sortBy(sortObj.property));
};

export {getSorted};