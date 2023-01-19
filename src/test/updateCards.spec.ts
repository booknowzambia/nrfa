import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
chai.use(chaiHttp);
var expect = chai.expect;

import { default as app } from "../app.js";

describe('testing cards', function() {
    it('should update cards', async function(){
        // console.log('starting test');
        
        // let request = {
        //     "action": "enable",
        //     "cards": ["0000506873687877", "0004000018974700"]
        // };
        // let resp = await chai.request(app).put('/cards').send(request);
        // console.log('response in test: ', resp.body);
    });
});