import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}


export const createPost = async (req,res) => {
   const post = req.body;
   const newPost = new PostMessage(post);
   try{
    await newPost.save();
    res.status(201).json(newPost);
   } catch (error) {
    res.status(409).json({message: error.message});
   }
}

// export const updatePost = async (req, res) => {
//     const { id: _id } = req.params;
//     const post = req.body
    
//     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

//     const updatedPost = await PostMessage.findByIdandUpdate(_id, post, { new: true});

//     res.json(updatedPost);

// }

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id');
    }

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

        res.json(updatedPost);
        console.log('Post updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the post' });
    }
}


// export const deletePost = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {return res.status(404).send('No post with that id');}

//     await postMessage.findByIdAndRemove(id);

//     console.log('DELETE!');

//     res.json({ message : 'Post deleted successfully' });

// }


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id');
    }

    try {
        await PostMessage.findByIdAndDelete(id); // Use findByIdAndDelete

        console.log('DELETE!');

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the post' });
    }
}
