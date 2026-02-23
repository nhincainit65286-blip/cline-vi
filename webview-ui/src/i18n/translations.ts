export type Language = "en" | "vi"

export interface Translations {
	navbar: {
		chat: string
		mcp: string
		history: string
		account: string
		settings: string
		newTask: string
		mcpServers: string
	}
	chat: {
		placeholder: string
		send: string
		stop: string
		typeTask: string
		typeMessage: string
	}
	settings: {
		title: string
		general: string
		models: string
		apiKeys: string
		theme: string
		language: string
		preferredLanguage: string
		telemetry: string
		telemetryDescription: string
		telemetryManaged: string
		apiConfiguration: string
		browser: string
		terminal: string
		features: string
		about: string
		remoteConfig: string
		debug: string
	}
	history: {
		title: string
		noHistory: string
		searchHistory: string
		clearHistory: string
	}
	account: {
		title: string
	}
	common: {
		save: string
		cancel: string
		delete: string
		edit: string
		close: string
		confirm: string
		loading: string
		error: string
		success: string
		enabled: string
		disabled: string
	}
	mcp: {
		title: string
		servers: string
		addServer: string
		removeServer: string
		noServers: string
		configure: string
		marketplace: string
		addRemote: string
		addLocal: string
	}
	welcome: {
		title: string
		subtitle: string
		description: string
		getStarted: string
		letsGo: string
		useApiKey: string
		signUp: string
	}
	terminal: {
		title: string
		shell: string
		profile: string
	}
	browser: {
		title: string
		headless: string
	}
}

