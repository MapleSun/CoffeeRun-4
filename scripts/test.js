
QUnit.test( 'hello test', function( assert ) {
    assert.ok( 1 == '1', 'Passed!' );
});

QUnit.test('8.10 DataStore ', function (assert){
    var ds = window.myTruck.db;
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    assert.deepEqual({'m@bond.com':'tea', 'james@bond.com': 'eshpressho'}, ds.getAll(),'getAll function returns an object, passed');
    assert.equal('tea', ds.get('m@bond.com'),'get function passed');
    ds.remove('james@bond.com');
    var size = Object.keys(ds.getAll()).length;
    assert.equal(1,size,'remove function passed');
});

QUnit.test('8.32 Truck', function (assert){
    var myTruck = window.myTruck;
    myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
    myTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
    myTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});
    var db_size = Object.keys(myTruck.db.getAll()).length;
    assert.equal(db_size, 3,'All orders have been added');
    // I change the deliverOrder function to return the output.
    // This make it easy to test the result
    assert.equal('Delivering order for dr@no.com', myTruck.deliverOrder('dr@no.com'),'dr\'s Deliver Passed');
    db_size = Object.keys(myTruck.db.getAll()).length;
    assert.equal(db_size, 2,'dr\'s order removed');
    assert.equal('Delivering order for m@bond.com', myTruck.deliverOrder('m@bond.com'), 'm\'s Deliver Passed');
    db_size = Object.keys(myTruck.db.getAll()).length;
    assert.equal(db_size, 1,'m\'s order removed');
});
