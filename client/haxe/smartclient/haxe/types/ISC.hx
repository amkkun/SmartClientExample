package smartclient.haxe.types;

typedef ISC = {
	public var IButton: IButton;
	public var HLayout: HLayout;
}

typedef Instance = {
}

typedef IButton = {
	public function create(conf: IButtonConf): IButtonInstance;
}

typedef IButtonConf = {
	public var title: String;
	public function click(): Void;
}

typedef IButtonInstance = {> Instance,
}

typedef HLayout = {
	public function create(conf: HLayoutConf): HLayoutInstance;
}

typedef HLayoutConf = {
	public var membersMargin: Int;
	public var members: Array<Instance>;
}

typedef HLayoutInstance = {> Instance,
}
