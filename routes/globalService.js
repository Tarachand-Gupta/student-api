const router = require('express').Router();
let UserCollection = require('../model/user.model');


router.route('/getMediaMessages').post((req, res) => {
    console.log('\n getMediaMessages request.body => ' + JSON.stringify(req.body));

    UserCollection.findOne({
        collegeid: req.body.collegeid
    }).then(result => {
        res.json(result);
        console.log('\n getMediaMessages response.body => \n' + JSON.stringify(result));
    })
        .catch(err => {
            console.log("\n catch in getMediaMessages response.body => " + err);
            // res.send('error: ' + err)
        });

});





module.exports = router;
