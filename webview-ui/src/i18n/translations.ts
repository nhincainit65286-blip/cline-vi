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
		},
	},
}
