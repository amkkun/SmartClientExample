package smartclient.haxe.main;

import smartclient.haxe.types.ISC;
import smartclient.haxe.view.Views;

class Main {
	static function main() {
		var iscc: ISC = untyped __js__('isc');

		Views.create(iscc);
	}
}
