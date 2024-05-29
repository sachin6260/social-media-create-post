import { createContext, useReducer } from "react";

// Create the PostList context
export const PostList = createContext({
    postList: [],
    addPost: () => {},
    addIntialPosts:() => {},
    deletePost: () => {},
});

// Reducer function to manage state changes for postList
const postListReducer = (currPostList, action) => {
    let newPostList = currPostList;
    if (action.type === 'DELETE_POST') {
        newPostList = currPostList.filter(post => post.id !== action.payload.postId);
    }
    else if (action.type === "ADD_INITIAL_POSTS"){
       newPostList = action.payload.posts;         
    }                            
    else if (action.type === 'ADD_POST'){
         newPostList = [action.payload, ...currPostList]     
    }
    return newPostList ;
};

// Provider component for the PostList context
const PostListProvider = ({ children }) => {
    const [postList, dispatchPostList] = useReducer(postListReducer,[]);

    // Function to add a new post
    const addPost = (userId, postTitle,postBody,reaction,tags) => {
        // Implement functionality to add a new post
        dispatchPostList({
            type: 'ADD_POST',
            payload: {
                id: Date.now() ,
                title: postTitle,
                body: postBody, 
                reaction: reaction,
                userId: userId,
                tags: tags,
            }
        })
    };

    const addIntialPosts = (posts) => {
        // Implement functionality to add a new post
        dispatchPostList({
            type: 'ADD_INITIAL_POSTS',
            payload: {
                posts, 
            },
        });
    };

    // Function to delete a post
    const deletePost = (postId) => {
 
        dispatchPostList({
            type: 'DELETE_POST',
            payload:{
                postId,
            },
             
        });
    };

    // Provide postList state and functions to children components
    return (
        <PostList.Provider value={{ postList, addPost,addIntialPosts, deletePost }}>
            {children}
        </PostList.Provider>
    );
};

// Default post list
// const DEFAULT_POST_LIST = [
//     {
//         id: '1',
//         title: 'Going to Mumbai',
//         body: 'Hi Friends, I am going to Mumbai for my vacation. Hope to enjoy a lot. Peace out.', 
//         reaction: 2,
//         userId: 'user-9',
//         tags: ['vacation', 'Mumbai', 'Enjoying']
//     },
//     {
//         id: '2',
//         title: 'Only Apply Passout 2024',
//         body: 'Great opportunity for freshers to boost your career.', 
//         reaction: 15,
//         userId: 'user-12',
//         tags: ['graduating', 'hardwork', 'Enjoying']
//     }
// ];

export default PostListProvider;
 