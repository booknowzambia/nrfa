import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
chai.use(chaiHttp);
var expect = chai.expect;

import xlsxReceiptData from "./testData/xlsxReceiptData.js";
import { default as app } from "../app.js";
// import config from '../config.js';

describe.only('testing receipts', function() {
    beforeEach(async function(){
        // config.callbacks.cards = ['http://localhost:3000/cardsCallbackTest'];
        // config.callbacks.receipts = ['http://localhost:3000/receiptsCallbackTest'];
        // config.callbacks.reversals = ['http://localhost:3000/reversalsCallbackTest'];
    });
    
    it('should update receipts', function(done){
        // app.get('/receiptsXlsxSourceTest', async (req: any, res)=>{
        //     res.send(xlsxReceiptData.data);
        // });
        
        app.post('/receiptsCallbackTest', async (req, res)=>{
            console.log('receipts Test endpoint body length = ', req.body.length, ' first item = ', req.body[0]);
            // expect(req.body[0].plaza).equals("");
            // expect(req.body.length).equals(100);
            done();
        });

        console.log('starting test');
        
        chai.request(app).get('/receipts?distributor=DOT_COM_ZAMBIA').send().then(resp=>console.log('response in test: ', resp.body));
    });
});