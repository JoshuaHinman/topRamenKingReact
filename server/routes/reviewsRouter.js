const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const fs = require('fs')

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'server/public/images/',
    filename: function (req, file, cb) {
      const prefix = Math.round(Math.random() * 1E6)
      cb(null, prefix + file.originalname)
    }
  })
const upload = multer({ storage: storage })

//Get first 4
// router.get('/', async (req, res) => {
//     try {
//         //const reviewArray = await Review.find({}).populate('userid')
//         const reviewArray = await Review.find({}, null, {limit: 4}).lean().populate('userid')
//         //res.render('reviews', {reviewArray: reviewArray, login: req.session.userName, userDate: req.session.userSignup})
//     } catch (err) {
//         res.status(500).json({ message: err.message})
//     }
// });

//Get page
router.get('/page/:page', async (req, res) => {
    try {
        const page = parseInt(req.params.page, 10) || 1;
        const lastReviewIdx = await Review.countDocuments() - 1;
        let startIdx = lastReviewIdx - (page * 4 - 1);
        let limit = 4;
        if (startIdx < 0) {
            limit += startIdx;
            startIdx = 0;
        }
        if (limit > 0) {
            //console.log(startIdx, limit, lastReviewIdx);
            const reviewArray = await Review.find({}, null, {skip: startIdx, limit: limit})
                                        .lean().populate('userid');
            res.status(200).json(reviewArray)
        }
        else {
            res.status(200).json([]);
        }
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

//search
router.get('/search/:query', async (req, res) => {
    const query = new RegExp(req.params.query, 'i');
    try {
        const reviewArray = await Review.find( {$or: [{ title: query},
                                                     { subtitle: query},
                                                     { text: query}]}).lean().populate('userid');
        res.status(200).json(reviewArray);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

// router.get('/edit/:id',authMiddleware, async (req, res) => {
//     const review = await Review.find({_id: req.params.id}, null, {}).lean().populate('userid')
//     //res.render('editPost', {review: review[0], login: req.session.userName, userDate: req.session.userSignup})
// });

//Create one
router.post('/create', authMiddleware, upload.single('file'), async (req, res) => {
    console.log(req.session.userId);
    let review = new Review({
        title: req.body.title,
        subtitle: req.body.subtitle,
        text: req.body.text,
        ratings: JSON.parse(req.body.ratings),
        image:[{name: req.file.filename,
                contentType: req.file.mimetype,
                data: fs.readFileSync(path.join(__dirname + '/../public/images/' + req.file.filename))
        }],
        userid: req.session.userId
    })
    try {
        const newReview = await review.save();
        fs.unlink(path.join(__dirname + '/../public/images/' + req.file.filename),function(err){
            if(err) return console.log(err);
            console.log('temp file deleted successfully');
        });  
        res.status(200).json({message: "post succeeded"});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//update
router.post('/edit/:id', authMiddleware, upload.single('file'), async (req, res) => {
    console.log(JSON.parse(req.body.ratings));
    let review = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        text: req.body.text,
        ratings: JSON.parse(req.body.ratings),
        image:[{name: req.file.filename,
                contentType: req.file.mimetype,
                data: fs.readFileSync(path.join(__dirname + '/../public/images/' + req.file.filename))
        }],
    }
    
    try {
        const result = await Review.updateOne({_id: req.params.id}, review);
        fs.unlink(path.join(__dirname + '/../public/images/' + req.file.filename),function(err){
            if(err) return console.log(err);
            console.log('temp file deleted successfully');
       });
       res.status(200).json({message: "edit succeeded"});
      // res.redirect('/reviews')
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// //Update one
// router.patch('/:id', getReview, async (req, res) => {
//     let keys = Object.keys(req.body);
//     keys.forEach( (key) => {
//         res.review[key] = req.body[key]
//     })
//     try {
//         const updatedReview = await res.review.save()
//         res.json(updatedReview);
//     } catch (err) {
//         res.status(400).json({ message: err.message});
//     }
// });

//Delete one
router.post('/delete/:id', async (req, res) => {
    try {
        await Review.deleteOne({ _id: req.params.id });
        console.log('deleted');
        res.status(200).json({message: "delete succeeded"});
    } catch (err) {
        console.log('failed to delete');
        res.status(500).json({ message: err.message});
    }

});

//Get one
router.get('/:id', async (req, res) => {
    let review;
    try {
        review = await Review.findById(req.params.id);
        if (review == null) {
            return res.status(404).json({message: "cannot find"});
        }
    } catch (err){
        return res.status(500).json({message: err.message});
    }
    res.status(200).json(res.review)
});


// async function getReview(req, res, next) {
//     let review;
//     try {
//         review = await Review.findById(req.params.id);
//         if (review == null) {
//             return res.status(404).json({message: "cannot find"});
//         }
//     } catch (err){
//         return res.status(500).json({message: err.message});
//     }
//     res.review = review;
//     next();
// }

function authMiddleware (req, res, next) {
    User.findById(req.session.userId, (err, user) => {
        if (err || !user) {
            console.log('error')
           // return res.redirect('/')
        }
        next()
    })
}

// function getRatingsArray(body) {
//     let keys = Object.keys(body)
//     let iconKeys = keys.filter( key => key.slice(0, -1) === 'icon')
//     let ratingKeys = keys.filter( key => key.slice(0, -1) === 'rating')
//     let result = []
//     for (let i = 0; i < iconKeys.length; i++) {
//         result.push({ icon: body[iconKeys[i]], rating: body[ratingKeys[i]] })
//     }
//     return result
// }


module.exports = router;