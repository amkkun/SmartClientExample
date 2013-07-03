package smartclient.haxe.view;

import smartclient.haxe.types.ISC;

class Views {
	public static function create(isc: ISC) {
		var button1 = isc.IButton.create({
			title: "haxe",
			click: function() {
				trace("haxe!");
			}
		});

		var button2 = isc.IButton.create({
			title: "haxe2",
			click: function() {
				trace("haxehaxe!");
			}
		});

		isc.HLayout.create({
			membersMargin: 10,
			members: [button1, button2]
		});
	}
}
