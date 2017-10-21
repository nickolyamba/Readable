### React Nanodegree Project #2: Readable

#### Installation Guide:
1. Clone the project: `$ git clone https://github.com/nickolyamba/Readable.git`

2. Go to the sever directory: `$ cd api-server`

3. Install server dependencies: `$ npm install`

4. Start the Node server at [http://localhost:3001](http://localhost:3001): `$ node server`

4. Go back to the root and install the React project dependencies: `$ cd ..` `$ npm install`


#### Launching:
5. `$ npm start`

6. Open [http://localhost:3000](http://localhost:3000) in your browser


#### Specifications:
* ##### List of Posts
    * Navigation bar buttons allow to filter and view posts by categories
    * All posts for a category are listed at`/:category`
    * The default view shows posts from all categories
    * Listed posts are displayed with title, author, number of comments, current score, and a voting mechanism to upvote or downvote the post 
    * Posts have buttons for editing or deleting that post. Pressing the edit button opens an input form
    * Pressing on either a post title, avatar, or body redirects to a Post Details View
    * Post contains only first line of the post body. The rest can be viewed in a Post Details View
    * List of posts can be sorted by either a date created, or vote score
    * Pressing `Add Post` button opens an input form for creating a new post
    * All the data changes are synchronized with the server

* ##### Post Details View
    * The Post Details View path is:`/:category/:post_id`
    * A list of comments is shown below the parent post
    * Listed comments are displayed with title, author, current score, and a voting mechanism to upvote or downvote the comment 
    * Comments have buttons for editing or deleting that comment. Pressing the edit button opens an input form
    * Pressing `Add Comment` opens an input form for creating a new comment
    * All the data changes are synchronized with the server
      


