/**
 * Created by Thomas on 11/6/2015.
 */

var express = require('express'),
    bodyParser = require('body-parser');

var APIControl = function(){

    var APIControl = express.Router();

    var userRouter = require('./Users')();
    APIControl.use('/users', userRouter);

    return APIControl;

};

module.exports = APIControl;
