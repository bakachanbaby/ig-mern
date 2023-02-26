const mongoose = require('mongoose');

const storyViewerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A post must belong to a user'],
    },
    story: {
        type: mongoose.Schema.ObjectId,
        ref: 'Story',
        required: [true, 'A story view must belong to a story'],
    },
});

const StoryViewer = mongoose.model('StoryViewer', storyViewerSchema);

module.exports = StoryViewer;