export const translations: Record<Language, Translations> = {
	en: {
		navbar: {
			chat: "Chat",
			mcp: "MCP",
			history: "History",
			account: "Account",
			settings: "Settings",
			newTask: "New Task",
			mcpServers: "MCP Servers",
		},
		chat: {
			placeholder: "Enter a task for Cline...",
			send: "Send",
			stop: "Stop",
			typeTask: "Type your task here...",
			typeMessage: "Type a message...",
		},
		settings: {
			title: "Settings",
			general: "General",
			models: "Models",
			apiKeys: "API Keys",
			theme: "Theme",
			language: "Language",
			preferredLanguage: "Preferred Language",
			telemetry: "Allow error and usage reporting",
			telemetryDescription: "Help improve Cline by sending usage data and error reports. No code, prompts, or personal information are ever sent.",
			telemetryManaged: "This setting is managed by your organization's remote configuration",
			apiConfiguration: "API Configuration",
			browser: "Browser",
			terminal: "Terminal",
			features: "Features",
			about: "About",
			remoteConfig: "Remote Config",
			debug: "Debug",
		},
		history: {
			title: "History",
			noHistory: "No history yet",
			searchHistory: "Search history...",
			clearHistory: "Clear History",
		},
		account: {
			title: "Account",
		},
		common: {
			save: "Save",
			cancel: "Cancel",
			delete: "Delete",
			edit: "Edit",
			close: "Close",
			confirm: "Confirm",
			loading: "Loading...",
			error: "Error",
			success: "Success",
			enabled: "Enabled",
			disabled: "Disabled",
		},
		mcp: {
			title: "MCP Servers",
			servers: "Servers",
			addServer: "Add Server",
			removeServer: "Remove Server",
			noServers: "No MCP servers configured",
			configure: "Configure",
			marketplace: "Marketplace",
			addRemote: "Add Remote",
			addLocal: "Add Local",
		},
		welcome: {
			title: "Hi, I'm Cline",
			subtitle: "I can do all kinds of tasks thanks to breakthroughs in Claude 4.6 Sonnet's agentic coding capabilities and access to tools that let me create & edit files, explore complex projects, use a browser, and execute terminal commands (with your permission, of course). I can even use MCP to create new tools and extend my own capabilities.",
			description: "Sign up for an account to get started for free, or use an API key that provides access to models like Claude Sonnet.",
			getStarted: "Get Started",
			letsGo: "Let's Go",
			useApiKey: "Use API Key",
			signUp: "Sign Up",
		},
		terminal: {
			title: "Terminal Settings",
			shell: "Shell",
			profile: "Profile",
		},
		browser: {
			title: "Browser Settings",
			headless: "Headless Mode",
		},
	},
	vi: {
		navbar: {
			chat: "Trò chuyện",
			mcp: "MCP",
			history: "Lịch sử",
			account: "Tài khoản",
			settings: "Cài đặt",
			newTask: "Tác vụ mới",
			mcpServers: "Máy chủ MCP",
		},
		chat: {
			placeholder: "Nhập tác vụ cho Cline...",
			send: "Gửi",
			stop: "Dừng",
			typeTask: "Nhập tác vụ của bạn tại đây...",
			typeMessage: "Nhập tin nhắn...",
		},
		settings: {
			title: "Cài đặt",
			general: "Chung",
			models: "Mô hình",
			apiKeys: "API Keys",
			theme: "Giao diện",
			language: "Ngôn ngữ",
			preferredLanguage: "Ngôn ngữ ưa thích",
			telemetry: "Cho phép báo cáo lỗi và sử dụng",
			telemetryDescription: "Giúp cải thiện Cline bằng cách gửi dữ liệu sử dụng và báo cáo lỗi. Không có code, prompts hoặc thông tin cá nhân nào được gửi.",
			telemetryManaged: "Cài đặt này được quản lý bởi cấu hình từ xa của tổ chức bạn",
			apiConfiguration: "Cấu hình API",
			browser: "Trình duyệt",
			terminal: "Terminal",
			features: "Tính năng",
			about: "Giới thiệu",
			remoteConfig: "Cấu hình từ xa",
			debug: "Gỡ lỗi",
		},
		history: {
			title: "Lịch sử",
			noHistory: "Chưa có lịch sử",
			searchHistory: "Tìm kiếm lịch sử...",
			clearHistory: "Xóa lịch sử",
		},
		account: {
			title: "Tài khoản",
		},
		common: {
			save: "Lưu",
			cancel: "Hủy",
			delete: "Xóa",
			edit: "Sửa",
			close: "Đóng",
			confirm: "Xác nhận",
			loading: "Đang tải...",
			error: "Lỗi",
			success: "Thành công",
			enabled: "Bật",
			disabled: "Tắt",
		},
		mcp: {
			title: "Máy chủ MCP",
			servers: "Máy chủ",
			addServer: "Thêm máy chủ",
			removeServer: "Xóa máy chủ",
			noServers: "Chưa có máy chủ MCP nào được cấu hình",
			configure: "Cấu hình",
			marketplace: "Thị trường",
			addRemote: "Thêm từ xa",
			addLocal: "Thêm cục bộ",
		},
		welcome: {
			title: "Xin chào, tôi là Cline",
			subtitle: "Tôi có thể thực hiện đủ loại tác vụ nhờ những đột phá trong khả năng lập trình proxy của Claude 4.6 Sonnet và quyền truy cập vào các công cụ cho phép tôi tạo & chỉnh sửa tệp, khám phá các dự án phức tạp, sử dụng trình duyệt và thực thi lệnh terminal (với sự cho phép của bạn). Tôi thậm chí có thể sử dụng MCP để tạo công cụ mới và mở rộng khả năng của chính mình.",
			description: "Đăng ký tài khoản để bắt đầu miễn phí, hoặc sử dụng API key để truy cập các mô hình như Claude Sonnet.",
			getStarted: "Bắt đầu",
			letsGo: "Đi thôi",
			useApiKey: "Sử dụng API Key",
			signUp: "Đăng ký",
		},
		terminal: {
			title: "Cài đặt Terminal",
			shell: "Shell",
			profile: "Hồ sơ",
		},
		browser: {
			title: "Cài đặt Trình duyệt",
			headless: "Chế độ Headless",
		},
	},
}
