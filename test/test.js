/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var PINF = require( '@stdlib/constants-float32-pinf' );
var NINF = require( '@stdlib/constants-float32-ninf' );
var PI = require( '@stdlib/constants-float32-pi' );
var EPS = require( '@stdlib/constants-float32-eps' );
var isnanf = require( '@stdlib/math-base-assert-is-nanf' );
var abs = require( '@stdlib/math-base-special-abs' );
var float64ToFloat32 = require( '@stdlib/number-float64-base-to-float32' );
var rad2degf = require( './../lib' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof rad2degf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `+infinity`', function test( t ) {
	var r = rad2degf( PINF );
	t.strictEqual( r, PINF, 'returns expected value' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `-infinity`', function test( t ) {
	var r = rad2degf( NINF );
	t.strictEqual( r, NINF, 'returns expected value' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var r = rad2degf( NaN );
	t.strictEqual( isnanf( r ), true, 'returns expected value' );
	t.end();
});

tape( 'the function converts an angle from radians to degrees', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var r;
	var i;
	var e;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		r = rad2degf( x[ i ] );
		e = float64ToFloat32( expected[ i ] );
		if ( r === e ) {
			t.strictEqual( r, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = abs( r - e );
			tol = EPS * abs( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+r+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function converts an angle from radians to degrees (canonical values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var er;
	var x;
	var r;
	var i;

	x = [
		PI / 6.0,
		PI / 4.0,
		PI / 3.0,
		PI / 2.0,
		2.0 * PI / 3.0,
		3.0 * PI / 4.0,
		5.0 * PI / 6.0,
		PI,
		7.0 * PI / 6.0,
		5.0 * PI / 4.0,
		4.0 * PI / 3.0,
		3.0 * PI / 2.0,
		5.0 * PI / 3.0,
		7.0 * PI / 4.0,
		11.0 * PI / 6.0,
		2 * PI
	];

	expected = [
		30.0,
		45.0,
		60.0,
		90.0,
		120.0,
		135.0,
		150.0,
		180.0,
		210.0,
		225.0,
		240.0,
		270.0,
		300.0,
		315.0,
		330.0,
		360.0
	];
	for ( i = 0; i < x.length; i++ ) {
		r = rad2degf( x[ i ] );
		er = float64ToFloat32( expected[ i ] );
		if ( r === er ) {
			t.strictEqual( r, er, 'x: '+x[ i ]+'. r: '+r+'. expected: '+er+'.' );
		} else {
			delta = abs( r - er );
			tol = EPS * abs( er );
			t.strictEqual( delta <= tol, true, 'x: '+x[ i ]+'. r: '+r+'. expected: '+er+'. delta: '+delta+'. tol: '+ tol+'.' );
		}
		// Negative `x`:
		r = rad2degf( -x[ i ] );
		er = float64ToFloat32( -expected[ i ] );
		if ( r === er ) {
			t.strictEqual( r, er, 'x: '+x[ i ]+'. r: '+r+'. expected: '+er+'.' );
		} else {
			delta = abs( r - er );
			tol = EPS * abs( er );
			t.strictEqual( delta <= tol, true, 'x: '+x[ i ]+'. r: '+r+'. expected: '+er+'. delta: '+delta+'. tol: '+ tol+'.' );
		}
	}
	t.end();
});

tape( 'if provided a value greater than `~6e+36`, the function will underflow', function test( t ) {
	var r = rad2degf( 6.0e+36 );
	t.strictEqual( r, PINF, 'returns expected value' );
	t.end();
});
